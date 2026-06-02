<template>
  <div>
    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        :id="checkboxId"
        :checked="modelValue.enabled"
        @change="toggleEnabled"
      />
      <label class="form-check-label fw-semibold" :for="checkboxId">ACL</label>
    </div>

    <template v-if="modelValue.enabled">
      <div v-if="loadError" class="alert alert-warning py-1 small mb-2">{{ loadError }}</div>

      <div v-for="perm in PERMISSIONS" :key="perm.key" class="mb-3 ms-3">
        <label class="form-label small fw-semibold mb-1">{{ perm.label }}</label>

        <div class="d-flex gap-2 mb-2">
          <select v-model="pending[perm.key]" class="form-select form-select-sm" :disabled="isLoading">
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
            class="btn btn-sm btn-outline-secondary"
            :disabled="!pending[perm.key]"
            @click="add(perm.key)"
          >
            <i class="fa fa-plus" />
          </button>
        </div>

        <div class="d-flex flex-wrap gap-1">
          <span
            v-for="(roleId, i) in modelValue[perm.key]"
            :key="roleId"
            class="badge d-inline-flex align-items-center gap-1"
            :class="perm.badgeClass"
          >
            {{ roleName(roleId) }}
            <button
              type="button"
              class="btn-close btn-close-white ms-1"
              style="font-size:0.55rem"
              @click="remove(perm.key, i)"
            />
          </span>
          <span v-if="!modelValue[perm.key]?.length" class="text-muted fst-italic small">None</span>
        </div>
      </div>
    </template>
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
  { key: 'read'   as const, label: 'Read',   badgeClass: 'bg-primary'           },
  { key: 'update' as const, label: 'Update',  badgeClass: 'bg-warning text-dark' },
];

const checkboxId = `acl-${Math.random().toString(36).slice(2, 8)}`;

const auth     = useAuth();
const rolesApi = new RolesApi({ tokenReader: () => auth.token() });
const roles     = ref<Role[]>([]);
const isLoading = ref(false);
const loadError = ref('');
const pending   = reactive<Record<string, number | ''>>({ read: '', update: '' });

let rolesCache: Role[] | null = null;

onMounted(async () => {
  if (!props.modelValue.enabled) return;
  await loadRoles();
});

async function loadRoles() {
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
}

async function toggleEnabled(e: Event) {
  const enabled = (e.target as HTMLInputElement).checked;
  emit('update:modelValue', { ...props.modelValue, enabled });
  if (enabled) await loadRoles();
}

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
