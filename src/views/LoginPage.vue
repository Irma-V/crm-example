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

                <!-- не работает: -->
                <!-- <small class="helper-text invalid" v-if="(v$.email.$dirty && !(v$.email.required))">Поле не должно быть пустым!</small> -->
                <!-- <small class="helper-text invalid" v-else-if="(v$.email.$dirty && !(v$.email.email))"> Некорректный e'mail адрес!</small> -->

            </div>
            <div class="input-field">
                <input id="password" type="password" v-model.trim="password"
                    :class="{ invalid: v$.password.$dirty && v$.password.$invalid }" />
                <!-- :class="{ invalid: v$.password.$invalid }" -->
                <label for="password">Пароль</label>

                <small class="helper-text invalid" v-for="error of v$.password.$errors" :key="error.$uid">
                    Password-Error: {{ error.$message }}
                </small>

            </div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Войти
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <small v-if="authErrorMsg" class="helper-text invalid"> {{ authErrorMsg }}</small>

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
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import store from '@/store'

export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            email: '',
            password: '',
            authErrorMsg: '',
            validErrorMsg: '',

        }
    },

    setup() {
        return { v$: useVuelidate() }
    },

    validations() {
        return {
            email: { required, email },
            password: { required, minLength: minLength(6) }
        }
    },

    mounted() {
        // console.log(this.v$);
        // console.log(this.v$.email.required);
        // console.log(this.v$.password.minLength);
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
                password: this.password
            }

            try {
                await store.dispatch('logIn', formData)
                this.$router.push('/?message=loggedin_success')
            } catch (error) {
                // this.authErrorMsg = error.message /* для отображения ошибки в форме */
                store.commit('setError', error.message)
                throw error.message
            }

            // console.log(formData);
            // this.$router.push('/?message=loggedin_success')
        },

        runErrorCatcher() {
            console.log(this.v$.$errors)
            const errors = this.v$.$errors

            for (let error in errors) {
                console.log(errors[error].$message);

                if (errors[error].$message === "Value is required") {
                    // this.validErrorMsg = "Поле не должно быть пустым"
                    // console.log(errors[error].$message);
                }

                if (errors[error].$message === "This field should be at least 6 characters long") {
                    // this.validErrorMsg === "Пароль должен содержать не менее 6 символов"
                    // console.log(errors[error].$message);
                }
            }
        }
    },
}
</script>
