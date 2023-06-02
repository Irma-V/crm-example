<template>
    <div>
        <div class="page-title">
            <h3>Категории</h3>
        </div>
        <section>
            <!-- <Loader v-if="loading"/> -->
            <div class="row">
                <CategoryCreate @created="addNewCategory"/>
                <CategoryEdit/>
            </div>
        </section>
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
        this.categories = await store.dispatch('fetchCategories')
        // console.log(this.categories);

    },
    methods: {
        addNewCategory(newCategory) {
            this.categories.push(newCategory)
            console.log(this.categories);
        },
    },
}
</script>