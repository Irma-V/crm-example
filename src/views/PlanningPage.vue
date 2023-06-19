<template>
    <div>
        <div class="page-title" v-if="info.bill">
            <h3>Планирование</h3>
            <h4>{{ info.bill.toFixed(2) }} ₽</h4>
        </div>
        <Loader v-else/>

        <Loader v-if="loading || !categories" />

        <p v-else-if="!categories.length" class="no-categories center flow-text teal-text">
            Категорий пока нет.
            <router-link to='/categories' class=" orange-text">
                Нажмите сюда для перехода в "Категории"!
            </router-link>
        </p>

        <section v-else>
            <div v-for="item in categories" :key="item.id">
                <p>
                    <strong> {{ item.title }} :</strong>
                    {{ item.spend }} ₽ из {{ item.limit }} ₽
                </p>
                <div class="progress" v-tooltip="'jfkjg'">
                    <div class="determinate" :class="[item.progressColor]" :style="{ width: item.progressPercent+'%'}"></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue';
import store from '@/store';
// import info from '@/store/info';
import { mapGetters } from 'vuex';


export default {
    name: "PlanningPage",
    components: {
        Loader,
    },
    props: {},
    data() {
        return {
            loading: true,
            categories: [],

        }
    },
    created() {

    },
    async mounted() {
        const records = await store.dispatch('fetchRecords')
        const categories = await store.dispatch('fetchCategories')
        // console.log(records, categories);

        this.categories = categories.map(categ => {
            let spend = records.filter(
                r => r.categoryId === categ.id
            ).filter(
                r => r.type === 'outcome'
            ).reduce((totalBill, record) => {
                return totalBill += +record.amount
            }, 0);
            // console.log(spend);
            let percent = 100 * spend / categ.limit
            let progressPercent = percent > 100 ? 100 : percent
            let progressColor = (percent < 60) ? 'green' : (percent < 95) ? 'yellow darken-3' : 'red'

            return {
                ...categ, 
                progressPercent,
                progressColor,
                spend 
            }

        })

        console.log(this.categories);
        this.loading = false
    },

    computed: {
        ...mapGetters(['info']),

    },
    methods: {

    },
}
</script>