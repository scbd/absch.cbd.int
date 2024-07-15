<template>
    <!-- ToDo: this code is for testing UI only we will change this file in next PR.  -->
    <button class="btn btn-primary btn-sm" type="button" @click="toggleModal">
        <i class="bi bi-upload me-1"></i>
        Import
    </button>
    <div>
      <!-- Modal -->
      <div class="modal fade" id="importModal" tabindex="-1" aria-labelledby="importModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="importModalLabel">Import Records</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Import dialog content...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { Modal } from 'bootstrap';
  
  // Declare modal as a ref to keep its instance
  const modal = ref(null);
  
  onMounted(() => {
    const modalElement = document.getElementById('importModal');
    modal.value = new Modal(modalElement);
  });
  
  const toggleModal = () => {
    modal.value.show();
  }
  </script>

  