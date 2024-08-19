<template>
    <span ref="tooltip" :class="{ deleted: deleted }" data-bs-toggle="tooltip" data-bs-placement="top">
        <loading v-if="loading" />
        <i v-if="!loading && !isPublic" class="fa" :class="{ 'fa-lock' : locked, 'fa-unlock': !locked }" aria-hidden="true"></i>
        <a :href="url" :class="{ disabled: loading }" target="_blank" class="card-link" @click="unlock($event)">
            {{ attachment.filename }}
        </a>
        - {{sizeText}}
    </span>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
    import ForumsApi from '~/api/forums';
    import pending from '~/services/pending-call';
    import Loading from '~/components/common/loading.vue';
    import { Tooltip } from 'bootstrap';
    import messages from '../../app-text/components/forums/edit-post.json';
    import { encode as encodeHtml } from '~/services/html.js';
    import { useAuth } from "@scbd/angular-vue/src/index.js";
    import { useI18n } from 'vue-i18n';

    const props = defineProps({
        attachment: { type: Object, required: true },
        autoUnlock: { type: Boolean, default: false },
    });

    const { t } = useI18n({ messages });
    const auth = useAuth();

    const loading = ref(false);
    const directUrl = ref(null);
    const expiresOn = ref(null);
    const tooltip = ref(null);
    let timer = null;

    const forumsApi = new ForumsApi({ tokenReader: () => auth.token() });

    const sizeText = computed(() => {
        const size = props.attachment.size;

        if (size < 1024) return t('sizeB', { size: size });
        if (size / 1024 < 1024) return t('sizeKB', { size: (size / 1024).toFixed(1) });

        return t('sizeMB', { size: (size / 1024 / 1024).toFixed(1) });
    });

    const tooltipMessageHtml = computed(() => {
        if (isPublic.value) return '';
        if (loading.value) return `<i class="fa fa-cog fa-spin"></i>${encodeTextToHtml(t('attachmentUnlocking'))}`;
        if (locked.value) return `<i class="fa fa-lock"></i>${encodeTextToHtml(t('attachmentLocked'))}`;

        return `<i class="fa fa-check"></i>${encodeTextToHtml(t('attachmentUnlocked'))}`;
    });

    const deleted = computed(() => !!props.attachment.deletedBy);

    const isPublic = computed(() => props.attachment.isPublic);

    const locked = computed(() => !isPublic.value && !directUrl.value);

    const url = computed(() => {
        const { attachmentId } = props.attachment;
        return directUrl.value || `/api/v2014/discussions/attachments/${encodeURIComponent(attachmentId)}?stream`;
    });

    watch(tooltipMessageHtml, (msg) => {
        if (!tooltip.value) return;

        const tooltipInstance = Tooltip.getInstance(tooltip.value);
        if (tooltipInstance?._popper) {
            tooltipInstance.setContent({ '.tooltip-inner': tooltipMessageHtml.value });
            tooltipInstance.show();
        }
    });

    const unlock = async ($event) => {
        if (!locked.value) return;
        if ($event) $event.preventDefault();
        if (loading.value) return;

        resetLock();

        const delegate = pending(async () => {
            const { url, expire } = await forumsApi.getAttachmentDirectUrl(props.attachment.attachmentId);

            directUrl.value = url;
            expiresOn.value = expire;

            if (expire) {
                const expiresOnDate = new Date(expire);
                const expiresMs = Math.max(expiresOnDate.getTime() - Date.now(), 0);

                if (expiresMs) {
                    timer = setTimeout(() => resetLock(), expiresMs);
                }
            }
        }, 'loading');

        delegate.call({ loading }); //todo need to verify
    };

    const resetLock = () => {
        if (timer) clearTimeout(timer);

        timer = null;
        directUrl.value = null;
    };

    const encodeTextToHtml = (text) => {
        return encodeHtml(text).replace(/\n/g, "<br>\n");
    };

    onMounted(() => {
        if (locked.value && props.autoUnlock) {
            unlock();
        }

        if (tooltip.value) {
            new Tooltip(tooltip.value, {
                html: true,
                title: () => tooltipMessageHtml.value
            });
        }
    });
    // beforeDestroy : resetLock,
    onBeforeUnmount(() => {
        resetLock();
        const tooltipInstance = Tooltip.getInstance(tooltip.value);
        if (tooltipInstance) {
            tooltipInstance.dispose();
        }
    });
</script>

<style scoped>
.deleted {
    text-decoration: line-through;
}
</style>
