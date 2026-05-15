<template>
  <div class="px-4 py-4">
    <div class="d-flex align-items-center mb-4">
      <h3 class="mb-0 flex-grow-1">
        {{ portalSlug ? t('editPortal') : t('newPortal') }}
      </h3>
      <a href="/portals" class="btn btn-sm btn-outline-secondary">
        <i class="fa fa-arrow-left me-1"></i>{{ t('cancel') }}
      </a>
    </div>

    <loading v-if="isLoading" :caption="t('loading')" />
    <server-error v-else-if="loadError" :error="loadError" />

    <template v-else>

      <div v-if="saveError" class="alert alert-danger d-flex align-items-center" role="alert">
        <i class="fa fa-exclamation-triangle me-2"></i>
        {{ t('errorSaving') }}: {{ (saveError as any)?.message || String(saveError) }}
      </div>

      <div v-if="savedOk" class="alert alert-success" role="alert">
        <i class="fa fa-check me-2"></i>{{ t('savedSuccessfully') }}
      </div>

      <!-- Portal details card -->
      <div class="card mb-4">
        <div class="card-header fw-semibold">{{ t('portalDetails') }}</div>
        <div class="card-body">

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">{{ t('slug') }}</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="portal.slug" :placeholder="t('slugPlaceholder')" />
              <div class="form-text">{{ t('slugHelp') }}</div>
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">{{ t('title') }}</label>
            <div class="col-sm-10">
              <div class="input-group mb-1">
                <span class="input-group-text" style="width:44px">EN</span>
                <input type="text" class="form-control" v-model="portal.title['en']" placeholder="en" />
                <button type="button" class="btn btn-outline-secondary" @click="showAllTitleLangs = !showAllTitleLangs" :title="showAllTitleLangs ? 'Hide languages' : 'Show all languages'">
                  <i class="fa" :class="showAllTitleLangs ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                </button>
              </div>
              <template v-if="showAllTitleLangs">
                <div v-for="lang in OTHER_LANGUAGES" :key="lang" class="input-group mb-1">
                  <span class="input-group-text" style="width:44px">{{ lang.toUpperCase() }}</span>
                  <input type="text" class="form-control" v-model="portal.title[lang]" :placeholder="lang" />
                </div>
              </template>
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">{{ t('sortOrder') }}</label>
            <div class="col-sm-4">
              <input type="number" class="form-control" v-model.number="portal.sortOrder" />
            </div>
          </div>

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">{{ t('realms') }}</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="realmsInput" :placeholder="t('realmsHelp')" />
              <div class="form-text">{{ t('realmsHelp') }}</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Portal content card -->
      <div class="card mb-4">
        <div class="card-header fw-semibold">{{ t('content') }}</div>
        <div class="card-body">

          <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">{{ t('articleId') }}</label>
            <div class="col-sm-10">
              <input type="text" class="form-control font-monospace" v-model="portal.content.article.articleId" placeholder="ObjectId hex" />
            </div>
          </div>

          <div class="mb-3 row">
            <div class="col-sm-10 offset-sm-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="portal.content.article.showCoverImage" id="portalShowCoverImage" />
                <label class="form-check-label" for="portalShowCoverImage">{{ t('showCoverImage') }}</label>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Menus card -->
      <div class="card mb-4">
        <div class="card-header d-flex align-items-center">
          <span class="fw-semibold flex-grow-1">{{ t('menus') }}</span>
          <button type="button" class="btn btn-sm btn-outline-primary" @click="addMenu">
            <i class="fa fa-plus me-1"></i>{{ t('addMenu') }}
          </button>
        </div>
        <div class="card-body">
          <div v-if="!portal.menus?.length" class="text-muted fst-italic small">
            No menu items yet. Click "Add menu item" to get started.
          </div>
          <menu-item-editor
            v-for="(menu, i) in portal.menus"
            :key="i"
            :item="menu"
            :can-move-up="i > 0"
            :can-move-down="i < portal.menus.length - 1"
            @delete="removeMenu(i)"
            @move-up="moveMenu(i, -1)"
            @move-down="moveMenu(i, 1)"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="d-flex gap-2 mb-5">
        <button type="button" class="btn btn-primary" :disabled="isSaving" @click="save">
          <i v-if="isSaving" class="fa fa-cog fa-spin me-1"></i>
          {{ isSaving ? t('saving') : t('save') }}
        </button>
        <a href="/portals" class="btn btn-outline-secondary">{{ t('cancel') }}</a>
        <button
          v-if="portalSlug"
          type="button"
          class="btn btn-outline-danger ms-auto"
          :disabled="isDeleting"
          @click="deletePortal"
        >
          <i v-if="isDeleting" class="fa fa-cog fa-spin me-1"></i>
          {{ isDeleting ? t('deleting') : t('deletePortal') }}
        </button>
      </div>

    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
