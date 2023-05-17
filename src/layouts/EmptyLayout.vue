<template>
    <div class="grey darken-1 empty-layout">
        <router-view />
    </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
    name: "EmptyLayout",
    components: {},
    props: {},
    data () {
        return {
            
        }
    },
    mounted() {
        if (messages[this.$route.query.message]) {
            this.$message(messages[this.$route.query.message])
        }

    },
}
</script>