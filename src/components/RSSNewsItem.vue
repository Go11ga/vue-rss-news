<template>
    <div 
        class="rss-newsitem"
        :class="{ 'rss-newsitem--list' : getViewMode === 'list' }"
    >
        <div class="rss-newsitem__inner">

            <div class="rss-newsitem__header">
                <a :href="model.link" class="rss-newsitem__title" target="_blank">
                    {{ model.title }}
                </a>
            </div>

            <div class="rss-newsitem__content">
                <img v-if="model.image" class="rss-newsitem__img" :src="model.image" >
                <img v-else class="rss-newsitem__img" src="https://dummyimage.com/300x168/DCDCDC/fff">

                <div 
                    class="rss-newsitem__text"
                    :class="{ 'rss-newsitem__text--height-auto' : showHeightAuto }"
                >
                    {{ model.description }}
                </div>

                <button 
                    class="rss-newsitem__btn"
                    @click="toggleHeight"
                >
                    Подробнее
                </button>
            </div>

            <div class="rss-newsitem__footer">
                <a class="rss-newsitem__channel-link" :href="model.channelLink" target="_blank">
                    {{ model.channelLink | channelURL }}
                </a>
                <div class="rss-newsitem__date">
                    {{ model.pubDate | publicDate }}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'RSSNewsItem',

    props: {
        model: {
            type: Object,
            required: true
        }
    },

    data: () => ({
        showHeightAuto: false
    }),

    computed: {
        ...mapGetters([
            'getViewMode'
        ])
    },

    methods: {
        toggleHeight() {
            this.showHeightAuto = !this.showHeightAuto
        }
    },

    filters: {
        channelURL(url) {
            return url.replace(/https:\/\//, '')
        },

        publicDate(date) {
            let time = new Date(date)

            return `${time.toLocaleDateString()} ${time.toLocaleTimeString()}`
        }
    }
}
</script>
