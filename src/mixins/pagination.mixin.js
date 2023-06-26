import _ from "lodash";
export default {
    data() {
        return {
            page: Number(this.$route.query.page) || 1,
            pageSize: 3,
            pageCount:0,
            allItems: [],
            items: [],
        }
    },
    methods: {
        setupPagination(allItems) {
            this.allItems = _.chunk(allItems, this.pageSize)
            this.pageCount =  _.size(this.allItems)
            this.items = this.allItems[this.page - 1] || this.allItems
        },
        pageChangeHandler(page) {
            // console.log('pageChangeHandler');
            this.items = this.allItems[page - 1] || this.allItems
            this.$router.push(`${this.$route.path}?page=${page}`)
        }
    }
}