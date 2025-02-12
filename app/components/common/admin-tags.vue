<template>
  <div class="p-3">
    <div class="card shadow-sm p-3">
      <table class="table table-hover table-bordered text-center align-middle">
        <thead class="table-light">
          <tr class="text-secondary">
            <th @click="sortBy('title')" class="sortable">Title</th>
            <th @click="sortBy('createdOn')" class="sortable">Admin Tags</th>
            <th @click="sortBy('status')" class="sortable">Add new</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td class="text-center p-4" colspan="3">Loading...</td>
          </tr>
          <tr v-else-if="records.length === 0">
            <td class="text-center p-4" colspan="3"><strong>No records found.</strong></td>
          </tr>
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.title }}</td>
            <td>
              <!-- <div class="card-footer"> -->
                <a type="button" class="btn btn-sm btn-outline-secondary m-1 me-2" href="kb/tags/absch-about">absch-about</a>
                <a type="button" class="btn btn-sm btn-outline-secondary m-1 me-2" href="kb/tags/introduction">introduction</a>
                <a type="button" class="btn btn-sm btn-outline-secondary m-1 me-2" href="kb/tags/abs">abs</a>
                <a type="button" class="btn btn-sm btn-outline-secondary m-1 me-2" href="kb/tags/about/About-the-ABS-Clearing-House">about</a>
              <!-- </div> -->
            </td>
            <td>
              <!-- <button class="btn btn-primary">Add Tags</button> -->
               <add-tags document-id="tet-id"></add-tags>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import  addTags  from '~/app/components/common/add-tags.vue';
import addTags from '~/components/common/add-tags.vue';

const records = ref([]);
const loading = ref(true);
const orderBy = ref('title'); // for sorting

const loadRecords = async () => {
  try {
	// will get it from api
    records.value = [
      { "userId": 1, "id": 1, "title": "Sample Title 1", "createdOn": new Date().toLocaleDateString(), "status": "Published" },
      { "userId": 1, "id": 2, "title": "Sample Title 2", "createdOn": new Date().toLocaleDateString(), "status": "Draft" },
      { "userId": 1, "id": 3, "title": "Sample Title 3", "createdOn": new Date().toLocaleDateString(), "status": "Published" }
    ];
  } catch (error) {
    console.error('Error fetching records:', error);
  } finally {
    loading.value = false;
  }
};

onMounted( async () => {
  await loadRecords();
});

const sortBy = (field) => {
  orderBy.value = field;
  records.value.sort((a, b) => (a[field] > b[field] ? 1 : -1));
};
</script>

<!-- <style scoped>
.container {
  max-width: 900px;
}
.card {
  border-radius: 12px;
}
.sortable {
  cursor: pointer;
  user-select: none;
}
.sortable:hover {
  text-decoration: underline;
}
</style> -->
