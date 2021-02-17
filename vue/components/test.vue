<template>
    <button v-on:click="count++">My embeded component. You clicked me {{ count }} times.</button>
</template>

<script>
export default {
    data:  () => {
        return {
            count: 0,
            ddsf:'sadsa'

        }
    }
}
</script> 