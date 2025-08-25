<template>
    <div v-if="offlineDocuments" class="btn border fs-small-8">
        {{t('offlineFormat')}}
        <span v-for="(url, code, index) in offlineDocuments" :key="code">
            <a class="text-decoration-none" :href="url" target="_blank" rel="noopener">
                {{ code }}
            </a>
            <span v-if="index < Object.keys(offlineDocuments).length - 1" class="px-1">|</span>
        </span>
    </div>
</template>

<script setup>
    import { computed, ref, onMounted } from "vue";
    import messages from '../../app-text/views/register/record-list.json';
    import { useRealm } from "../../services/composables/realm";
    import { useI18n } from 'vue-i18n';

    const props = defineProps({
        schema: { type: String, required: true }
    });

    const { t } = useI18n({ messages });

    const realm = useRealm();
    const offlineFormats = ref({});

    onMounted(async () => {
        try {
            const appName = realm.value.replace(/-.*/,'').toLowerCase(); // 'bch' | 'abs' | 'chm'
            offlineFormats.value = await import(
                `../../app-data/${appName}/offline-formats.json`
            ).then(m => m.default || m);
        } catch (e) {
            console.error("No offline formats found for realm:", realm, e);
        }
    });

    const offlineDocuments = computed(() => offlineFormats.value?.[props.schema]);
</script>
