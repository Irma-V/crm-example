<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">Счет в валюте</span>

                <p v-for="item in currencies" :key="item" class="currency-line">
                    <span>
                        <!-- 12.0 Р -->
                        {{ getCurrency }}
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
            currencies: ['USD', 'EUR', 'RUB'],
        }
    },
    computed: {
        base() {
            console.log(store.getters.info.bill);
            return store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
        },
    },
    methoods: {
        getCurrency(currency) {
            // console.log(this.base);
            // console.log(this.rates);
            return Math.floor(this.base * this.rates[currency])
        }
    }
}
</script>