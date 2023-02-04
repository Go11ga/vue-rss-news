<template>
    <div id="app">
        
        <div class="preloader" v-if="getLoadingNewsProcess">

            <img src="@/assets/style/images/preloader.gif">
            
        </div>

        <div class="container" v-else>

            <RSSSprite />

            <RSSHeader />

            <RSSControls />

            <router-view></router-view>

        </div>

    </div>
</template>

<script>
import RSSSprite from '@/components/RSSSprite'
import RSSHeader from '@/components/RSSHeader'
import RSSControls from '@/components/RSSControls'
import { mapGetters, mapActions } from 'vuex'
import { POSITION } from "vue-toastification"

export default {
    name: 'RSSApp',
    
    components: {
        RSSSprite,
        RSSHeader,
        RSSControls
    },

    computed: {
        ...mapGetters([
            'getLoadingNewsProcess',
            'getError'
        ])
    },

    methods: {
        ...mapActions([
            'fetchNews'
        ])
    },

    watch: {
        getError(error) {
            this.$toast.error(error.msg, {
                timeout: 2000,
                position: POSITION.BOTTOM_CENTER
            })
        }
    },

    created() {
        this.fetchNews()
    }
}
</script>

<style lang="scss">
@import '@/assets/style/scss/layout.scss';
</style>
