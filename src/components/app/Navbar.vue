<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('clickOnBurger')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{ dateFilter }}</span>
                <!-- <span class="black-text">{{ date }}</span> -->
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
                        <!-- USER NAME  -->
                        <!-- {{ userName }} -->
                        {{ getName }}

                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id="dropdown" class="dropdown-content">
                        <li>
                            <router-link :to="{ name: 'profile' }" class="black-text">
                                <i class="material-icons">account_circle</i>Профиль
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a @click.prevent="logout" class="black-text">
                                <i class="material-icons">assignment_return</i>Выйти
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
// import dateFilter from '@/filters/date.filter'
import { auth } from '@/main'
import store from '@/store'


export default {
    name: "VNavbar",
    components: {},
    props: {},
    data() {
        return {
            date: new Date,
            interval: null,
            dropdown: null,
            userName: '',
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.date = new Date()
        }, 1000)

        // this.date = this.date.getDate() + '.0' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear()

        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: true
        })

        auth.onAuthStateChanged(async (user) => {
            await store.dispatch("fetchUser", user);
            // console.log(user); /* содержимое экземпляра user, полученного при успешной авторизации*/
            this.userName = user.displayName
        });

    },

    computed: {
        getName() {
            return store.getters.info.userName
        },

        dateFilter() {
            // console.log(this.date);
            // return this.date
            const options = {
                /* При необходимости раскомментить нужную комбинацию формата даты*/

                // day: "numeric",
                day: "2-digit",

                // month: "long",
                // month: "numeric",
                month: "2-digit",

                year: "numeric",
                // year: "2-digit",


                hour: "numeric",
                minute: "numeric",
                second: "numeric",

                // hour: "2-digit",
                // minute: "2-digit",
                // second: "2-digit",
            }
            return new Intl.DateTimeFormat("ru-RU", options).format(new Date(this.date));
        }
    },

    methods: {
        async logout() {
            await store.dispatch('logOut')
            this.$router.push('/login?message=logout')

            // console.log('logout');
            // this.$router.push('/login?message=logout')
        },
    },

    beforeUnmount() {
        // console.log('before unmount');
        clearInterval(this.interval)

        if (this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
        }
    },
}
</script>