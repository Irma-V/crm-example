<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Сумма</th>
                <th>Дата</th>
                <th>Категория</th>
                <th>Тип</th>
                <th>Открыть</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, idx) in records" :key="record.id">
                <td>{{ idx+1 }}</td>
                <td>{{record.amount}} ₽</td>
                <td>{{ dateFilter(record.date) }}</td>
                <td>{{ record.categoryName }}</td>
                <td>
                    <span class="white-text badge" :class="[record.typeColor]">{{record.typeText}}</span>
                </td>
                <td>
                    <!-- <router-link :to="{ name: 'detail-record' }"> -->
                        <button class="btn-small btn" @click="$router.push(`/detail-record/${record.id}`)" v-tooltip="'Подробнее'">
                            <i class="material-icons">open_in_new</i>
                        </button>
                    <!-- </router-link> -->
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "HistoryTable",
    components: {},
    props: {
        records: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

        }
    },
    
    methods: {
        dateFilter(value) {
            const options = {
                /* При необходимости раскомментить нужную комбинацию формата даты*/

                // day: "numeric",
                day: "2-digit",

                // month: "long",
                // month: "numeric",
                month: "2-digit",

                year: "numeric",
                // year: "2-digit",


                hour: "numeric",
                minute: "numeric",
                second: "numeric",

                // hour: "2-digit",
                // minute: "2-digit",
                // second: "2-digit",
            }
            return new Intl.DateTimeFormat("ru-RU", options).format(new Date(value));
        },

    }
}
</script>