<template>
    <ul class="sidenav app-sidenav" :class="class">
        <router-link v-for="link in links" :key="link.url" :to="link.url" active-class="active" exact="link.exact">
            <li>
                <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
            </li>
        </router-link>

        <!-- <router-link :to="{ name: 'home' }">
            <li>
                <a class="waves-effect waves-orange pointer">Счет</a>
            </li>
        </router-link>

        <router-link :to="{ name: 'history' }">
            <li>
                <a class="waves-effect waves-orange pointer">История</a>
            </li>
        </router-link>

        <router-link :to="{ name: 'planning' }">
            <li>
                <a class="waves-effect waves-orange pointer">Планирование</a>
            </li>
        </router-link>

        <router-link :to="{ name: 'record' }">
            <li>
                <a class="waves-effect waves-orange pointer">Новая запись</a>
            </li>
        </router-link>

        <router-link :to="{ name: 'categories' }">
            <li>
                <a class="waves-effect waves-orange pointer">Категории</a>
            </li>
        </router-link> -->

    </ul>
</template>

<script>
import { createHydrationRenderer } from 'vue';

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
                    exact: true
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