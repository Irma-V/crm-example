<template>
    <div class="app-main-layout">
        <VNavbar @clickOnBurger="closeSideBar()" />

        <VSidebar :class="{ open: this.isOpen }" />

        <main class="app-content" :class="{ full: !isOpen }">
            <div class="app-page">
                <router-view />
            </div>
        </main>


        <div class="fixed-action-btn">
            <router-link :to="{ name: 'record' }" class="btn-floating btn-large blue" href="#">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import VNavbar from '@/components/app/Navbar.vue';
import VSidebar from '@/components/app/Sidebar.vue';
import store from '@/store';
import messages from '@/utils/messages'


export default {
    name: "MainLayout",
    components: {
        VNavbar,
        VSidebar,
    },
    props: {},
    data() {
        return {
            isOpen: true
        }
    },

    // created() {
    //     // console.log(this.isOpen);
    // },

    async mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }
        // if (!Object.keys(store.getters.info).length) {
        if (store.getters.infoIsEmpty) {
            await store.dispatch('fetchInfo')
        }
    },
    methods: {
        closeSideBar() {
            this.isOpen = !this.isOpen
            // console.log(this.isOpen);
            return this.isOpen
        }
    },
}
</script>