<template>
  <div style="width:100%; height:400px">
     <!-- Controls -->
    <div class="mb-3 d-flex align-items-center gap-3">
      <!-- Frequency Dropdown -->
      <div class="d-flex align-items-center">
        <label class="me-2 fw-semibold">Frequency:</label>
        <select v-model="frequency" @change="loadData" class="form-select form-select-sm w-auto">
          <option value="+1MONTH">Monthly</option>
          <option value="+3MONTH">Quarterly</option>
          <option value="+1YEAR">Yearly</option>
        </select>
      </div>

      <!-- Date Range Toggle -->
      <div>
        <button class="btn btn-sm btn-light border" @click="showDateRange = !showDateRange">
          {{ start && end ? `${start} → ${end}` : 'Select Date Range' }}
        </button>

        <div v-if="showDateRange" class="position-absolute z-50 bg-white shadow border rounded p-3 mt-2">
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
    <div v-else class="d-flex align-items-center justify-content-center h-100">
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
import SolrApi from "~/api/solr.js";
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
  chartQuery: { type: String, required: true }
});

// NOTE: Please always pass schemas inside parentheses,
// even for a single schema. Example: schema_s:(schema1)
const schemaMatch = props.chartQuery.match(/schema_s:\(([^)]+)\)/);
const chartSchemas = schemaMatch ? schemaMatch[1].trim().split(/\s+/) : [];

// State
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
    title: { display: false },
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

//  Build query per schema
const fetchSchemaData = async (schema) => {
    // Replace schema_s:(...) with just schema_s:schema
    const queryForSchema = props.chartQuery.replace(
      /schema_s:\([^)]+\)/,
      `schema_s:${schema}`
    );

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
        q: queryForSchema,
        rows: 0,
        wt: "json"
    };

    const solrAPI = new SolrApi({tokenReader:()=>auth.token(), realm:realm.uIdPrefix});
    const response = await solrAPI.queryFacets(params);
    const rawCounts = response.facet_counts.facet_ranges.createdDate_dt.counts;
    const parsedMap = new Map();
    //Iterates through the rawCounts array in steps of 2 (since it’s [date, count, date, count, ...])
    for (let i = 0; i < rawCounts.length; i += 2) {
        const d = new Date(rawCounts[i]);
        parsedMap.set(formatKey(d), rawCounts[i + 1]);
    }

    return parsedMap;
};

// Load chart data
const loadData = async () => {
    try {
        if (chartSchemas.length === 0) return;

        const results = await Promise.all(chartSchemas.map(fetchSchemaData));
        
        // Removes duplicates ["2025-01", "2025-02", "2025-02", "2025-03"]
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
            const schemaKey = chartSchemas[i];
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
  showDateRange.value = false; //close on apply
};

onMounted(loadData);
</script>

