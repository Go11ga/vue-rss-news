import { shallowMount, createLocalVue } from '@vue/test-utils'
import RSSNewsWrapper from '@/components/RSSNewsWrapper'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

describe('RSSNewsWrapper.vue', () => {
    let wrapper
    let getters
    let mutations
    let store
    let router

    beforeEach(() => {
        getters = {
            getNewsToRender: () => [{}, {}]
        }

        mutations = {
            setActiveChannel: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            mutations
        })

        const routes = [
            {
                path: '/mos/1',
                name: 'mos'
            }
        ]

        router = new VueRouter({
            routes
        })

        wrapper = shallowMount(RSSNewsWrapper, {
            localVue,
            store,
            router
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('правильно рендерится', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSNewsWrapper')

        expect(wrapper.html().includes('rss-newswrapper__notfound')).toBe(false)
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('геттер totalCount', () => {
        expect(getters.getNewsToRender().length).toBe(2)
    })

    it('геттер currentPage', () => {
        let localThis = {
            $route: {
                params : {
                    pageNumber: 1
                }
            }
        }

        expect(RSSNewsWrapper.computed.currentPage.call(localThis)).toBe(1)
    })

    it('геттер newsToShow', () => {
        let localThis = {
            getNewsToRender: [
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 }
            ],
            currentPage: 1,
            newsPerPage: 4
        }

        expect(RSSNewsWrapper.computed.newsToShow.call(localThis)).toStrictEqual([ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ])
    })

    it('хук created', () => {
        expect(typeof RSSNewsWrapper.created).toBe('function')

        expect(mutations.setActiveChannel).toHaveBeenCalled()
        expect(mutations.setActiveChannel).toHaveBeenCalledTimes(1)
    })
})

describe('RSSNewsWrapper.vue', () => {
    let wrapper
    let getters
    let mutations
    let store
    let router

    beforeEach(() => {
        getters = {
            getNewsToRender: () => []
        }

        mutations = {
            setActiveChannel: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            mutations
        })

        const routes = [
            {
                path: '/mos/1',
                name: 'mos'
            }
        ]

        router = new VueRouter({
            routes
        })

        wrapper = shallowMount(RSSNewsWrapper, {
            localVue,
            store,
            router
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('правильно рендерится', () => {
        expect(wrapper.html().includes('rss-newswrapper__notfound')).toBe(true)
    })
})