<template>
    <div v-if="totalCount !== 0" class="rss-pagination">

        <RSSPaginationItem label="«" :value="1" size="big" />

        <RSSPaginationItem label="‹" :value="currentPage > 1 ? currentPage - 1 : 1" size="big" />

        <RSSPaginationItem
            v-for="(page, index) in pages"
            :key="index"
            :label="page.label"
            :value="page.value"
            :active="page.value == currentPage"
        />

        <RSSPaginationItem label="›" :value="currentPage < totalCount ? currentPage + 1 : totalCount" size="big" />

        <RSSPaginationItem label="»" :value="totalCount" size="big" />

    </div>
</template>

<script>
import RSSPaginationItem from '@/components/ui/RSSPaginationItem'
import getPaginationOptions from '@/utils/pagiantionOptions'

export default {
    name: 'RSSPagination',

    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalCount: {
            type: Number,
            required: true
        }
    },

    components: {
        RSSPaginationItem
    },

    data: () => ({
        paginationLength: 8
    }),

    computed: {
        pages() {
            return getPaginationOptions({
                listLength: this.paginationLength,
                currentPage: this.currentPage,
                totalPages: this.totalCount
            })
        }
    }
}
</script>