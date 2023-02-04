import { shallowMount, createLocalVue } from '@vue/test-utils'
import RSSHeader from '@/components/RSSHeader'
import Vuex from 'vuex'

describe('RSSHeader.vue рендеринг', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(RSSHeader)
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('правильно рендерится', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSHeader')

        expect(wrapper.find('h1').text()).toMatch('Список новостей')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RSSHeader.vue пользовательские события', () => {

    let wrapper
    let mutations
    let actions
    let store
    let searchNewsSpy

    beforeEach(() => {
        mutations = {
            setSearchValue: jest.fn()
        }

        actions = {
            fetchNews: jest.fn()
        }
        
        store = new Vuex.Store({
            mutations,
            actions
        })

        searchNewsSpy = jest.spyOn(RSSHeader.methods, 'searchNews')

        wrapper = shallowMount(RSSHeader, {
            localVue,
            store
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('клик на кнопку .rss-header__refresh вызывает Vuex action fetchNews', () => {
        wrapper.find('.rss-header__refresh').trigger('click')

        expect(actions.fetchNews).toHaveBeenCalled()
        expect(actions.fetchNews).toHaveBeenCalledTimes(1)
    })

    it('нажатие enter в инпуте вызывает метод searchNews', () => {
        let input = wrapper.find('.rss-header__input')
        
        input.trigger('keyup')
        expect(searchNewsSpy).not.toHaveBeenCalled()

        input.trigger('keyup.enter')
        
        expect(searchNewsSpy).toHaveBeenCalled()
        expect(searchNewsSpy).toHaveBeenCalledTimes(1)
    })

    it('клик на кнопку .rss-header__btn вызывает метод searchNews', () => {
        wrapper.find('.rss-header__btn').trigger('click')

        expect(searchNewsSpy).toHaveBeenCalled()
        expect(searchNewsSpy).toHaveBeenCalledTimes(2)
    })

    
    it('метод searchNews вызывает Vuex mutation setSearchValue с payload', () => {
        wrapper.setData({ searchValue: 'test' })
        wrapper.vm.searchNews()

        expect(mutations.setSearchValue).toHaveBeenCalled()
        expect(mutations.setSearchValue).toHaveBeenCalledTimes(1)
        expect(mutations.setSearchValue).toHaveBeenCalledWith({}, 'test')
    })
})
