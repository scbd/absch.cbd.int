
<template>
    <div ref="modalRef" class="modal fade"  aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                <h5 class="modal-title" id="staticBackdropLabel">
                    {{ lstring(title, locale) }}
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </slot>
        </div>
        <div class="modal-body">
            <slot name="default">
            </slot>
        </div>
        <div class="modal-footer">
            <slot name="footer">
                <div class="row w-100">
                    <div class="col">
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ t("closeButton") }}</button>
                    </div>
                </div>
            </slot>
        </div>
        </div>
    </div>
    </div>

</template>
<script setup>
    import { shallowRef, onMounted } from "vue";
    import { Modal } from "bootstrap";
    import { useI18n } from 'vue-i18n';
    import messages from '../../app-text/components/common/modal.json';
    import { lstring } from '../../components/kb/filters';
    const { t, locale } = useI18n({ messages });
    const modalRef = shallowRef(null);
    let modal = null;
    
    const props = defineProps({
        title: [String, Object], 
        required: true,
    });

    onMounted(() => {
        modal = new Modal(modalRef.value);
    });

    const show = () => {
        modal.show('static');
    };

    const close = () => {
        modal.hide();
    };

    defineExpose({show, close})
</script>