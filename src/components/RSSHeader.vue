<template>
    <div class="rss-header">

        <div class="rss-header__item">
            <h1 class="rss-header__text">
                Список новостей
            </h1>

            <button class="rss-header__refresh" @click="fetchNews">
                <img class="rss-header__img" src="@/assets/style/images/refresh.png" alt="refresh">
            </button>
        </div>

        <div class="rss-header__item">
            <div class="rss-header__input-container">
                <input 
                    class="rss-header__input" 
                    v-model.trim="searchValue" 
                    @keyup.enter="searchNews"
                >
                <button class="rss-header__btn" @click="searchNews">
                    <img src="@/assets/style/images/search.png" alt="search">
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
    name: 'RSSHeader',

    data: () => ({
        searchValue: ''
    }),

    methods: {
        ...mapMutations([
            'setSearchValue'
        ]),

        ...mapActions([
            'fetchNews'
        ]),

        searchNews() {
            this.setSearchValue(this.searchValue)
        }
    }
}
</script>
