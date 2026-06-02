<template>
  <div class="ep-wrap">

    <loading v-if="isLoading" :caption="t('loading')" />
    <server-error v-else-if="loadError" :error="loadError" />

    <template v-else>
      <div class="ep-shell">

        <!-- ─── Section nav ───────────────────────── -->
        <nav class="ep-secnav">
          <div class="ep-secnav-title">{{ portalSlug ? t('editPortal') : t('newPortal') }}</div>
          <ul>
            <li v-for="sec in SECTIONS" :key="sec.id">
              <a :class="{ active: activeSection === sec.id }" @click="scrollToSection(sec.id)">
                <i :class="['fa', sec.icon, 'ep-ic']"></i>
                {{ sec.label }}
                <span v-if="sec.count" class="ep-nav-count">{{ sec.count }}</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- ─── Main ─────────────────────────────── -->
        <div class="ep-main">

          <div class="ep-page-head">
            <div>
              <h1>{{ portalSlug ? t('editPortal') : t('newPortal') }}</h1>
              <p>Configure the portal's details, content, access and menu structure.</p>
            </div>
            <span v-if="portal.slug" class="ep-portal-badge">
              <span class="ep-av">{{ portal.slug.slice(0, 2).toUpperCase() }}</span>
              {{ portal.title['en'] || portal.slug }}
            </span>
          </div>

          <div v-if="saveError" class="ep-alert-danger">
            <i class="fa fa-exclamation-triangle"></i>
            {{ t('errorSaving') }}: {{ (saveError as any)?.message || String(saveError) }}
          </div>

          <!-- ─── Details ──────────────────────────── -->
          <section class="ep-card" id="sec-details">
            <div class="ep-card-head">
              <h2><i class="fa fa-info-circle ep-ic-accent"></i> {{ t('portalDetails') }}</h2>
            </div>
            <div class="ep-card-body">

              <div class="ep-field">
                <label>{{ t('slug') }} <span class="ep-req">*</span></label>
                <div class="ep-field-ctrl">
                  <input class="ep-inp ep-mono" v-model="portal.slug" :placeholder="t('slugPlaceholder')" />
                  <div class="ep-hint">{{ t('slugHelp') }}</div>
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('title') }} <span class="ep-req">*</span></label>
                <div class="ep-field-ctrl">
                  <div class="ep-lang-inp">
                    <span class="ep-lang-prefix" @click="showAllTitleLangs = !showAllTitleLangs">EN</span>
                    <input v-model="portal.title['en']" placeholder="English title" />
                    <button class="ep-lang-more" @click="showAllTitleLangs = !showAllTitleLangs"
                      :title="showAllTitleLangs ? 'Hide languages' : 'Add translation'">
                      <i class="fa" :class="showAllTitleLangs ? 'fa-chevron-up' : 'fa-plus'"></i>
                    </button>
                  </div>
                  <template v-if="showAllTitleLangs">
                    <div v-for="lang in OTHER_LANGUAGES" :key="lang" class="ep-lang-inp mt-1">
                      <span class="ep-lang-prefix">{{ lang.toUpperCase() }}</span>
                      <input v-model="portal.title[lang]" :placeholder="lang" />
                    </div>
                  </template>
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('sortOrder') }}</label>
                <div class="ep-field-ctrl" style="max-width:140px">
                  <input class="ep-inp" type="number" v-model.number="portal.sortOrder" />
                </div>
              </div>

              <div class="ep-field">
                <label>{{ t('realms') }}</label>
                <div class="ep-field-ctrl">
                  <div v-if="portal.realms.length" class="ep-chips mb-2">
                    <span v-for="(r, i) in portal.realms" :key="r" class="ep-chip">
                      {{ r }}
                      <button class="ep-chip-x" type="button" @click="removeRealm(i)">×</button>
                    </span>
                  </div>
                  <input
                    class="ep-inp ep-mono"
                    v-model="realmDraft"
                    placeholder="Type a realm code and press Enter…"
                    @keydown.enter.prevent="addRealm"
                    @blur="addRealm"
                  />
                  <div class="ep-hint">Press Enter to add (e.g. BCH, ABS, CHM). Always uppercase.</div>
                </div>
              </div>

            </div>
          </section>

          <!-- ─── Content ──────────────────────────── -->
          <section class="ep-card" id="sec-content">
            <div class="ep-card-head">
              <h2><i class="fa fa-file-text-o ep-ic-accent"></i> {{ t('content') }}</h2>
            </div>
            <div class="ep-card-body">

              <div class="ep-field ep-field-first">
                <label>{{ t('articleId') }}</label>
                <div class="ep-field-ctrl">
                  <div v-if="portal.content.article.articleId" class="ep-article-chip">
                    <code class="ep-article-id">{{ portal.content.article.articleId }}</code>
                    <span v-if="selectedArticleTitle" class="ep-article-meta">
                      <b>{{ selectedArticleTitle }}</b>
                    </span>
                    <div class="ep-article-actions">
                      <button class="ep-btn-ghost-sm" type="button" @click="articlePickerRef?.show()">
                        <i class="fa fa-search"></i> Change article
                      </button>
                      <button class="ep-btn-ghost-sm" type="button" @click="clearArticle">
                        <i class="fa fa-times"></i> Remove
                      </button>
                    </div>
                  </div>
                  <button v-else class="ep-btn-ghost-sm" type="button" @click="articlePickerRef?.show()">
                    <i class="fa fa-search"></i> Choose article
                  </button>
                </div>
              </div>

              <div class="ep-field">
                <label>Display</label>
                <div class="ep-field-ctrl">
                  <label class="ep-check">
                    <input type="checkbox" v-model="portal.content.article.showCoverImage" />
                    {{ t('showCoverImage') }}
                  </label>
                </div>
              </div>

            </div>
          </section>

          <!-- ─── Access control ───────────────────── -->
          <section class="ep-card" id="sec-access">
            <div class="ep-card-head">
              <h2><i class="fa fa-lock ep-ic-accent"></i> Access control</h2>
              <span class="ep-card-hint">Leave empty to inherit from parent / public</span>
            </div>
            <div class="ep-card-body">
              <acl-editor v-model="portal.acl" />
            </div>
          </section>

          <!-- ─── Menus ─────────────────────────────── -->
          <section class="ep-card" id="sec-menus">
            <div class="ep-card-head">
              <h2>
                <i class="fa fa-bars ep-ic-accent"></i> {{ t('menus') }}
                <span v-if="portal.menus.length" class="ep-nav-count" style="margin-left:4px">{{ portal.menus.length }}</span>
              </h2>
              <button class="ep-btn-primary-sm" type="button" @click="addMenu">
                <i class="fa fa-plus"></i> {{ t('addMenu') }}
              </button>
            </div>
            <div class="ep-card-body">
              <div class="ep-menus-grid">
                <div class="ep-menus-editor">
                  <div v-if="!portal.menus?.length" class="ep-empty-state">
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
                <div class="ep-menus-preview">
                  <div class="ep-preview-label">Preview</div>
                  <!-- capture prevents link navigation while still letting Bootstrap collapse fire -->
                  <div style="user-select:none;opacity:.85" @click.capture.prevent>
                    <side-menu :menu="previewMenu" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Danger zone -->
          <div v-if="portalSlug" class="ep-danger-zone">
            <button class="ep-btn-danger" type="button" :disabled="isDeleting" @click="deletePortal">
              <i v-if="isDeleting" class="fa fa-cog fa-spin"></i>
              {{ isDeleting ? t('deleting') : t('deletePortal') }}
            </button>
          </div>

        </div>
      </div>
    </template>

    <!-- Article picker (modal, lives outside scroll area) -->
    <article-picker ref="articlePickerRef" @select="onArticleSelect" />

    <!-- ─── Sticky save bar ───────────────────────── -->
    <div class="ep-savebar">
      <div class="ep-savebar-inner">
        <div class="ep-status" :class="isDirty ? 'ep-unsaved' : 'ep-saved'">
          <span class="ep-dot"></span>
          {{ isDirty ? 'Unsaved changes' : 'All changes saved' }}
        </div>
        <div class="ep-savebar-actions">
          <a href="/portals" class="ep-btn-ghost">Cancel</a>
          <button class="ep-btn-primary" type="button" :disabled="isSaving || isLoading" @click="save">
            <i v-if="isSaving" class="fa fa-cog fa-spin"></i>
            {{ isSaving ? t('saving') : t('save') }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
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
// @ts-expect-error no types
import SideMenu from '~/components/menus/side-menu.vue';
import ArticlePicker from '~/components/portals/article-picker.vue';
import AclEditor from '~/components/portals/acl-editor.vue';
import messages from '~/app-text/views/portals/edit-portal.json';

const { t } = useI18n({ messages });
const auth = useAuth();
const route = useRoute();
const { realm } = useRealm();
const portalsApi = new PortalsApi({ tokenReader: () => auth.token() });

const portalSlug = computed(() => route.value?.params?.portalId as string | undefined);
const portalDbId = ref<string | undefined>(undefined);

const OTHER_LANGUAGES = ['ar', 'es', 'fr', 'ru', 'zh'];
const showAllTitleLangs = ref(false);

const isLoading  = ref(false);
const isSaving   = ref(false);
const isDeleting = ref(false);
const loadError  = ref<unknown>(null);
const saveError  = ref<unknown>(null);

// ── Dirty tracking ───────────────────────────────────────
const isDirty       = ref(false);
let   cleanSnapshot = '';

function snapshot() { return JSON.stringify(portal.value); }

// ── Realm chip input ─────────────────────────────────────
const realmDraft = ref('');

function addRealm() {
  const code = realmDraft.value.trim().toUpperCase();
  if (code && !portal.value.realms.includes(code)) {
    portal.value.realms.push(code);
  }
  realmDraft.value = '';
}

function removeRealm(i: number) {
  portal.value.realms.splice(i, 1);
}

// ── Article picker ───────────────────────────────────────
const articlePickerRef    = ref<InstanceType<typeof ArticlePicker> | null>(null);
const selectedArticleTitle = ref('');

function onArticleSelect(article: { _id: string; title: unknown }) {
  portal.value.content.article.articleId = article._id;
  const title = article.title;
  if (!title) { selectedArticleTitle.value = ''; return; }
  if (typeof title === 'string') { selectedArticleTitle.value = title; return; }
  const obj = title as Record<string, string>;
  selectedArticleTitle.value = obj['en'] || obj['fr'] || obj['es'] || Object.values(obj).find(Boolean) || '';
}

function clearArticle() {
  portal.value.content.article.articleId = '';
  selectedArticleTitle.value = '';
}

// ── Portal state ─────────────────────────────────────────
const portal = ref({
  slug:    '',
  title:   {} as Record<string, string>,
  sortOrder: 0,
  realms:  [] as string[],
  content: { article: { articleId: '', showCoverImage: false } },
  menus:   [] as unknown[],
  acl:     { enabled: false, read: [] as number[], update: [] as number[] },
});

watch(portal, () => { isDirty.value = snapshot() !== cleanSnapshot; }, { deep: true });

// ── Preview ───────────────────────────────────────────────
function toPreviewMenu(item: any, basePath: string): any {
  const path = [basePath, item.slug].filter(Boolean).join('/');
  const { url, target } = item.url || {};
  return {
    url: url || path, title: item.title,
    isExpanded: item.isExpanded || false,
    hasContent: !!item.content,
    target: url ? target : undefined,
    menus: (item.menus || []).map((c: any) => toPreviewMenu(c, path)),
  };
}

const previewMenu = computed(() => ({
  url:   `portals/${portal.value.slug}`,
  title: portal.value.title,
  menus: (portal.value.menus as any[]).map(m => toPreviewMenu(m, `portals/${portal.value.slug}`)),
}));

// ── Section nav scroll-spy ────────────────────────────────
const SECTION_IDS = ['sec-details', 'sec-content', 'sec-access', 'sec-menus'];
const activeSection = ref('sec-details');

const SECTIONS = computed(() => [
  { id: 'sec-details', icon: 'fa-info-circle',  label: t('portalDetails') },
  { id: 'sec-content', icon: 'fa-file-text-o',  label: t('content')       },
  { id: 'sec-access',  icon: 'fa-lock',          label: 'Access'           },
  { id: 'sec-menus',   icon: 'fa-bars',          label: t('menus'),
    count: portal.value.menus.length || undefined },
]);

let observer: IntersectionObserver | null = null;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(async () => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id; });
  }, { rootMargin: '-20% 0px -70% 0px' });

  SECTION_IDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer!.observe(el);
  });

  if (!portalSlug.value) return;
  isLoading.value = true;
  try {
    const data = await portalsApi.getPortalByCode(realm.value, portalSlug.value);
    portalDbId.value = data._id;
    portal.value = {
      slug:      data.slug || '',
      title:     data.title || {},
      sortOrder: data.sortOrder ?? 0,
      realms:    data.realms || [],
      content:   data.content?.article ? data.content : { article: { articleId: '', showCoverImage: false } },
      menus:     data.menus || [],
      acl:       { enabled: data.acl?.enabled || false, read: data.acl?.read || [], update: data.acl?.update || [] },
    };
    cleanSnapshot = snapshot();
    isDirty.value = false;
  } catch (err) {
    loadError.value = err;
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => observer?.disconnect());

