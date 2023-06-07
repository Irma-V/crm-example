<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <!-- <Loader v-if="loading"/> -->
            <div class="row">
                <CategoryCreate @created="addNewCategory" />
                <CategoryEdit :categories="getCategories" />
            </div>
        </section>

        <!-- <div class="jopa">
            {{ getCategories }}
        </div> -->

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
    async mounted() {
        // this.getCategories
        this.categories = await store.dispatch('fetchCategories')
    },
    computed: {
        getCategories() {
            // this.categories = store.getters.categories
            // return this.categories
            return store.getters.categories
        },
    },
    methods: {
        // async getCategories() {
        //     return await store.dispatch('fetchCategories')
        // },

        addNewCategory(newCategory) {
            this.categories.push(newCategory)
            // console.log(this.categories);
        },


    },

}
</script>