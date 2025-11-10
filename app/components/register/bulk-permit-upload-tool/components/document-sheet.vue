<template>
  <div>
    <div
      v-if="parsedFile.length"
      class="row table-container table-responsive"
    >
      <table class="table table-striped table-bordered table-condensed">
        <thead>
          <tr>
            <th
              scope="col"
              rowspan="2"
            >
              #
            </th>
            <th
              v-for="header in mainHeaders"
              :key="header.label"
              :colspan="header.colspan"
              :rowspan="header.rowspan"
              class="text-center"
            >
              {{ t(header.label) }}
            </th>
          </tr>
          <tr>
            <th
              v-for="header in subHeaders"
              :key="header.label"
            >
              {{ t(header.label) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in parsedFile"
            :key="index"
            :class="{
              'bg-lightpink': data.fileError === true,
              'bg-lightgreen': data.fileError === false,
            }"
          >
            <th scope="row">
              {{ data.rowId }}
            </th>
            <td
              v-for="field in flattenedFields"
              :key="field"
              class="p-2"
            >
              <div
                data-toggle="tooltip"
                data-placement="top"
                :title="getNestedValue(data, field)"
                class="short-text"
              >
                {{ getNestedValue(data, field) }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="errorCreateRecords.length"
      class="row mt-5 error__container"
    >
      <div
        class="col-12 alert alert-danger d-flex justify-content-between align-items-center"
      >
        <ul class="flex-1">
          <li
            v-for="value in errorCreateRecords"
                :key="value.identifier"
          >
            Error creating <span v-if="value.draft">draft</span> record
            on row {{ getRowsFromParsedFile(value) }} -
            {{ value.error }}
          </li>
        </ul>
      </div>
    </div>
    <div
      v-else-if="error && !isLoading"
      class="row mt-4"
    >
      <div class="col-12 text-center">
        <span class="alert alert-danger">{{ error }}</span>
      </div>
    </div>
    <div
      v-if="successMessage && !isLoading"
      class="row mt-4"
    >
      <div class="col-12 text-center">
        <div class="alert alert-success">
          {{ successMessage }}
        </div>
      </div>
    </div>
    <div
      v-show="isLoading"
      class="row mt-3"
    >
      <div class="col-12 text-center">
        <span>{{ t("loadingMessage") }}</span>
        <br>
        <div
          class="spinner-border"
          role="status"
        >
          <span class="sr-only">{{ t("loading") }}...</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((o, key) => (o ? o[key] : ''), obj)
}

</script>
