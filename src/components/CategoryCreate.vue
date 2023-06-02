<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Создать</h4>
            </div>

            <form @submit.prevent="submitHandler">
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
                    Создать
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

export default {
    name: "CategoryCreate",
    components: {},
    props: {},
    data() {
        return {
            title: '',
            limit: 100,
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
    mounted() {
        M.updateTextFields()
    },
    methods: {
        async submitHandler() {
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const formData = {
                title: this.title,
                limit: this.limit
            }
            try {
                const category = await store.dispatch('createCategory', formData)
                // console.log(category);
                this.title='',
                this.limit = 100
                this.v$.$reset()
                this.$message(`Категория ${category.title} создана`)
                this.$emit('created', category)
            } catch (error) {}
        },
    }
}
</script>