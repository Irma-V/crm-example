<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="loading || !records" />

        <p v-else-if="!records.length" class="no-categories center flow-text teal-text">
            Записей пока нет.
            <router-link to='/record' class=" orange-text">
                Нажмите сюда для создания первой записи!
            </router-link>
        </p>

        <section v-else>
            <HistoryTable :records="records" />
        </section>
    </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
import store from "@/store";

export default {
    name: 'HistoryPage',
    components: {
    HistoryTable,
    Loader
},
    data() {
        return {
            loading: true,
            records: [],
            categories: [],
        }
    },
    async mounted() {
        // this.records = await store.dispatch('fetchRecords')
        const records = await store.dispatch('fetchRecords')
        this.categories = await store.dispatch('fetchCategories')
        this.records = records.map(record => {
            return {
                ...record,
                categoryName: this.categories.find(categ => categ.id === record.categoryId).title, //имя категории
                typeColor: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? 'Доход' : 'Расход',

            }
        })
        this.loading = false
        console.log("this.records: ", this.records);
        console.log("records: ", records );
        console.log("this.categories: ", this.categories);
    },
    methods: {

    },
}
</script>
