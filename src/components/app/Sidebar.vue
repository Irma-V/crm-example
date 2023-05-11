<template>
    <ul class="sidenav app-sidenav" :class="class">
        <li v-for="link in links" :key="link.url">
            <router-link :to="link.url" active-class="active" class="waves-effect waves-orange pointer">
                    <!-- <a href="#" class="waves-effect waves-orange pointer"> -->
                        {{ link.title }}
                    <!-- </a> -->
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "VSidebar",
    props: {
        class: { type: String }
    },
    components: {},
    data() {
        return {
            links: [
                {
                    title: 'Счет',
                    url: '/',
                },
                {
                    title: 'История',
                    url: '/history',
                },
                {
                    title: 'Планирование',
                    url: '/planning',
                },
                {
                    title: 'Новая запись',
                    url: '/record',
                },
                {
                    title: 'Категории',
                    url: '/categories',
                },
            ]
        }
    },
}

</script>