// @ts-expect-error no types
import { useI18n } from 'vue-i18n';
// @ts-expect-error importing js file
import { useAuth, useRoute } from '@scbd/angular-vue/src/index.js';
// @ts-expect-error importing js file
import { useRealm } from '~/services/composables/realm.js';
// @ts-expect-error importing js file
import PortalsApi from '~/api/portals';
import Loading from '~/components/common/loading.vue';
// @ts-expect-error importing js file
import ServerError from '~/components/common/error.vue';
// @ts-expect-error no types
import MenuItemEditor from '~/components/portals/menu-item-editor.vue';
import messages from '~/app-text/views/portals/edit-portal.json';

const { t } = useI18n({ messages });
const auth = useAuth();
const route = useRoute();
const { realm } = useRealm();
const portalsApi = new PortalsApi({ tokenReader: () => auth.token() });

// portalSlug is the URL param; portalDbId is the _id used for API mutations
const portalSlug = computed(() => route.value?.params?.portalId as string | undefined);
const portalDbId = ref<string | undefined>(undefined);

const OTHER_LANGUAGES = ['ar', 'es', 'fr', 'ru', 'zh'];
const showAllTitleLangs = ref(false);

const isLoading = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);
const loadError = ref<unknown>(null);
const saveError = ref<unknown>(null);
const savedOk = ref(false);

const portal = ref({
  slug: '',
  title: {} as Record<string, string>,
  sortOrder: 0,
  realms: [] as string[],
  content: { article: { articleId: '', showCoverImage: false } },
  menus: [] as unknown[],
});

const realmsInput = computed({
  get() { return (portal.value.realms || []).join(' '); },
  set(val: string) {
    portal.value.realms = val.split(/[\s,]+/).map(s => s.trim()).filter(Boolean);
  }
});

onMounted(async () => {
  if (!portalSlug.value) return;
  isLoading.value = true;
  try {
    const data = await portalsApi.getPortalByCode(realm.value, portalSlug.value);
    portalDbId.value = data._id;
    portal.value = {
      slug: data.slug || '',
      title: data.title || {},
      sortOrder: data.sortOrder ?? 0,
      realms: data.realms || [],
      content: data.content?.article
        ? data.content
        : { article: { articleId: '', showCoverImage: false } },
      menus: data.menus || [],
    };
  } catch (err) {
    loadError.value = err;
  } finally {
    isLoading.value = false;
  }
});

function addMenu() {
  portal.value.menus.push({ slug: '', title: {}, menus: [] });
}

function removeMenu(i: number) {
  portal.value.menus.splice(i, 1);
}

function moveMenu(i: number, dir: number) {
  const arr = portal.value.menus;
  const j = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

async function save() {
  saveError.value = null;
  savedOk.value = false;
  isSaving.value = true;
  try {
    const payload = { ...portal.value };
    if (portalDbId.value) {
      await portalsApi.updatePortal(portalDbId.value, payload);
    } else {
      await portalsApi.createPortal(payload);
    }
    savedOk.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    saveError.value = err;
  } finally {
    isSaving.value = false;
  }
}

async function deletePortal() {
  if (!confirm(t('confirmDelete'))) return;
  isDeleting.value = true;
  try {
    await portalsApi.deletePortal(portalDbId.value);
    window.location.href = '/portals';
  } catch (err) {
    saveError.value = err;
    isDeleting.value = false;
  }
}
</script>
