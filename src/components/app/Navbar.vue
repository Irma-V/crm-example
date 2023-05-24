<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('clickOnBurger')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <!-- <span class="black-text">{{ date | date }}</span> -->
                <span class="black-text">{{ date }}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a ref="dropdown" class="dropdown-trigger black-text" href="#" data-target="dropdown">
                        USER NAME {{  }}
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
        }
    },
    mounted() {
        // this.interval = setInterval(() => {
        //     this.date = new Date()
        // }, 1000)

        // console.log(this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear())
        this.date = this.date.getDate() + '.0' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear()

        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: true
        })

        auth.onAuthStateChanged(user => {
            this.$store.dispatch("fetchUser", user);
        });
    },
    
    computed() {
        const user = this.$store.getters.user
    },

    methods: {
        async logout() {
            await store.dispatch('logOut')
            // this.$router.push('/login?message=logout')

            // console.log('logout');
            this.$router.push('/login?message=logout')
        },
    },

    beforeUnmount() {
        // console.log('before unmount');
        clearInterval(this.interval)

        if (this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy
        }
    },
}
</script>