<template>
    <div class="header" :class="color">
        <h1 class="headline">{{ title }}</h1>
        <p class="font-weight-light grey--text text--lighten-2">{{ subtitle }}</p>
    </div>
</template>

<script>
export default {
    props: ['title', 'subtitle', 'color'],
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        
        background: rgb(22, 96, 206);
        opacity: 0.9;
        color: #fff;
        border-radius: 10px;
        box-shadow: 1px 1px 10px 5px rgba(13, 72, 161, 0.322);
        padding: 1px 30px;
        padding-top: 10px;
        position: relative;
        width: 95%;
        margin: 20px 2.5% 0 2.5%;

        &.green {
            background: rgb(11, 187, 70);
            box-shadow: 1px 1px 10px 5px rgba(11, 187, 70, 0.322);
        }

    }

</style>