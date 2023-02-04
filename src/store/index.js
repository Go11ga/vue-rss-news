import Vue from 'vue'
import Vuex from 'vuex'
import { news } from '@/store/modules/news'
import { errors } from '@/store/modules/errors'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        news,
        errors
    }
})
