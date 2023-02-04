import { shallowMount, createLocalVue } from '@vue/test-utils'
import RSSControls from '@/components/RSSControls'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RSSControls.vue', () => {
    let wrapper
    let getters
    let mutations
    let store
    let toggleViewSpy
    let setItem
    let getItem

    beforeEach(() => {
        getters = {
            getActiveChannel: () => 'mos'
        }

        mutations = {
            setViewMode: jest.fn()
        }

        store = new Vuex.Store({
            getters,
            mutations
        })

        toggleViewSpy = jest.spyOn(RSSControls.methods, 'toggleView')
        setItem = jest.spyOn(Storage.prototype, 'setItem')
        getItem = jest.spyOn(Storage.prototype, 'getItem')

        wrapper = shallowMount(RSSControls, {
            localVue,
            store,
            stubs: ['router-link']
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('правильно рендерится', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSControls')

        expect(wrapper.findAll('.rss-controls__link').at(0).text()).toMatch('All')
        expect(wrapper.findAll('.rss-controls__link').at(1).text()).toMatch('Mos')
        expect(wrapper.findAll('.rss-controls__link').at(2).text()).toMatch('RIA')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('getter getActiveChannel', () => {
        expect(wrapper.find('.rss-controls__link--active').text()).toMatch('Mos')
    })

    it('клик на кнопке переключения отображения вида list', async () => {
        let btnList = wrapper.findAll('.rss-controls__btn').at(0)

        await btnList.trigger('click')

        expect(toggleViewSpy).toHaveBeenCalled()
        expect(toggleViewSpy).toHaveBeenCalledTimes(1)

        expect(wrapper.findAll('button').at(0).classes()[1]).toBe('rss-controls__btn--active')

        expect(setItem).toHaveBeenCalled()
        expect(setItem).toHaveBeenCalledTimes(1)
    })

    it('метод toggleView вызывает Vuex mutation setViewMode с payload', () => {
        wrapper.vm.toggleView('list')

        expect(mutations.setViewMode).toHaveBeenCalled()
        expect(mutations.setViewMode).toHaveBeenCalledTimes(1)
        expect(mutations.setViewMode).toHaveBeenCalledWith({}, 'list')

    })

    it('хук created', () => {
        expect(typeof RSSControls.created).toBe('function')

        expect(getItem).toHaveBeenCalled()

        expect(mutations.setViewMode).toHaveBeenCalled()
    })
})