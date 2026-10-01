<template>
  <div>
    <div v-if="loadError" class="acl-error">
      {{ loadError }}
    </div>

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
            <option value="">
              {{ isLoading ? 'Loading roles…' : 'Select role…' }}
            </option>
            <option
              v-for="role in roles"
              :key="role.roleId"
              :value="role.code"
              :disabled="modelValue[perm.key]?.includes(role.code)"
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
            v-for="(code, i) in modelValue[perm.key]"
            :key="code"
            class="acl-chip"
          >
            {{ roleName(code) }}
            <button type="button" class="acl-chip-x" @click="remove(perm.key, i)">×</button>
          </span>
          <span v-if="!modelValue[perm.key]?.length" class="acl-empty">
            {{ perm.empty }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
// @ts-expect-error importing js file
import RolesApi from '~/api/roles'
import { useAuth } from '@scbd/angular-vue/src/index.js'

interface Role { roleId: number; name: string; code: string; }
interface Acl { enabled: boolean; read: string[]; update: string[]; }

const props = defineProps<{ modelValue: Acl }>()
const emit = defineEmits<(e: 'update:modelValue', v: Acl)=> void>()

const PERMISSIONS = [
  { key: 'read' as const, label: 'READ', desc: 'Who can view this portal', empty: 'Everyone' },
  { key: 'update' as const, label: 'UPDATE', desc: 'Who can edit this portal', empty: 'None — only administrators' }
]

const auth = useAuth()
const rolesApi = new RolesApi({ tokenReader: async () => await auth.token() })
const roles = ref<Role[]>([])
const isLoading = ref(false)
const loadError = ref('')
const pending = reactive<Record<string, string>>({ read: '', update: '' })

let rolesCache: Role[] | null = null

onMounted(async () => {
  if (rolesCache) { roles.value = rolesCache; return }
  isLoading.value = true
  try {
    const data = await rolesApi.queryRoles()
    rolesCache = data
    roles.value = data
  } catch {
    loadError.value = 'Could not load roles.'
  } finally {
    isLoading.value = false
  }
})

function roleName (code: string): string {
  return roles.value.find(r => r.code === code)?.name ?? code
}

function add (key: 'read' | 'update') {
  const { [key]: id } = pending
  if (!id) return
  const { modelValue } = props
  const { [key]: current } = modelValue
  if (!current.includes(id)) {
    emit('update:modelValue', { ...props.modelValue, [key]: [...current, id] })
  }
  pending[key] = ''
}

function remove (key: 'read' | 'update', index: number) {
  const current = [...props.modelValue[key]]
  current.splice(index, 1)
  emit('update:modelValue', { ...props.modelValue, [key]: current })
}
</script>

<style scoped>
/* Palette comes from the global design tokens (app/css/tokens.css) */

.acl-block-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--scbd-ink-2);
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
.acl-badge--read   { background: var(--scbd-navy); color: #fff; }
.acl-badge--update { background: var(--scbd-accent-50); color: var(--scbd-accent); }

.acl-desc { font-size: 13px; color: var(--scbd-ink-2); }

.acl-chips { display: flex; flex-wrap: wrap; gap: 6px; min-height: 28px; }

.acl-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid var(--scbd-line);
  border-radius: 999px;
  padding: 4px 6px 4px 11px;
  font-size: 12.5px;
  color: var(--scbd-ink-2);
  font-weight: 500;
}

.acl-chip-x {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 0;
  background: var(--scbd-line-2);
  color: var(--scbd-ink-3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 0;
  transition: background .12s, color .12s;
}
.acl-chip-x:hover { background: var(--scbd-danger); color: #fff; }

.acl-empty {
  font-size: 12.5px;
  color: var(--scbd-ink-3);
  font-style: italic;
  align-self: center;
}

.acl-error {
  font-size: 12.5px;
  color: var(--scbd-danger);
  margin-bottom: 10px;
}
</style>
