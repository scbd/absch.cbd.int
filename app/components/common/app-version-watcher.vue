<template>
  <transition name="fade">
    <div class="modal fade" ref="modalRef"  data-backdrop="static" tabindex="-1" 
        aria-labelledby="appVersionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"  role="document">
            <div class="modal-content">
                <div class="modal-header color-black">
                    <h5 class="modal-title">
                        {{t('dialogTitle')}}
                    </h5>
                </div>
                <div class="modal-body">  
                    <div class="row">
                        <div class="col-12">
                            <div class="alert alert-info">
                                <div class="spinner-grow text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> {{t('newVersionAvailable')}}
                            </div>
                        </div>
                    </div> 
                    <div v-if="currentVersion">{{t('currentVersion')}}: <code>{{ currentVersion }}</code></div>
                    <div v-if="remoteVersion">{{t('remoteVersion')}}: <code>{{ remoteVersion }}</code></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="closeModal()" aria-label="Close"> {{t('notNow')}}</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="refreshNow()" aria-label="Refresh"> {{t('refresh')}}</button>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script setup lang="ts">

import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Modal } from "bootstrap";
import messages from '../../app-text/common/app-version-watcher.json';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ messages });

// ---------- State ----------
const currentVersion = ref<string>((window?.scbdApp||{}).version||'0.0.0')
const remoteVersion = ref<string | null>(null)
const modalRef = shallowRef(null);
const timerInterval = 170*60*1000 // 170 minutes interval
let currentTimerId: number | undefined;
let appVersionModal: Modal | null = null;

async function checkVersion() {
  try {
    if(appVersionModal?._isShown) return;
    const res = await fetch('/version')
    if (!res.ok) return
    const version = await res.text()

    if (!version) return
    // currentVersion.value = new Date().toISOString()
    remoteVersion.value = version
    if (version !== currentVersion.value) {
      openModal()
    }
  } catch (error:any){
    console.error(`Error polling app version`, error)
  }
}

function startPolling() {
    currentTimerId = window.setInterval(checkVersion, timerInterval)
}

function stopPolling() {
  if (currentTimerId) {
    clearInterval(currentTimerId)
  }
}

function openModal() {
  appVersionModal?.show()
}

function closeModal() {
  appVersionModal?.hide()
}

function refreshNow() {
  window.location.reload()
}

// ---------- Lifecycle ----------
onMounted(() => {
    appVersionModal = new Modal(modalRef.value);
  startPolling()
})
onBeforeUnmount(() => {
  stopPolling()
})


</script>

<style scoped>
/* Backdrop + modal (framework-agnostic) */
.vug-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: grid;
  place-items: center;
  z-index: 99999;
}

.vug-modal {
  background: #fff;
  width: min(90vw, 420px);
  border-radius: 12px;
  padding: 22px 20px;
  box-shadow: 0 18px 60px rgba(0,0,0,.25);
  outline: none;
}

.vug-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px;
}

.vug-desc {
  margin: 0 0 16px;
  color: #333;
  line-height: 1.45;
}

.vug-details {
  display: flex;
  gap: 14px;
  font-size: .875rem;
  color: #555;
  margin-bottom: 16px;
}

.vug-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.vug-btn {
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.vug-btn-primary {
  background: #0a6ebd; /* UN blue-ish */
  color: #fff;
}

.vug-btn-secondary {
  background: #e7e7e7;
  color: #111;
}

/* Fade transition */
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
