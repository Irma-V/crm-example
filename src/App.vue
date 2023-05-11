<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';


export default {
    // data() {
    //     return {};
    // },
    computed: {
        layout() {
            // console.log(this.$route.meta.layout);
            return (this.$route.meta.layout || 'empty') + '-layout'
        },
    },
    components: {
        EmptyLayout,
        MainLayout,
    }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>

<!-- *.vue-template

<template> </template>

<script>
export default {
    name: "componentName",
    components: {},
    props: {},
    data () {
        return {
            
        }
    },
}
</script>
-->