// ── CRUD ─────────────────────────────────────────────────
function addMenu() {
  portal.value.menus.push({ slug: '', title: {}, menus: [], acl: { enabled: false, read: [], update: [] } });
}
function removeMenu(i: number) { portal.value.menus.splice(i, 1); }
function moveMenu(i: number, dir: number) {
  const arr = portal.value.menus;
  const j   = i + dir;
  if (j < 0 || j >= arr.length) return;
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

async function save() {
  saveError.value = null;
  isSaving.value  = true;
  try {
    const payload = { ...portal.value };
    if (portalDbId.value) {
      await portalsApi.updatePortal(portalDbId.value, payload);
    } else {
      const created = await portalsApi.createPortal(payload);
      portalDbId.value = created._id;
    }
    cleanSnapshot = snapshot();
    isDirty.value = false;
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

<style scoped>
/* ── Design tokens ─────────────────────────────────────── */
.ep-wrap {
  --navy: #0b3b4d;
  --navy-50: #eef4f7;
  --accent: #e4572e;
  --accent-50: #fde9e1;
  --ink: #1b2a33;
  --ink-2: #3c4e57;
  --ink-3: #6a7d87;
  --line: #dde4e8;
  --line-2: #eef2f4;
  --bg: #eef1f4;
  --card: #ffffff;
  --ok: #2e8b57;
  --danger: #d64541;
  --radius: 7px;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  font-size: 14px;
  padding-bottom: 72px;
}

/* ── Shell (nav + main) ────────────────────────────────── */
.ep-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 28px;
  align-items: flex-start;
}
@media (max-width: 1080px) {
  .ep-shell { grid-template-columns: 1fr; }
  .ep-secnav { display: none; }
}

/* ── Section nav ───────────────────────────────────────── */
.ep-secnav {
  position: sticky;
  top: 80px;
  font-size: 13px;
}
.ep-secnav-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 12px;
  padding-left: 14px;
}
.ep-secnav ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.ep-secnav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 14px;
  border-radius: 6px;
  color: var(--ink-2);
  font-weight: 500;
  cursor: pointer;
  border-left: 2px solid transparent;
  user-select: none;
}
.ep-secnav a:hover { background: #fff; color: var(--navy); }
.ep-secnav a.active {
  background: #fff;
  color: var(--navy);
  font-weight: 600;
  border-left-color: var(--accent);
  box-shadow: 0 1px 3px rgba(11,59,77,.05);
}
.ep-ic { width: 16px; text-align: center; color: var(--ink-3); }
.ep-secnav a.active .ep-ic { color: var(--accent); }
.ep-nav-count {
  margin-left: auto;
  font-size: 11px;
  background: var(--navy-50);
  color: var(--navy);
  border-radius: 10px;
  padding: 1px 8px;
  font-weight: 600;
}

/* ── Main ──────────────────────────────────────────────── */
.ep-main { display: flex; flex-direction: column; gap: 18px; min-width: 0; }

.ep-page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 2px;
}
.ep-page-head h1 { margin: 0; font-size: 22px; font-weight: 700; color: var(--navy); letter-spacing: -.01em; }
.ep-page-head p  { margin: 3px 0 0; color: var(--ink-3); font-size: 13px; }

