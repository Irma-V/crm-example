<template>
    <div class="app-main-layout">
        <VNavbar @clickOnBurger="closeSideBar()" />

        <VSidebar :class="{open: this.isOpen}"/>

        <main class="app-content" :class="{ full: !isOpen }">
            <div class="app-page">
                <router-view />
            </div>
        </main>

        <router-link :to="{ name: 'record' }">
            <div class="fixed-action-btn">
                <a class="btn-floating btn-large blue" href="#">
                    <i class="large material-icons">add</i>
                </a>
            </div>
        </router-link>
    </div>
</template>

<script>
import VNavbar from '@/components/app/Navbar.vue';
import VSidebar from '@/components/app/Sidebar.vue';


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

    created() {
        console.log(this.isOpen);
    },
    methods: {
        closeSideBar() {
            this.isOpen = !this.isOpen
            console.log(this.isOpen);
            return this.isOpen
        }
    }
}
</script>