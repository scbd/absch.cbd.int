<template>
  <div class="row mb-3">
    <div
      class="col-md-4 d-flex align-items-center justify-content-center fw-bold"
    >
      <span v-if="parsedFile.length > 0">
        {{ $t('totalRecords') }} {{ parsedFile.length }}
      </span>
    </div>
    <div
      v-if="multipleImportSheets.length"
      class="col-md-4 d-flex justify-content-end"
    >
      <span class="min-w-50">
        <select
          v-model="selectedSheetIndex"
          class="form-select"
          :disabled="isLoading"
          @change="handleSelectedSheetChange"
        >
          <option
            v-for="(sheet, index) in multipleImportSheets"
            :key="index"
            :value="index"
          >
            {{ sheet }}
          </option>
        </select>
      </span>
      <span
        href="#"
        class="mt-2 ms-2 fa-lg fa fa-info-circle color-litegrey"
        data-bs-toggle="tooltip"
        data-html="true"
        data-container="body"
        data-placement="top"
        :title="t('multipleSheetAlert')"
      />
    </div>
  </div>
</template>
