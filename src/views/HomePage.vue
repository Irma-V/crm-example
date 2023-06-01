<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <Loader v-if="loading" />

        <div v-else class="row">
            <HomeBill :rates="currency.rates" />
            <HomeCurrency :rates="currency.rates" :date="currency.date" />
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
            loading: true,
            currency: null,
        }
    },
    mounted() {
        // this.currency = await store.dispatch('fetchCurrency')
        // console.log(this.currency);
        // this.loading = false
        this.getData()
    },
    methods: {
        async getData() {
            this.currency = await store.dispatch('fetchCurrency')
            console.log(this.currency);
            this.loading = false
        },
        refresh() {
            this.loading = true
            this.getData()
        },
    }
}
</script>
