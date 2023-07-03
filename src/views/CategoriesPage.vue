<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading || !categories" />
            <div v-else class="row">
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit v-if="categories.length" :key="categories.length + updateCount" :categories="categories"
                    @updated="updateCategories" />

                <div v-else class="col s12 m6">
                    <p class="no-categories center flow-text teal-text">Категорий пока нет</p>
                </div>

            </div>
        </section>

        <!-- <div v-for="item in categories" :key="item" class="foo">
            {{ item }}
        </div> -->

        <!-- <div v-for="item in getCategories" :key="item" class="foo">
            {{ item }}
        </div> -->
    </div>
</template>

<script>
import store from '@/store'
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'


export default {
    name: "CategoriesPage",
    components: {
        CategoryCreate,
        CategoryEdit,
        Loader
    },
    props: {},
    data() {
        return {
            categories: [],
            loading: true,
            updateCount: 0,
        }
    },

    setup() {
        return { v$: useVuelidate() }
    },
    validations() {
        return {
            title: { required },
            limit: { minValue: minValue(100) }
        }
    },

    mounted() {
        store.dispatch('fetchCategories')
            .then(() => {
                this.categories = store.getters.categories
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                this.loading = false
            })
    },
    computed: {
        getCategories() {
            return store.getters.categories
        },
    },
    methods: {
        addNewCategory(newCategory) {
            this.categories.push(newCategory)
        },

        updateCategories(category) {
            console.log(category);
            // this.loading = true
            // const categories = this.getCategories
            console.log(this.categories.findIndex(item => item.id === category.id));
            const index = this.categories.findIndex(item => item.id === category.id)
            this.categories[index].title = category.title
            this.categories[index].limit = category.limit
            this.updateCount++
        },
    },

}
</script>

<style scoped lang="scss">
.col {
    .no-categories {
        padding: 20%;
    }
}
</style>