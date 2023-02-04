<template>
    <div class="rss-newswrapper">
        
        <template v-if="newsToShow.length">
            
            <RSSNewsItem  
                v-for="(item, i) in newsToShow"
                :key="i" 
                :model="item"
            />

            <RSSPagination :currentPage="currentPage" :totalCount="totalCount" />

        </template>

        <div class="rss-newswrapper__notfound" v-else>
            Ничего не найдено
        </div>

    </div>
</template>

<script>
import RSSNewsItem from '@/components/RSSNewsItem'
import RSSPagination from '@/components/ui/RSSPagination'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'RSSNewsWrapper',

    components: {
        RSSNewsItem,
        RSSPagination
    },

    data: () => ({
        newsPerPage: 4
    }),

    computed: {
        ...mapGetters([
            'getNewsToRender'
        ]),

        totalCount() {
            return Math.ceil(this.getNewsToRender.length / this.newsPerPage)
        },
        currentPage() {
            return +this.$route.params.pageNumber
        },
        newsToShow() {
            return [...this.getNewsToRender].splice((this.currentPage - 1) * this.newsPerPage, this.newsPerPage)
        }
    },

    methods: {
        ...mapMutations([
            'setActiveChannel'
        ])
    },

    watch: {
        getNewsToRender(news) {
            if (news.length === 0) {
                this.$toast.info('Поиск не дал результатов', {
                    timeout: 2000
                })
            }
        }
    },

    created() {
        this.setActiveChannel(this.$route.name)
    }
}
</script>