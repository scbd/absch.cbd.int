<template>
    <div class="container my-4">
      <div class="row g-3 align-items-center">
        <!-- Start Date -->
        <div class="col-12 col-md d-flex align-items-center gap-2">
          <label for="startDate" class="form-label mb-0">
            <strong>From:</strong>
          </label>
          <input
            id="startDate"
            type="date"
            class="form-control"
            v-model="dateRange.startDate"
            @change="validateDateRange"
          />
        </div>
        <!-- End Date -->
        <div class="col-12 col-md d-flex align-items-center gap-2">
          <label for="endDate" class="form-label mb-0">
            <strong>To:</strong>
          </label>
          <input
            id="endDate"
            type="date"
            class="form-control"
            v-model="dateRange.endDate"
            :min="dateRange.startDate"
            @change="validateDateRange"
          />
        </div>
  
        <div class="col-12 col-md-auto">
          <button class="btn btn-primary w-100 w-md-auto" @click="applyRange" :disabled="!!errorMessage">
            Apply
          </button>
        </div>
      </div>
  
      <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
  
      <div class="mt-4">
        <ul class="list-unstyled row g-2 row-cols-1 row-cols-md-3">
          <li v-for="(range, label) in customRanges" :key="label" class="col d-flex">
            <button
              class="btn w-100"
              :class="selectedRange === label ? 'bg-primary text-white' : 'btn-outline-secondary'"
              @click="setCustomRange(label)"
            >
              {{ label }}
            </button>
          </li>
        </ul>
      </div>
    </div>
</template>
 

<script setup>
    import { ref, onMounted, computed, inject } from "vue";
    import moment from "moment";
    
    const props = defineProps({
        modelValue: { type: Object, required: false, default: () => ({ startDate: "", endDate: "" }) },
        datesLabel: { type: String, required: false, default: "Date Range" },
    });
  
    const dateRange = ref({ ...props.modelValue });
    const errorMessage = ref("");
    const selectedRange = ref("");
  
    const customRanges = {
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "Last 6 Months": [moment().subtract(6, "months").startOf("month"), moment()],
        "Last 12 Months": [moment().subtract(12, "months").startOf("month"), moment()],
        "Last 2 Years": [moment().subtract(2, "years").startOf("month"), moment()],
        "Last 5 Years": [moment().subtract(5, "years").startOf("month"), moment()],
    };
  
    const onFilterDateChange = inject("onFilterDateChange");

    const isRangeValid = computed(() => {
        const start = moment(dateRange.value.startDate, "YYYY-MM-DD");
        const end = moment(dateRange.value.endDate, "YYYY-MM-DD");
        return start.isValid() && end.isValid() && !end.isBefore(start);
    });

  // Methods
    const validateDateRange = () => {
        if (!isRangeValid.value) {
            errorMessage.value = "The end date cannot be earlier than the start date.";
            selectedRange.value = "";
            return false;
        }
        errorMessage.value = "";
        return true;
    };
  
    const applyRange = () => {
        if (validateDateRange()) {
            onFilterDateChange?.(dateRange.value);
        }
    };
  
    const setCustomRange = (label) => {
        selectedRange.value = label;
        const [start, end] = customRanges[label];
        dateRange.value.startDate = start.format("YYYY-MM-DD");
        dateRange.value.endDate = end.format("YYYY-MM-DD");
        applyRange();
    };
  
    onMounted(() => {
        const today = moment().format("YYYY-MM-DD");
        dateRange.value.startDate = props.modelValue.startDate || today;
        dateRange.value.endDate = props.modelValue.endDate || today;
    });
</script>