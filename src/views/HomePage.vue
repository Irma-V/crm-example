<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small">
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <div class="row">
            <HomeBill></HomeBill>
            <HomeCurrency></HomeCurrency>
        </div>
    </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

// @ is an alias to /src

export default {
    name: 'HomePage',
    components: {
    HomeBill,
    HomeCurrency
}
}
</script>
