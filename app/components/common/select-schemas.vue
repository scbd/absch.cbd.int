<template>
  <div class="position-relative">

    <!-- Trigger -->
    <button
      class="btn btn-outline-secondary dropdown-toggle text-start mt-2"
      type="button"
      @click.stop="showDropdown = !showDropdown"
    >
    {{ t('selectSchemas') }}
      
    </button>
      <div v-if="selectedLabels.length" class="d-flex flex-wrap gap-1">
        <button
          v-for="label in selectedLabels"
          :key="label"
          type="button"
          class="btn btn-sm btn-outline-primary"
        >
          {{ label }}
        </button>
      </div>
    <!-- Dropdown -->
    <div
      v-if="showDropdown"
      class="dropdown-menu show w-100 mt-1 p-2 border rounded shadow-sm"
      style="max-height: 250px; overflow-y: auto;"
    >
      <div v-if="loading" class="text-center text-secondary small py-2">
        <i class="bi bi-arrow-repeat me-1 spinner-border spinner-border-sm"></i>
        {{ t('loading') }}
      </div>

      <template v-else>
        <div
          v-for="option in schemasList"
          :key="option.value"
          class="form-check mb-1"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="option.value"
            :value="option.value"
            v-model="schemasSelected"
          />
          <label class="form-check-label" :for="option.value">{{ option.label }}</label>
        </div>

        <div class="d-flex justify-content-between border-top pt-2 mt-2">
          <button class="btn btn-link btn-sm p-0" @click="selectAll">{{ t('selectAll') }}</button>
          <button class="btn btn-link btn-sm text-danger p-0" @click="clearAll">{{ t('clearAll') }}</button>
        </div>
      </template>
    </div>

    <!-- Error -->
    <div v-if="errorMessage" class="alert alert-danger mt-2 mb-0">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import RealmsApi from "~/api/realms";
import { useI18n } from "vue-i18n";
import messages from "~/app-text/components/common/select-schemas.json";

const { t, locale } = useI18n({ messages });
const realmsApi = new RealmsApi();

const schemasList = ref([]);
const schemasSelected = ref([]);
const errorMessage = ref("");
const showDropdown = ref(false);
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await realmsApi.getRealmConfiguration("BCH-DEV");
    const schemas = data?.schemas || {};

    schemasList.value = Object.values(schemas).map(s => ({
      label: s.title?.[locale.value] || s.title?.en || "Untitled",
      value: s.shortCode,
    }));
    // selectAll();
  } catch {
    errorMessage.value = t("loadError");
  } finally {
    loading.value = false;
  }

  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const selectedLabels = computed(() =>
  schemasList.value
    .filter(opt => schemasSelected.value.includes(opt.value))
    .map(opt => opt.label)
);

function handleOutsideClick(e) {
  if (!e.target.closest(".position-relative")) showDropdown.value = false;
}

function selectAll() {
  schemasSelected.value = schemasList.value.map(opt => opt.value);
}

function clearAll() {
  schemasSelected.value = [];
}
</script>
