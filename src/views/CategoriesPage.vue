<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <Loader v-if="loading"/>
            <div v-else class="row">
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit :categories="categories" @updated="updateCategories" />
            </div>
        </section>

        <div class="jopa">
            {{ categories }}
        </div>

        <!-- <div v-for="item in getCategories" :key="item" class="jopa">
            {{ item }}
        </div> -->
    </div>
</template>

<script>
import store from '@/store'
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';

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
        }
    },
    mounted() {
        this.loading = true
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
            // const categories = this.getCategories
            const index = this.categories.findIndex(item => item.id === category.id)
            categories[index].title = category.title
            categories[index].limit = category.limit
        },
    },

}
</script>