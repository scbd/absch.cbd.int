
<template>
    <div ref="modal" class="modal fade"  aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                <h5 class="modal-title" id="staticBackdropLabel">
                    {{ title }}
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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default {
    name: 'SimpleModal',
    emits: ['show', 'close'],
    props: {
        title:    { type:  String },
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