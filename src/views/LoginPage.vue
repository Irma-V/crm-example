<template>
    <!-- <div class="grey darken-1 empty-layout"> -->
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input id="email" type="text" v-model.trim="email"
                    :class="{ invalid: (email.$dirty && !email.required) || (email.$dirty && !email.email) }" />
                <label for="email">Email</label>
                <small class="helper-text invalid">Email</small>
            </div>
            <div class="input-field">
                <input id="password" type="password" />
                <label for="password">Пароль</label>
                <small class="helper-text invalid">Password</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Нет аккаунта?
                <router-link :to="{ name: 'register' }">
                    Зарегистрироваться
                </router-link>
            </p>
        </div>
    </form>
    <!-- </div> -->
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            email: '',
            password: '',
        }
    },
    setup: () => ({ v$: useVuelidate() }),
    validations() {
        return {
            form: {
                email: { required, email },
                password: { required, minLength: minLength(6) }
            }
        }
    },
    mounted() {
        console.log(this.$validator);
        // console.log(this.v$);

    },
    methods: {
        submitHandler() {
            this.$router.push('/')

            if (this.$v) {

            }
        },
    }
}
</script>
