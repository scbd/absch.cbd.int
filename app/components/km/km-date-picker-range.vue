<template>
      <div class="row g-3 align-items-center">
        <div class="col-12 col-md d-flex flex-column align-items-start gap-1">
          <label for="startDate" class="form-label mb-0">
            <strong>{{ t("from") }}</strong>
          </label>
          <input
            id="startDate"
            type="date"
            class="form-control"
            v-model="dateRange.startDate"
            :max="dateRange.endDate"
            @change="errorMessage = ''"
          />
        </div>
      
        <div class="col-12 col-md d-flex flex-column align-items-start gap-1">
          <label for="endDate" class="form-label mb-0">
            <strong>{{ t("to") }}</strong>
          </label>
          <input
            id="endDate"
            type="date"
            class="form-control"
            v-model="dateRange.endDate"
            :min="dateRange.startDate"
            @change="errorMessage = ''"
          />
        </div>

        <div class="col-12 col-md-auto pt-4 d-flex justify-content-center align-items-center">
          <button class="btn btn-primary w-100 w-md-auto" @click="applyRange" :disabled="!!errorMessage">
            {{ t("apply") }}
          </button>
        </div>
      </div>


      <p v-if="errorMessage" class="text-danger text-center fs-6 fw-bold mt-4">
        {{ errorMessage }}
      </p>

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
</template>

 
<script setup>
    import { ref, computed, inject } from "vue";
    import moment from "moment";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/km/km-date-picker-range.json';
    const { t } = useI18n({ messages });
    // const dateFormat = "YYYY-MM-DD";
    
    const props = defineProps({
        dateFormat: { type: String, required: false, default: "YYYY-MM-DD" },
    });

    const modelValue = defineModel({
      type: Object,
      required: false,
    });

    const dateRange = computed({
      get: () => modelValue || { startDate: "", endDate: "" },
      set: (newValue) => {
        if (newValue) {
          modelValue.startDate = newValue.startDate || "";
          modelValue.endDate = newValue.endDate || "";
        }
      },
    });

    const errorMessage = ref("");
    const selectedRange = ref("");

    const customRanges = computed(() => ({
      [t("last7Days")]: [moment().subtract(7, "days").startOf("day"), moment().startOf("day")],
      [t("last30Days")]: [moment().subtract(30, "days").startOf("day"), moment().startOf("day")],
      [t("last6Month")]: [moment().subtract(6, "months").startOf("month"), moment()],
      [t("last12Month")]: [moment().subtract(12, "months").startOf("month"), moment()],
      [t("last2Years")]: [moment().subtract(2, "years").startOf("month"), moment()],
      [t("last5Years")]: [moment().subtract(5, "years").startOf("month"), moment()],
    }));
  
    const onFilterDateChange = inject("onFilterDateChange");


    const validateDateRange = () => {
          const start = moment(dateRange.value?.startDate, props.dateFormat, true);
          const end = moment(dateRange.value?.endDate, props.dateFormat, true);

          if (!start.isValid() && !end.isValid()) {
              errorMessage.value = t("selectBothDates");
              selectedRange.value = "";
              return false;
          }
          if (!start.isValid()) {
              errorMessage.value = t("selectValidStartDate");
              selectedRange.value = "";
              return false;
          }
          if (!end.isValid()) {
              errorMessage.value = t("selectValidEndDate");
              selectedRange.value = "";
              return false;
          }

          if (end.isBefore(start)) {
              errorMessage.value = t("earlierThanStartDate");
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
        const [start, end] = customRanges.value[label];
        dateRange.value.startDate = start.format(props.dateFormat);
        dateRange.value.endDate = end.format(props.dateFormat);
        applyRange();
    };
</script>