<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <Loader v-if="loading || !currency" />

        <div v-else class="row">
            <HomeBill :rates="currency.rates" />
            <HomeCurrency :rates="currency.rates" :date="dateFilter" />
        </div>
    </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import Loader from '@/components/app/Loader.vue';
import store from '@/store';

export default {
    name: 'HomePage',
    components: {
        HomeBill,
        HomeCurrency,
        Loader
    },
    data() {
        return {
            date: new Date,
            loading: true,
            currency: null,
        }
    },
    mounted() {
        // this.date = this.date.getDate() + '.0' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear()
        this.getData()
    },
    computed: {
        dateFilter() {
            const options = {
                /* При необходимости раскомментить нужную комбинацию формата даты*/

                // day: "numeric",
                day: "2-digit",

                // month: "long",
                // month: "numeric",
                month: "2-digit",

                year: "numeric",
                // year: "2-digit",


                // hour: "numeric",
                // minute: "numeric",
                // second: "numeric",

                // hour: "2-digit",
                // minute: "2-digit",
                // second: "2-digit",
            }
            return new Intl.DateTimeFormat("ru-RU", options).format(new Date(this.date));
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.currency = {
                    base: "EUR",
                    date: this.date,
                    rates: {
                        USD: 1.095471,
                        EUR: 1,
                        RUB: 88.774224
                    },
                    success: true,
                    timestamp: 1685700602
                }
            }, 1000)

            // this.currency = await store.dispatch('fetchCurrency')
            // console.log(this.currency);
            this.loading = false
        },
        refresh() {
            this.loading = true
            console.log('refresh');
            // this.getData()   

            setTimeout(() => {
                this.getData()
            }, 1000);
        },
    }
}
</script>
