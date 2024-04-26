<template>
    <div class="float-end record-Options-div">
        <span class="xlabel" ng-if="createdOn">
            published: <span class="text-primary bold" >{{formatDate(document.createdOn, 'DD MMM YYYY')}}</span>       
        </span>
        <span class="xlabel" ng-if="updatedOn">
            last updated: <span class="text-primary bold">{{formatDate(document.updatedOn, 'DD MMM YYYY')}}</span>          
        </span>
    </div>
</template>

<script setup>
    import { formatDate } from '~/components/kb/filters';

    const props = defineProps({
        document: { type: Object, required: true },       
    })
</script>