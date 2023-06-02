<template>
    <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                            <th>Дата</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for=" item in currencies" :key="item">
                            <td>{{ item.currency }}</td>
                            <td>{{ rates[item.currency].toFixed(3) }}</td>
                            <td>{{ date }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
            <div class="card-content white-text">
                <div class="card-header">
                    <span class="card-title">Курс валют</span>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Валюта</th>
                            <th>Курс</th>
                            <th>Дата</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>руб</td>
                            <td>12.00</td>
                            <td>12.12.12</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div> -->
</template>

<script>
export default {
    name: "HomeCurrency",
    components: {},
    props: ['rates', 'date'],
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
}
</script>