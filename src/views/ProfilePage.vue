<template>
    <div>
        <div class="page-title">
            <h3>Профиль</h3>
        </div>
        <Loader v-if="loading || !info" />

        <form class="form" @submit.prevent="submitHandler" v-else>
            <div class="input-field">
                <input id="description" type="text" v-model="name" :class="{ invalid: v$.name.$dirty && v$.name.$invalid }">
                <label for=" description">Имя</label>
                <small class="helper-text" :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
                    v-for="error of v$.name.$errors" :key="error.$uid">
                    <!-- Email-Error: {{ error.$message }} -->
                    Введите Имя!
                </small>
            </div>

            <div class="switch">
                <label>
                    ENG
                    <input type="checkbox" v-model="isRuLocale">
                    <span class="lever"></span>
                    РУС
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Обновить
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import Loader from "@/components/app/Loader.vue"

import filters from "@/main"
import { mapGetters, mapActions } from "vuex"

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
    name: "ProfilePage",
    components: {
        Loader,
    },
    props: {},
    data() {
        return {
            loading: true,
            name: '',
            isRuLocale: true,
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            name: { required }
        }
    },
    mounted() {
        this.name = this.info.userName
        this.isRuLocale = this.info.locale === 'ru-RU'
        this.loading = false
        setTimeout(() => {
            M.updateTextFields()
        })
        console.log(this.$filters);
    },
    computed: {
        ...mapGetters(['info'])
        
    },
    methods: {
        ...mapActions(['updateInfo']),

        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            try {
                await this.updateInfo({
                    userName: this.name,
                    locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                })
            } catch (error) {

            }
        },

        // localizeFilter(key) {
        //     const locale = store.getters.info.locale || 'ru-RU'
            
        // }
    }
}
</script>

<style scoped>
.switch {
    margin-bottom: 5%;
}
</style>