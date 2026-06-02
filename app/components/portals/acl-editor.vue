<template>
  <div class="acl-root">
    <div v-if="loadError" class="acl-error">{{ loadError }}</div>

    <div class="row g-3">
      <div v-for="perm in PERMISSIONS" :key="perm.key" class="col-12 col-md-6">

        <div class="acl-block-label">
          <span class="acl-badge" :class="`acl-badge--${perm.key}`">{{ perm.label }}</span>
          <span class="acl-desc">{{ perm.desc }}</span>
        </div>

        <div class="input-group input-group-sm mb-2">
          <select
            v-model="pending[perm.key]"
            class="form-select"
            :disabled="isLoading"
          >
            <option value="">{{ isLoading ? 'Loading roles…' : 'Select role…' }}</option>
            <option
              v-for="role in roles"
              :key="role.roleId"
              :value="role.roleId"
              :disabled="modelValue[perm.key]?.includes(role.roleId)"
            >
              {{ role.name }}
            </option>
          </select>
          <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="!pending[perm.key]"
            @click="add(perm.key)"
          >
            +
          </button>
        </div>

        <div class="acl-chips">
          <span
            v-for="(roleId, i) in modelValue[perm.key]"
            :key="roleId"
            class="acl-chip"
          >
            {{ roleName(roleId) }}
            <button type="button" class="acl-chip-x" @click="remove(perm.key, i)">×</button>
          </span>
          <span v-if="!modelValue[perm.key]?.length" class="acl-empty">
            None — only administrators
          </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
// @ts-expect-error importing js file
import RolesApi from '~/api/roles';
// @ts-expect-error no types
import { useAuth } from '@scbd/angular-vue/src/index.js';

interface Role { roleId: number; name: string; code?: string; }
interface Acl  { enabled: boolean; read: number[]; update: number[]; }

const props = defineProps<{ modelValue: Acl }>();
const emit  = defineEmits<{ (e: 'update:modelValue', v: Acl): void }>();

const PERMISSIONS = [
  { key: 'read'   as const, label: 'READ',   desc: 'Who can view this portal'  },
  { key: 'update' as const, label: 'UPDATE', desc: 'Who can edit this portal'  },
];

const auth      = useAuth();
const rolesApi  = new RolesApi({ tokenReader: () => auth.token() });
const roles     = ref<Role[]>([]);
const isLoading = ref(false);
const loadError = ref('');
const pending   = reactive<Record<string, number | ''>>({ read: '', update: '' });

let rolesCache: Role[] | null = null;

onMounted(async () => {
  if (rolesCache) { roles.value = rolesCache; return; }
  isLoading.value = true;
  try {
    const data = await rolesApi.queryRoles();
    rolesCache = data;
    roles.value = data;
  } catch {
    loadError.value = 'Could not load roles.';
  } finally {
    isLoading.value = false;
  }
});

function roleName(id: number): string {
  return roles.value.find(r => r.roleId === id)?.name ?? String(id);
}

function add(key: 'read' | 'update') {
  const id = pending[key];
  if (!id) return;
  const current = props.modelValue[key] ?? [];
  if (!current.includes(Number(id))) {
    emit('update:modelValue', { ...props.modelValue, [key]: [...current, Number(id)] });
  }
  pending[key] = '';
}

function remove(key: 'read' | 'update', index: number) {
  const current = [...(props.modelValue[key] ?? [])];
  current.splice(index, 1);
  emit('update:modelValue', { ...props.modelValue, [key]: current });
}
</script>

<style scoped>
.acl-root {
  --line: #dde4e8;
  --line-2: #eef2f4;
  --ink-2: #3c4e57;
  --ink-3: #6a7d87;
  --navy: #0b3b4d;
  --accent: #e4572e;
  --accent-50: #fde9e1;
  --danger: #d64541;
}


.acl-block-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--ink-2);
  font-weight: 500;
}

.acl-badge {
  font-size: 10.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  padding: 2px 8px;
  border-radius: 3px;
}
.acl-badge--read   { background: var(--navy); color: #fff; }
.acl-badge--update { background: var(--accent-50); color: var(--accent); }

.acl-desc { font-size: 13px; color: var(--ink-2); }


.acl-chips { display: flex; flex-wrap: wrap; gap: 6px; min-height: 28px; }

.acl-chip {
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

.acl-chip-x {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 0;
  background: var(--line-2);
  color: var(--ink-3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  transition: background .12s, color .12s;
}
.acl-chip-x:hover { background: var(--danger); color: #fff; }

.acl-empty {
  font-size: 12.5px;
  color: var(--ink-3);
  font-style: italic;
  align-self: center;
}

.acl-error {
  font-size: 12.5px;
  color: var(--danger);
  margin-bottom: 10px;
}
</style>
