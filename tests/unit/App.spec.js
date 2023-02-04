import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue данные загрузились', () => {
    let wrapper
    let getters
    let actions
    let store

    beforeEach(() => {
        getters = {
            getLoadingNewsProcess: () => false,
            getError: () => {}
        }

        actions = {
            fetchNews: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            actions
        })

        wrapper = shallowMount(App, {
            localVue,
            store,
            stubs: ['router-view']
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('проверка имени компонента', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSApp')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('рендеринг при getter getLoadingNewsProcess false', async () => {
        expect(wrapper.html().includes('preloader')).toBe(false)
        expect(wrapper.html().includes('container')).toBe(true)
    })
    
    it('хук created', () => {
        expect(typeof App.created).toBe('function')

        expect(actions.fetchNews).toHaveBeenCalled()
        expect(actions.fetchNews).toHaveBeenCalledTimes(1)
    })
})

describe('App.vue данные не загрузились', () => {
    let wrapper
    let getters
    let actions
    let store

    beforeEach(() => {
        getters = {
            getLoadingNewsProcess: () => true,
            getError: () => {}
        }

        actions = {
            fetchNews: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            actions
        })

        wrapper = shallowMount(App, {
            localVue,
            store,
            stubs: ['router-view']
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('рендеринг getter getLoadingNewsProcess true', async () => {
        expect(wrapper.html().includes('preloader')).toBe(true)
        expect(wrapper.html().includes('container')).toBe(false)
    })
})
