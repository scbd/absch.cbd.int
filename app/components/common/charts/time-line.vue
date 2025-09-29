<template>
  <div style="width:100%; height:400px">
     <!-- Controls -->
    <div class="mb-4 flex items-center gap-4">
      <!-- Frequency Dropdown -->
      <div>
        <label class="mr-2 font-semibold">Frequency:</label>
        <select v-model="frequency" @change="loadData" class="border p-1 rounded">
          <option value="+1MONTH">Monthly</option>
          <option value="+3MONTH">Quarterly</option>
          <option value="+1YEAR">Yearly</option>
        </select>
      </div>

      <!-- Date Range Toggle -->
      <div class="relative">
        <button class="border p-1 rounded bg-gray-100" @click="showDateRange = !showDateRange">
          {{ start && end ? `${start} → ${end}` : 'Select Date Range' }}
        </button>

        <div v-if="showDateRange" class="absolute z-50 bg-white shadow-lg border rounded p-3 mt-2">
          <km-date-picker-range 
            v-model:start="start" 
            v-model:end="end"
            @change="onDateRangeChange"
          />
        </div>
      </div>
    </div>

    <!-- Chart -->
    <Line v-if="chartReady" class="bg-white" :data="chartData" :options="chartOptions"></Line>
    <div v-else class="flex items-center justify-center h-full">
        <p>Loading chart...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, CategoryScale, LinearScale, PointElement
} from "chart.js";
import DocumentApi from "~/api/km-document";
import { useAuth } from "@scbd/angular-vue/src/index.js";
import { useRealm } from '~/services/composables/realm.js';
import { useI18n } from 'vue-i18n';
import kmDatePickerRange from "~/components/km/km-date-picker-range.vue";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Vue Composables
const { locale } = useI18n();
const auth = useAuth();
const realm = useRealm();

const props = defineProps({
  chartSchemas: { type: Array, required: true }, // Array of schema names
  chartQuery: { type: String, required: false }
});

// Component State
const chartReady = ref(false);
const chartData = ref({ labels: [], datasets: [] });
const frequency = ref("+1MONTH"); // default gap: monthly
const showDateRange = ref(false);
const start = ref(null);
const end = ref(null);

// Chart Configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: { display: false, text: "" },
    legend: { display: true }
  }
};

// Assign distinct colors for chart lines
const COLORS = [
  "#1976d2", // blue
  "#d32f2f", // red
  "#388e3c", // green
  "#fbc02d", // yellow
  "#7b1fa2", // purple
  "#ff9800", // orange
  "#0097a7", // teal
  "#c2185b", // pink
  "#512da8", // deep purple
  "#455a64"  // gray
];

// Utility to format a date into a YYYY-MM key
const formatKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

// Fetches and parses facet data for a single schema
const fetchSchemaData = async (schema) => {
    const params = {
        facet: "true",
        "facet.limit": 1012,
        "facet.range": "createdDate_dt",
        "facet.range.gap": frequency.value,
        ...(start.value && end.value ? {
          "facet.range.start": `${start.value}T00:00:00Z`,
          "facet.range.end": `${end.value}T23:59:59Z`
        } : {
          "facet.range.start": "NOW-10YEAR",
          "facet.range.end": "NOW"
        }),
        fl: "id",
        q: `(realm_ss:${realm.uIdPrefix}) AND NOT version_s:* AND schema_s:(${schema}) AND (${props.chartQuery || "*:*"})`,
        rows: 0,
        wt: "json"
    };

    const documentApi = new DocumentApi({tokenReader:()=>auth.token(), realm:realm.uIdPrefix});
    const response = await documentApi.queryFacetsDocuments(params);
    const rawCounts = response.facet_counts.facet_ranges.createdDate_dt.counts;
    const parsedMap = new Map();

    for (let i = 0; i < rawCounts.length; i += 2) {
        const d = new Date(rawCounts[i]);
        parsedMap.set(formatKey(d), rawCounts[i + 1]);
    }

    return parsedMap;
};

// Load chart data
const loadData = async () => {
    try {
        if (!props.chartSchemas || props.chartSchemas.length === 0) return;

        const results = await Promise.all(props.chartSchemas.map(fetchSchemaData));

        const allDateKeys = [...new Set(results.flatMap(map => [...map.keys()]))].sort();

        if (allDateKeys.length === 0) {
            chartData.value = { labels: [], datasets: [] };
            return;
        }

        const minDate = new Date(allDateKeys[0]);
        const maxDate = new Date(allDateKeys[allDateKeys.length - 1]);

        // Generate labels and keys from the min to max date
        const labels = [];
        const monthKeys = [];
        let currentDate = new Date(minDate);

        while (currentDate <= maxDate) {
            monthKeys.push(formatKey(currentDate));

            if (frequency.value === "+1YEAR") {
                labels.push(currentDate.getFullYear().toString());
                currentDate.setFullYear(currentDate.getFullYear() + 1);
            }
            else if (frequency.value === "+3MONTH") {
                const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
                labels.push(`Q${quarter} ${currentDate.getFullYear()}`);
                currentDate.setMonth(currentDate.getMonth() + 3);
            }
            else {
                labels.push(
                    currentDate.toLocaleDateString(locale.value, { year: "numeric", month: "short" })
                );
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        }

        // Build the datasets for the chart
        const datasets = results.map((dataMap, i) => {
            const schemaKey = props.chartSchemas[i];
            return {
                label: realm.schemas[schemaKey]?.title[locale.value] || schemaKey,
                data: monthKeys.map((key) => dataMap.get(key) || 0),
                borderColor: COLORS[i % COLORS.length],
                backgroundColor: COLORS[i % COLORS.length] + "33",
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            };
        });

        chartData.value = { labels, datasets };
    } catch (error) {
        console.error("Failed to load chart data:", error);
        chartData.value = { labels: [], datasets: [] };
    } finally {
        chartReady.value = true;
    }
};

const onDateRangeChange = () => {
  loadData();
  showDateRange.value = false; // ✅ close on apply
};

onMounted(loadData);
</script>

