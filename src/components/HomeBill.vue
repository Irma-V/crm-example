<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p v-for="item in currencies" :key="item" class="currency-line">
                    <span>
                        {{ Math.floor(base * rates[item.currency]) }} {{ item.symbol }} <br>
                        <!-- {{ this.jopa(item.currency) }} -->
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
    name: "HomeBill",
    components: {},
    props: ['rates'],
    data() {
        return {
            currencies: [
                {
                    currency: 'RUB',
                    symbol: '₽'
                },
                {
                    currency: 'USD',
                    symbol: '$'
                },
                {
                    currency: 'EUR',
                    symbol: '€'
                }
            ],
        }
    },
    computed: {
        base() {
            // console.log(store.getters.info.bill);
            return store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        },
    },
    methoods: {
        // jopa(arg) {
        //     return Math.floor(base * this.rates[arg])
        // }
    }
}
</script>