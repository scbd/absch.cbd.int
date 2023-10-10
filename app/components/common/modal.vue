
<template>
    <div ref="modal" class="modal fade"  aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                <h5 class="modal-title" id="staticBackdropLabel">
                    {{ title | lstring }}
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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t("closeButton") }}</button>
                    </div>
                </div>
            </slot>
        </div>
        </div>
    </div>
    </div>

</template>
    
<script>
import bootstrap from 'bootstrap'
import i18n from "../../app-text/components/common/modal.json";

export default {
    name: 'SimpleModal',
    i18n: { messages: { en: i18n } },
    emits: ['show', 'close'],
    props: {
        title:    { type:  [String, Object] },
    },
    computed: {
    },
    methods: {
        close,
    },
    async mounted() {

        const el = this.$refs.modal;
        const modal = bootstrap.Modal.getOrCreateInstance(el);

        el.addEventListener('shown.bs.modal',  ()=>this.$emit('show'));
        el.addEventListener('hidden.bs.modal', ()=>this.$emit('close'));

        this.modal = modal;

        modal.show();
    }
}

function close() {
    const { modal } = this;
    modal.hide();
}

</script>