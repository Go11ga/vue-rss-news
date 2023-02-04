<template>
    <router-link 
        class="rss-pagination__link"
        :class="{ 
            'rss-pagination__link--big' : size === 'big',
            'rss-pagination__link--active' : active 
        }"
        :to="path"
    >
        {{ label }}
    </router-link>
</template>

<script>
export default {
    name: 'RSSPaginationItem',

    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        size: {
            type: String
        }
    },

    computed: {
        path() {
            const { name } = this.$route

            return `/${name}/${this.value}`
        }
    }
}
</script>
