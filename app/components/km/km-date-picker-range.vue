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
            v-model="start"
            :max="end"
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
            v-model="end"
            :min="start"
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
              @click="setCustomRange(range)"
            >
              {{ label }}
            </button>
          </li>
        </ul>
    </div>
</template>

<script setup>
    import { ref, computed, nextTick } from "vue";
    import moment from "moment";
    import { useI18n } from "vue-i18n";
    import messages from "../../app-text/components/km/km-date-picker-range.json";
    const { t } = useI18n({ messages });
    const dateFormat = "YYYY-MM-DD";
    
    const start = defineModel('start', {
      type: String,
      required: false,
      validator: function (value) {
        if (value === null) return true;
        const dateRegex = /^[0-9]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])$/;
        return dateRegex.test(value);
      },
    });
    const end = defineModel('end',{ 
      type: String,
      required: false,
      validator: function (value) {
        if (value === null) return true;
        const dateRegex = /^[0-9]{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])$/;
        return dateRegex.test(value);
      },
    })

    const errorMessage = ref("");
    const selectedRange = ref("");
    
    const emit = defineEmits(['change']);

    const customRanges = computed(() => ({
      [t("last7Days")]: [moment().subtract(7, "days").startOf("day"), moment().endOf("day")],
      [t("last30Days")]: [moment().subtract(30, "days").startOf("day"), moment().endOf("day")],
      [t("last6Month")]: [moment().subtract(6, "months"), moment()],
      [t("last12Month")]: [moment().subtract(12, "months"), moment()],
      [t("last2Years")]: [moment().subtract(2, "years"), moment()],
      [t("last5Years")]: [moment().subtract(5, "years"), moment()],
    }));

    const validateDateRange = () => {
          const startDate = moment(start.value, dateFormat, true);
          const endDate = moment(end.value, dateFormat, true);

          if (!startDate.isValid() && !endDate.isValid()) {
              errorMessage.value = t("selectBothDates");
              selectedRange.value = "";
              return false;
          }
          if (start.value && end.value && endDate.isBefore(startDate)) {
              errorMessage.value = t("earlierThanStartDate");
              selectedRange.value = "";
              return false;
          }
          errorMessage.value = ""; 
          return true;
      };

    const applyRange = () => {
      if (validateDateRange()) {
        emit("change", { start: start.value, end: end.value });
      }
    };
  
    const setCustomRange = (range) => {
      const [startRange, endRange] = range;
      start.value = startRange.format(dateFormat);
      end.value = endRange.format(dateFormat);
      nextTick(() => {
        emit("change", { start: start.value, end: end.value });
      });
    };
</script>