.ep-portal-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 12px 5px 6px;
  font-size: 12.5px;
  color: var(--ink-2);
  font-weight: 500;
  white-space: nowrap;
}
.ep-av {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--navy); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700;
}

/* ── Cards ─────────────────────────────────────────────── */
.ep-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  scroll-margin-top: 80px;
}
.ep-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line-2);
}
.ep-card-head h2 {
  margin: 0;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--navy);
  display: flex;
  align-items: center;
  gap: 9px;
}
.ep-ic-accent { color: var(--accent); }
.ep-card-hint  { font-size: 12px; color: var(--ink-3); }
.ep-card-body  { padding: 4px 20px 18px; }

/* ── Form fields ───────────────────────────────────────── */
.ep-field {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 18px;
  padding: 13px 0;
  align-items: flex-start;
  border-top: 1px solid var(--line-2);
}
.ep-field-first { border-top: none; padding-top: 6px; }
@media (max-width: 620px) {
  .ep-field { grid-template-columns: 1fr; gap: 6px; }
}
.ep-field > label {
  font-weight: 600;
  color: var(--ink);
  font-size: 13.5px;
  padding-top: 8px;
}
.ep-req    { color: var(--accent); margin-left: 2px; }
.ep-hint   { font-size: 12px; color: var(--ink-3); margin-top: 6px; }
.ep-field-ctrl { min-width: 0; }

