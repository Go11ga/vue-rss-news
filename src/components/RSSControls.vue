<template>
    <div class="rss-controls">
        <div class="rss-controls__item">

            <router-link
                class="rss-controls__link" 
                to="/all/1"
                :class="{ 'rss-controls__link--active' : getActiveChannel === 'all' }"
            >
                All
            </router-link>

            <router-link
                class="rss-controls__link" 
                to="/mos/1"
                :class="{ 'rss-controls__link--active' : getActiveChannel === 'mos' }"
            >
                Mos
            </router-link>
            <router-link
                class="rss-controls__link" 
                to="/ria/1"
                :class="{ 'rss-controls__link--active' : getActiveChannel === 'ria' }"
            >
                RIA
            </router-link>

        </div>

        <div class="rss-controls__item">
            <button 
                class="rss-controls__btn"
                :class="{'rss-controls__btn--active' : view === 'list'}"
                @click="toggleView('list')"
            >
                <svg class="rss-controls__icon">
                    <use xlink:href="#icon_list"></use>
                </svg>
            </button>

            <button 
                class="rss-controls__btn"
                :class="{'rss-controls__btn--active' : view === 'grid'}"
                @click="toggleView('grid')"
            >
                <svg class="rss-controls__icon">
                    <use xlink:href="#icon_grid"></use>
                </svg>
            </button>
        </div>
        
    </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'RSSControls',

    data: () => ({
        view: 'grid'
    }),

    computed: {
        ...mapGetters([
            'getActiveChannel'
        ])
    },

    methods: {
        ...mapMutations([
            'setViewMode'
        ]),

        toggleView(val) {
            if (this.view === val) {
                return 
            }

            this.view = val

            localStorage.setItem('RSSView', val)

            this.setViewMode(val)
        }
    },

    created() {
        let viewMode = localStorage.getItem('RSSView') || 'grid'

        this.view = viewMode

        this.setViewMode(viewMode)
    }
}
</script>
