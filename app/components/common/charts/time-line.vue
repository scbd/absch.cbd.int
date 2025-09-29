<template>
  <div style="width:100%; height:400px">
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
        "facet.range.end": "NOW+1MONTH/MONTH",
        "facet.range.gap": "+1MONTH",
        "facet.range.start": "NOW+1MONTH/MONTH-191MONTH",
        fl: "id",
        q: `(realm_ss:${realm.uIdPrefix}) AND NOT version_s:* AND schema_s:(${schema}) AND  (${props.chartQuery || "*:*" })`,
        rows: 0,
        wt: "json"
    };

    const documentApi = new DocumentApi({tokenReader:()=>auth.token(), realm:realm.uIdPrefix}); // add at solr 
    const response = await documentApi.queryFacetsDocuments(params);
    const rawCounts = response.facet_counts.facet_ranges.createdDate_dt.counts;
    const parsedMap = new Map();

    for (let i = 0; i < rawCounts.length; i += 2) {
        const d = new Date(rawCounts[i]);
        parsedMap.set(formatKey(d), rawCounts[i + 1]);
    }

    return parsedMap;
};

// Main function to load, process, and set all chart data
const loadData = async () => {
    try {
        if (!props.chartSchemas || props.chartSchemas.length === 0) return;

        const results = await Promise.all(props.chartSchemas.map(fetchSchemaData));

        const allDateKeys = [...new Set(results.flatMap(map => [...map.keys()]))].sort(); // ["2025-01", "2025-02", "2025-03"]

        if (allDateKeys.length === 0) {
            chartData.value = { labels: [], datasets: [] };
            return;
        }

        const minDate = new Date(allDateKeys[0]);
        const maxDate = new Date(allDateKeys[allDateKeys.length - 1]);

        // Generate all month labels and keys from the min to max date
        const labels = [];
        const monthKeys = [];
        let currentDate = new Date(minDate);

        while (currentDate <= maxDate) {
            monthKeys.push(formatKey(currentDate));
            labels.push(
                currentDate.toLocaleDateString(locale.value, { year: "numeric", month: "short" })
            );
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        // Build the datasets for the chart
        const datasets = results.map((dataMap, i) => {
            const schemaKey = props.chartSchemas[i];
            return {
                label: realm.schemas[schemaKey]?.title[locale.value] || schemaKey,
                data: monthKeys.map((key) => dataMap.get(key) || 0),
                borderColor: COLORS[i % COLORS.length],
                backgroundColor: COLORS[i % COLORS.length] + "33", // Lighter fill with transparency
                fill: false,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5
            };
        });

        chartData.value = { labels, datasets };
    } catch (error) {
        console.error("Failed to load chart data:", error);
        chartData.value = { labels: [], datasets: [] }; // Set empty chart on error
    } finally {
        chartReady.value = true;
    }
};

onMounted(loadData);
</script>

