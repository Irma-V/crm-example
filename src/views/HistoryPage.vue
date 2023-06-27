<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="loading || !records" />

        <p v-else-if="!records.length" class="no-records center flow-text teal-text">
            <img src="~@/assets/img/notFoundMini.webp" alt="">
            Записей пока нет.
            <router-link to='/record' class="orange-text">
                Нажмите сюда для создания первой записи!
            </router-link>
        </p>

        <section v-else>
            <paginate 
            v-model="page" 
            :page-count="pageCount" 
            :page-range="3" 
            :margin-pages="2" 
            :initial-page="1"                
            :click-handler="pageChangeHandler" 
            :prev-text="'«'" 
            :next-text="'»'" 
            :container-class="'pagination'"                
            :page-class="'waves-effect'" 
            :page-link-class="'black-text'" 
            :active-class="'blue'" 
            :prev-class="''"                
            :next-class="''">
            </paginate>
            <HistoryTable :records="items" />
        </section>
    </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
import store from "@/store";

import Paginate from 'vuejs-paginate-next';
import paginationMixin from "@/mixins/pagination.mixin";

export default {
    name: 'HistoryPage',
    components: {
        HistoryTable,
        Loader,
        paginate: Paginate,
    },
    mixins: [paginationMixin],
    data() {
        return {
            loading: true,
            records: [],
        }
    },
    async mounted() {
        // this.records = await store.dispatch('fetchRecords')
        const records = await store.dispatch('fetchRecords')
        const categories = await store.dispatch('fetchCategories')

        // this.records = records.reverse()
        /* reverse() - слишком простой способ для сортировки записей по убыванию. Следует привязать к датам*/
        this.records = records.sort((a, b) => {
            if (a.date > b.date) {
                return -1
            }
        });

        this.setupPagination(
            this.records.map(record => {
                return {
                    ...record,
                    categoryName: categories.find(categ => categ.id === record.categoryId).title, //имя категории
                    typeColor: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ? 'Доход' : 'Расход',

                }
            })
        )

        this.loading = false
        // console.log("this.records: ", this.records);
        // console.log("records: ", records);
        // console.log("this.categories: ", this.categories);        
    },

    methods: {},
}
</script>
