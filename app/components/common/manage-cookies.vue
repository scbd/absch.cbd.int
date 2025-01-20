<template>
    <div v-if="showCookieModel" class="container bg-light bg-grey fixed-bottom mb-5 py-3 shadow-sm rounded">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h3 class="fw-bold mb-2">Cookie Settings</h3>
          <p class="text-muted small mb-0">
            <!-- ToDo: move to translation file -->
            We use cookies and similar technologies to help personalize content and offer a better experience. 
            You can opt to customize them by clicking the preferences button.
          </p>
        </div>
        <div class="ms-auto d-flex flex-column flex-sm-row gap-2 mt-3 mt-sm-0">
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="openPreferences">Preferences</button>
          <button type="button" class="btn btn-primary btn-sm" @click="acceptAll">Accept All</button>
        </div>
      </div>
    </div> 
  
   <div class="modal fade" ref="cookiePreferencesModal" data-bs-backdrop="static" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xs">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="cookiePreferencesLabel">Your Privacy Preferences</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div>
              <h6 class="fw-bold">Session Token (necessary)</h6>
              <p class="text-muted small">
                This cookie contains a token. With the help of the token, your current session can be continued when
                using the website. This cookie is valid for 2 hours after creation and is renewed each time you change
                pages within this website.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted small">*_session</span>
                <div class="form-check form-switch">
                  <input class="form-check-input switch-lg" type="checkbox" id="sessionToken" checked disabled>
                  <!-- <label class="form-check-label text-primary" for="sessionToken">On</label> -->
                </div>
              </div>
              <hr>
            </div>
  
            <div>
              <h6 class="fw-bold">Remember Token (necessary)</h6>
              <p class="text-muted small">
                This cookie contains a token. With the help of the token, your login session can be resumed even after
                the 2 hours that the session cookie is valid. This cookie is only set if you have activated the option
                "Stay logged in" when logging in. This cookie is removed when you log out.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted small">remember_web_*</span>
                <div class="form-check form-switch">
                  <input class="form-check-input switch-lg" type="checkbox" id="rememberToken" checked disabled>
                  <!-- <label class="form-check-label text-primary" for="rememberToken">On</label> -->
                </div>
              </div>
              <hr>
            </div>
  
            <div>
              <h6 class="fw-bold">XSRF Token (necessary)</h6>
              <p class="text-muted small">
                This cookie contains a token. The token prevents a third party from submitting forms on the website
                on your behalf. This cookie is valid for 2 hours and is renewed at every page change within the website.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted small">XSRF-TOKEN</span>
                <div class="form-check form-switch">
                  <input class="form-check-input switch-lg cursor-pointer" type="checkbox" id="xsrfToken" checked>
                  <!-- <label class="form-check-label text-primary" for="xsrfToken">On</label> -->
                </div>
              </div>
              <hr>
            </div>
  
            <div>
              <h6 class="fw-bold">Google Analytics</h6>
              <p class="text-muted small">
                Google Analytics stores this cookie to track your usage of the website. Your IP address is not stored.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <span class="text-muted small">_ga</span>
                <div class="form-check form-switch">
                  <input class="form-check-input switch-lg cursor-pointer" type="checkbox" id="googleAnalytics">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <div>
              <button type="button" class="btn btn-danger" @click="declineAll">Decline All</button>
              <button type="button" class="btn btn-success ms-2" @click="acceptAll">Accept All</button>
            </div>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="savePreferences">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { shallowRef, onMounted, ref } from 'vue';
  import { Modal } from 'bootstrap';

  const cookiePreferencesModal = shallowRef(null);
  const showCookieModel = ref(true);
  let modal = null;

  // Initialize modal on component mount
  onMounted(() => {
    modal = new Modal(cookiePreferencesModal.value);
  });

  // Open preferences modal
  const openPreferences = () => {
    modal.show();
  };

  // Handle Accept All button
  const acceptAll = () => {
    console.log("acceptAll function is called.");
    // Perform any additional actions here (e.g., saving preferences to localStorage)
    closeModal();
    showCookieModel.value = false; // hide the cookies setting div
  };

  // Handle Decline All button
  const declineAll = () => {
    console.log("All optional cookies declined.");
    // Perform any additional actions here (e.g., updating settings)
    closeModal();
  };

  // Save preferences
  const savePreferences = () => {
    console.log("Preferences saved.");
    // Save specific preferences
    showCookieModel.value = false; //  not sure, hide the cookies setting div
  };

  // Close modal
  const closeModal = () => {
    modal.hide();
  };
  </script>

  <style scoped>
  .switch-lg {
    width: 3rem;
    height: 1.5rem;
  }
  .switch-lg:checked::before {
    transform: translateX(1.5rem);
  }
  </style>
