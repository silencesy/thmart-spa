<template>
    <div>
        
        <BottomBar />
    </div>
</template>
<script>
export default {
    components: {
        BottomBar: r => { require.ensure([], () => r(require('../BaseComponents/BottomBar')), 'BottomBar') },
    },
}
</script>
<style scoped>

</style>