.ep-inp {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 9px 12px;
  font: inherit;
  font-size: 13.5px;
  color: var(--ink);
  background: #fff;
  transition: border-color .15s, box-shadow .15s;
}
.ep-inp:focus { outline: 0; border-color: #2a6fdb; box-shadow: 0 0 0 3px rgba(42,111,219,.12); }
.ep-inp::placeholder { color: #9fb0ba; }
.ep-mono { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 12.5px; }

/* Title language input */
.ep-lang-inp {
  display: flex;
  border: 1px solid var(--line);
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.ep-lang-inp:focus-within { border-color: #2a6fdb; box-shadow: 0 0 0 3px rgba(42,111,219,.12); }
.ep-lang-prefix {
  background: var(--navy-50);
  color: var(--navy);
  font-weight: 700;
  font-size: 12px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  border-right: 1px solid var(--line);
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
}
.ep-lang-inp input { flex: 1; border: 0; outline: 0; padding: 9px 12px; font: inherit; font-size: 13.5px; min-width: 0; }
.ep-lang-more {
  border: 0;
  border-left: 1px solid var(--line);
  background: #fff;
  color: var(--ink-3);
  padding: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.ep-lang-more:hover { color: var(--navy); }

/* Realm / role chips */
.ep-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.ep-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 6px 4px 11px;
  font-size: 12.5px;
  color: var(--ink-2);
  font-weight: 500;
}
.ep-chip-x {
  width: 17px; height: 17px;
  border-radius: 50%;
  border: 0;
  background: var(--line-2);
  color: var(--ink-3);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 0;
}
.ep-chip-x:hover { background: var(--danger); color: #fff; }

/* Checkbox */
.ep-check { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; font-size: 13.5px; color: var(--ink-2); }
.ep-check input { width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer; }

/* Article chip */
.ep-article-chip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  background: var(--navy-50);
  border-radius: 8px;
  padding: 10px 14px;
}
.ep-article-id {
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 12px;
  color: var(--navy);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 3px 8px;
}
.ep-article-meta { font-size: 12.5px; color: var(--ink-2); }
.ep-article-actions { display: flex; gap: 8px; margin-left: auto; }

/* Menus grid */
.ep-menus-grid { display: grid; grid-template-columns: minmax(0,1fr) 300px; gap: 24px; }
@media (max-width: 1100px) { .ep-menus-grid { grid-template-columns: 1fr; } .ep-menus-preview { display: none; } }
.ep-menus-editor { min-width: 0; }
.ep-preview-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 8px; }
.ep-menus-preview { position: sticky; top: 80px; }

.ep-empty-state {
  text-align: center;
  padding: 28px;
  color: var(--ink-3);
  font-size: 13px;
  border: 1.5px dashed var(--line);
  border-radius: 9px;
}

/* ── Buttons ───────────────────────────────────────────── */
.ep-btn-primary {
  display: inline-flex; align-items: center; gap: 7px;
  background: var(--accent); color: #fff;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font: 600 13.5px inherit;
  padding: 9px 18px;
  cursor: pointer;
  transition: background .15s;
}
.ep-btn-primary:hover:not(:disabled) { background: #c8451f; }
.ep-btn-primary:disabled { opacity: .6; cursor: not-allowed; }

.ep-btn-primary-sm {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--accent); color: #fff;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font: 600 12.5px inherit;
  padding: 6px 12px;
  cursor: pointer;
}
.ep-btn-primary-sm:hover { background: #c8451f; }

.ep-btn-ghost {
  display: inline-flex; align-items: center; gap: 7px;
  background: #fff; color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  font: 600 13.5px inherit;
  padding: 9px 16px;
  cursor: pointer;
  text-decoration: none;
  transition: border-color .15s;
}
.ep-btn-ghost:hover { border-color: var(--navy); color: var(--navy); }

.ep-btn-ghost-sm {
  display: inline-flex; align-items: center; gap: 6px;
  background: #fff; color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  font: 500 12.5px inherit;
  padding: 6px 11px;
  cursor: pointer;
  transition: border-color .15s;
}
.ep-btn-ghost-sm:hover { border-color: var(--navy); color: var(--navy); }

.ep-btn-danger {
  display: inline-flex; align-items: center; gap: 7px;
  background: transparent; color: var(--danger);
  border: 1px solid var(--danger);
  border-radius: var(--radius);
  font: 600 13.5px inherit;
  padding: 9px 16px;
  cursor: pointer;
}
.ep-btn-danger:hover:not(:disabled) { background: #fdf1f0; }
.ep-btn-danger:disabled { opacity: .6; cursor: not-allowed; }

/* ── Danger zone ───────────────────────────────────────── */
.ep-danger-zone {
  display: flex;
  justify-content: flex-end;
  padding: 4px 0 8px;
}

/* ── Alert ─────────────────────────────────────────────── */
.ep-alert-danger {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fdf1f0;
  border: 1px solid #f1c4c2;
  color: var(--danger);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 13.5px;
}

/* ── Sticky save bar ───────────────────────────────────── */
.ep-savebar {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  z-index: 100;
  background: #fff;
  border-top: 1px solid var(--line);
  box-shadow: 0 -3px 14px rgba(11,59,77,.07);
}
.ep-savebar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.ep-status { display: flex; align-items: center; gap: 9px; font-size: 13px; color: var(--ink-3); }
.ep-dot    { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-3); flex-shrink: 0; }
.ep-unsaved .ep-dot {
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(228,87,46,.5);
  animation: ep-pulse 2s infinite;
}
.ep-saved .ep-dot { background: var(--ok); }
@keyframes ep-pulse {
  70%  { box-shadow: 0 0 0 6px rgba(228,87,46,0); }
  100% { box-shadow: 0 0 0 0  rgba(228,87,46,0); }
}
.ep-savebar-actions { display: flex; gap: 10px; align-items: center; }
</style>
