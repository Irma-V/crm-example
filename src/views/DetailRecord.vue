<template>
    <div>
        <loader v-if="loading" />

        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link :to="{ name: 'history' }" @click.prevent class="breadcrumb">
                    <!-- <a href="/history" class="breadcrumb"> -->
                    <!-- </a> -->
                    История
                </router-link>

                <a class="breadcrumb">
                    {{ record.typeText }}
                    <!-- {{ record.type === 'income' ? 'Доход' : 'Расход' }} -->
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div class="card" :class="[record.typeColor]">
                        <!-- <div class="card"  :class="{ 'red': record.type === 'outcome', 'green': record.type === 'income' }"> -->

                        <div class="card-content white-text">
                            <p>Описание: {{ record.description }}</p>
                            <p>Сумма: {{ record.amount }} ₽</p>
                            <p>Категория: {{ record.categoryName }}</p>

                            <small>{{ record.date }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="no-records center flow-text teal-text" v-else>
            <img src="~@/assets/img/notFoundMini.webp" alt="">
            Записи по идентификатору {{ $route.params.id }} не существует.

        </p>


    </div>
</template>

<script>
import store from '@/store';
import Loader from '@/components/app/Loader.vue';

export default {
    name: "DetailRecord",
    components: {
        Loader,
    },
    props: {},
    data() {
        return {
            loading: true,
            record: null
        }
    },

    async mounted() {
        const id = this.$route.params.id
        const record = await store.dispatch('fetchRecordById', id)
        const category = await store.dispatch('fetchCategoryById', record.categoryId)
        // console.log(id);
        // console.log(record);
        // console.log(category);

        this.record = {
            ...record,
            categoryName: category.title, //имя категории
            typeColor: record.type === 'income' ? 'green' : 'red',
            typeText: record.type === 'income' ? 'Доход' : 'Расход',

        }

        this.loading = false
        console.log(this.record);
    },

    computed: {

    }
}
</script>