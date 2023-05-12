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

                <small class="helper-text invalid"> {{ errorMessage }}</small>

                <!-- не работает: -->
                <!-- <small class="helper-text invalid" v-if="(v$.email.$dirty && !(v$.email.required))">Поле не должно быть пустым!</small> -->
                <!-- <small class="helper-text invalid" v-else-if="(v$.email.$dirty && !(v$.email.email))"> Некорректный e'mail адрес!</small> -->

            </div>
            <div class="input-field">
                <input id="password" type="password" v-model.trim="password"
                    :class="{ invalid: v$.password.$dirty && v$.password.$invalid }" />
                <!-- :class="{ invalid: v$.password.$invalid }" -->
                <label for="password">Пароль</label>
                <small class="helper-text invalid" v-for="error of v$.password.$errors" :key="error.$uid">Password-Error: {{
                    error.$message }}</small>
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
import messages from '@/utils/messages'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'


export default {
    name: "LoginPage",
    components: {},
    data() {
        return {
            email: '',
            password: '',
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

        // this.$message('Test')
        // this.$error('Test')
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }

    },
    computed: {
        errorMessage() {
            // const msg = ''
            // console.log(this.v$.email.required);
            // console.log(this.v$.email.email);
            // console.log(this.v$.email.$dirty);
            //     
            //     if (this.v$.email.$dirty) {
            //        msg = 'jopa'
            //     }

            //     // console.log(msg);
            //     return msg
        }
    },
    methods: {
        submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const formData = {
                email: this.email,
                password: this.password
            }
            console.log(formData);
            this.$router.push('/')
        },
    },
}
</script>
