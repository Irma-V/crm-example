<template>
    <div>
        <div class="page-title">
            <h3>Новая запись</h3>
        </div>

        <Loader v-if="loading || !categories" />

        <p v-else-if="!categories.length" class="no-categories center flow-text teal-text">
            <img src="~@/assets/img/notFoundMini.webp" alt="">
            Категорий пока нет.
            <router-link to='/categories' class=" orange-text">
                Нажмите сюда для перехода в "Категории"!
            </router-link>
        </p>

        <form v-else class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option v-for="item in categories" :key="item.id" :value="item.id">
                        {{ item.title }}
                    </option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <!-- <div v-for="item in categories" :key="item" class="jopa">
                {{ item }}
            </div> -->

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="income" v-model="type">
                    <span>Доход</span>
                </label>
            </p>

            <p>
                <label>
                    <input class="with-gap" name="type" type="radio" value="outcome" v-model="type">
                    <span>Расход</span>
                </label>
            </p>

            <div class="input-field">
                <input id="amount" type="number" v-model.number="amount"
                    :class="{ invalid: v$.amount.$dirty && v$.amount.$invalid }">
                <label for="amount">Сумма</label>
                <span v-if="v$.amount.$dirty && v$.amount.$invalid" class="helper-text invalid">
                    Значение не должно быть меньше минимальной величины, равной {{ v$.amount.minValue.$params.min }}
                </span>
            </div>

            <div class="input-field">
                <input id="description" type="text" v-model="description"
                    :class="{ invalid: v$.description.$dirty && v$.description.$invalid }">
                <label for="description">Описание</label>
                <span v-if="v$.description.$dirty && v$.description.$invalid" class="helper-text invalid">
                    Введите описание
                </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue';

import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

import store from '@/store';
import { mapGetters } from 'vuex';

export default {
    name: "RecordPage",
    components: { Loader },
    props: {},
    data() {
        return {
            select: null,
            loading: true,
            categories: [],
            category: null,
            type: 'outcome',
            amount: 1,
            description: '',
        }
    },
    setup() {
        return { v$: useVuelidate() }
    },

    validations() {
        return {
            amount: { minValue: minValue(1) },
            description: { required },
        }
    },

    async mounted() {

        await store.dispatch('fetchCategories')
            .then(() => {
                this.categories = store.getters.categories
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                this.loading = false
            })

        if (this.categories.length) {
            this.category = this.categories[0].id
        }

        setTimeout(() => {
            this.select = M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        }, 0)
    },
    computed: {
        ...mapGetters(['info']),
        canCreateRecord() {
            if (this.type === 'income') {
                return true
            }
            return this.info.bill >= this.amount
        },
    },
    methods: {
        async submitHandler() {
            console.log('submitHandler');
            if (this.v$.$invalid) {
                this.v$.$touch()
                return
            }
            const recordData = {
                categoryId: this.category,
                amount: this.amount,
                description: this.description,
                type: this.type,
                date: new Date().toJSON()
            }

            if (this.canCreateRecord) {
                try {
                    await store.dispatch('createRecord', recordData)
                    const bill = this.type === 'income' ? this.info.bill + this.amount : this.info.bill - this.amount
                    await store.dispatch('updateInfo', { bill })
                    this.$message('Запись успешно создана')
                    this.v$.$reset()
                    this.amount = 1
                    this.description = ''
                } catch (error) {
                    console.log(error);
                }

            } else {
                this.$error(`Недостаточно средств на счете! Заявленная сумма превышает ${this.amount - this.info.bill} руб.`)
            }
        },
    },

    beforeUnmount() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    },
}
</script>