<template>
  <div style="width:100%; height:400px">
    <LineChart v-if="chartReady" :data="chartData" :options="chartOptions" />
    <div v-else class="flex items-center justify-center h-full">
        <p>Loading chart...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DocumentApi from "~/api/km-document";
import { useAuth }   from "@scbd/angular-vue/src/index.js";
import { useRealm } from '~/services/composables/realm.js';
const auth = useAuth();
const realm = useRealm();
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, CategoryScale, LinearScale, PointElement
} from "chart.js";

// Register only the necessary components for the chart
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const chartReady = ref(false);
const chartData = ref({ labels: [], datasets: [] });

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: { display: true, text: "Documents by Month" },
    legend: { display: true }
  }
};

// Utility to format a date object into a YYYY-MM key
const formatKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

// Map schema keys to their descriptive titles
//ToDo: translate these titles
const SCHEMAS = {
  "cpbNationalReport1": "National Report 1",
  "cpbNationalReport2": "National Report 2",
  "cpbNationalReport3": "National Report 3",
  "cpbNationalReport4": "National Report 4",
  "cpbNationalReport5": "National Report 5"
};

// Assign a distinct color for each schema's line on the chart
const COLORS = [
  "#1976d2", // blue
  "#d32f2f", // red
  "#388e3c", // green
  "#fbc02d", // yellow
  "#7b1fa2"  // purple
];

const fetchSchemaData = async (schema) => {
    const params = {
    facet: "true",
    "facet.limit": 1012,
    "facet.range": "createdDate_dt",
    "facet.range.end": "NOW+1MONTH/MONTH",
    "facet.range.gap": "+1MONTH",
    "facet.range.start": "NOW+1MONTH/MONTH-131MONTH",
    fl: "id",
    q: `(realm_ss:${realm.uIdPrefix}) AND NOT version_s:* AND schema_s:(${schema})`,
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

const loadData = async () => {
  const schemaKeys = Object.keys(SCHEMAS);
  // Fetch all schema data in parallel for efficiency
  const results = await Promise.all(schemaKeys.map(fetchSchemaData));

  // Collect all unique date keys (YYYY-MM) across all fetched schemas
  const allDates = new Set();
  results.forEach((map) => {
    map.forEach((_, key) => allDates.add(key));
  });

  // Determine the full date range to display on the chart's X-axis
  const sortedDates = [...allDates]
    .map((k) => new Date(k + "-01T00:00:00Z"))
    .sort((a, b) => a - b);

  const minDate = sortedDates[0];
  const maxDate = sortedDates[sortedDates.length - 1];

  // Build the labels and corresponding month keys for the X-axis
  const labels = [];
  const months = [];
  let current = new Date(minDate);
  while (current <= maxDate) {
    const key = formatKey(current);
    labels.push(
      current.toLocaleDateString("en-GB", { year: "numeric", month: "short" })
    );
    months.push(key);
    current.setMonth(current.getMonth() + 1);
  }

  // Build a dataset for each schema
  const datasets = results.map((map, i) => {
      const schemaKey = schemaKeys[i];
      return {
        label: SCHEMAS[schemaKey], // Use the descriptive title for the label
        data: months.map((m) => map.get(m) || 0),
        borderColor: COLORS[i],
        backgroundColor: COLORS[i] + "33", // Lighter fill color with some transparency
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5
    }
  });

  chartData.value = { labels, datasets };
  chartReady.value = true;
};

onMounted(loadData);

// Define the LineChart component to be used in the template
const LineChart = Line;
</script>
