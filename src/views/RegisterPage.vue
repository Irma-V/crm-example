<template>
    <!-- <div class="grey darken-1 empty-layout"> -->
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
            <div class="input-field">
                <input id="email" type="text" v-model.trim="email"
                    :class="{ invalid: v$.email.$dirty && v$.email.$invalid }" />
                <!-- (v$.email.$dirty && !v$.email.required) || (v$.email.$dirty && !v$.email.email) :class="{ invalid: v$.email.$invalid }"-->

                <label for="email">Email</label>
                <small class="helper-text invalid" v-for="error of v$.email.$errors" :key="error.$uid">
                    Email-Error: {{ error.$message }}
                </small>
            </div>
            <div class="input-field">
                <input id="password" type="password" v-model.trim="password"
                    :class="{ invalid: v$.password.$dirty && v$.password.$invalid }" />
                <!-- :class="{ invalid: v$.password.$invalid }" -->

                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-for="error of v$.password.$errors" :key="error.$uid">Password-Error: {{
                    error.$message }}</small>
            </div>
            <div class="input-field">
                <input id="name" type="text" v-model.trim="name" :class="{ invalid: v$.name.$dirty && v$.name.$invalid }" />
                <label for="name">Имя</label>
                <small class="helper-text invalid" v-for="error of v$.name.$errors" :key="error.$uid">Name-Error: {{
                    error.$message }}</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree">
                    <span>С <router-link :to="{ name: 'userAgreementPage' }" target="_blank"
                            class="lighten-2 orange-text">правилами</router-link> согласен</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <small v-if="errorMessage" class="helper-text invalid"> {{ errorMessage }}</small>

            <p class="center">
                Уже есть аккаунт?
                <router-link :to="{ name: 'login' }">
                    Войти!
                </router-link>
            </p>
        </div>
    </form>
    <!-- </div> -->
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import store from '@/store'


export default {
    name: "RegisterPage",
    components: {},
    data() {
        return {
            email: '',
            password: '',
            name: '',
            agree: false,
            errorMessage: '',
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) },
            name: { required },
            agree: { checked: value => value }
        }
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                this.runErrorCatcher()
                return
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }

            try {
                await store.dispatch('register', formData)
                this.$router.push('/profile?message=registered')
            } catch (error) {
                // this.errorMessage = error.message /* для отображения ошибки в форме */
                store.commit('setError', error.message)
                throw error.message
            }

            // console.log(formData);
            // this.$router.push('/profile?message=registered')
        },

        runErrorCatcher() {
            console.log(this.v$.$errors)
            const errors = this.v$.$errors

            for (let error in errors) {
                // console.log(errors[error].$message);
                
                if (errors[error].$message === "Value is required") {
                    errors[error].$message = "Поле не должно быть пустым"
                    console.log(errors[error].$message);
                }
            }
        }
    },
}
</script>
