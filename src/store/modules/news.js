import axios from 'axios'
import convert from '@/utils/convertNews'

let news = {
    state: {
        mosNews: [],
        riaNews: [],
        loadingNewsProcess: false,
        searchValue: '',
        activeChannel: 'all',
        viewMode: ''
    },

    getters: {
        getNews(state) {
            let news

            if(state.activeChannel === 'mos') {
                news = state.mosNews
            }

            if(state.activeChannel === 'ria') {
                news = state.riaNews
            }

            if(state.activeChannel === 'all') {
                news = [...state.mosNews, ...state.riaNews]
            }

            return news.sort((a, b) => {
                return ('' + b.pubDate).localeCompare(a.pubDate)
            })
        },

        getNewsToRender(state, getters) {
            let str = state.searchValue.replace(/[&\\#,+()$~%.'":*?<>{}]/g, '')

            const regexp = new RegExp(str, "gi");

            return getters.getNews.filter(el => {
                if (el.title.match(regexp) !== null) {
                    return el
                }
            })
        },

        getViewMode: state => state.viewMode,

        getLoadingNewsProcess: state => state.loadingNewsProcess,

        getActiveChannel: state => state.activeChannel
    },

    mutations: {
        setMosNews(state, payload) {
            state.mosNews = convert(payload)
        },

        setRiaNews(state, payload) {
            state.riaNews = convert(payload)
        },

        setActiveChannel(state, channel) {
            state.activeChannel = channel
        },

        setViewMode(state, mode) {
            state.viewMode = mode
        },

        setSearchValue(state, value) {
            state.searchValue = value
        }
    },

    actions: {
        async fetchNews({ state, commit }) {
            try {
                state.loadingNewsProcess = true

                const mosPromise = axios.get('/v1')
                const riaPromise = axios.get('/v2')

                const [ mos, ria ] = await Promise.all([ mosPromise, riaPromise ])

                commit('setMosNews', mos)
                commit('setRiaNews', ria)
                
            } catch (e) {
                commit('setError', { type: 'error', msg: e.message})
            } finally {
                state.loadingNewsProcess = false
            }
        }
    }
}

export { news }
