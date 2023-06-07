<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option v-for="item in categories" :key="item.id" :value="item.id">
                            {{ item.title }}
                        </option>
                    </select>
                    <label>Выберите категорию</label>
                </div>

                <div class="input-field">
                    <input id="name" type="text" v-model="title" :class="{ invalid: v$.title.$dirty && v$.title.$invalid }">
                    <label for="name">Название</label>
                    <span v-if="v$.title.$dirty && v$.title.$invalid" class="helper-text invalid">Введите название</span>
                </div>

                <div class="input-field">
                    <input id="limit" type="number" v-model.number="limit"
                        :class="{ invalid: v$.limit.$dirty && v$.limit.$invalid }">
                    <label for="limit">Лимит</label>
                    <span v-if="v$.limit.$dirty && v$.limit.$invalid" class="helper-text invalid">
                        Значение не должно быть меньше минимальной величины, равной {{ v$.limit.minValue.$params.min }}
                    </span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    Обновить
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { update } from 'firebase/database'

export default {
    name: "CategoryEdit",
    components: {},
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            select: null,
            title: '',
            limit: 100,
            current: null,
        }
    },

    setup() {
        return { v$: useVuelidate() }
    },

    validations() {
        return {
            title: { required },
            limit: { minValue: minValue(100) }
        }
    },

    // created() {
    //     // const { id, title, limit } = this.categories[0]
    //     // this.current = id
    //     // this.title = title
    //     // this.limit = limit

    //     console.log(this.categories[0]);
    //     // this.current = this.categories[0].id
    //     // this.limit = this.categories[0].limit
    //     // this.title = this.categories[0].title

    // },
    mounted() {
        M.updateTextFields()
        this.select = M.FormSelect.init(this.$refs.select)
        console.log(this.categories);
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const formData = {
                id: this.id,
                title: this.title,
                limit: this.limit
            }
            try {
                await store.dispatch('updateCategory',formData)
            } catch (error) {}
         },
    },
    watch: {
        current(value) {
            // console.log(value);
            const { title, limit } = this.categories.find(item => item.id === value)
            this.title = title
            this.limit = limit

        }
    },

    beforeUnmount() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
}
</script>