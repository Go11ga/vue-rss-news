import { shallowMount, createLocalVue } from '@vue/test-utils'
import RSSNewsItem from '@/components/RSSNewsItem'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RSSNewsItem.vue', () => {
    let getters
    let store
    let model
    let wrapper

    beforeEach(() => {
        getters = {
            getViewMode: () => 'list'
        }

        store = new Vuex.Store({
            getters
        })

        model = {
            title: 'testTitle',
            image: 'testImage',
            description: 'testDescription',
            link: 'testLink',
            pubDate: 'testPubDate',
            channelLink: 'testChannelLink'
        }

        wrapper = shallowMount(RSSNewsItem, {
            localVue,
            store,
            propsData: {
                model
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('правильно рендерится', async () => {
        expect(wrapper.vm.$options.name).toMatch('RSSNewsItem')

        expect(wrapper.find('.rss-newsitem__img').attributes().src).toMatch('testImage')

        wrapper.setProps({
            model: {
                title: 'testTitle',
                image: null,
                description: 'testDescription',
                link: 'testLink',
                pubDate: 'testPubDate',
                channelLink: 'testChannelLink'
            }
        })

        await localVue.nextTick()

        expect(wrapper.find('.rss-newsitem__img').attributes().src).toMatch('https://dummyimage.com/300x168/DCDCDC/fff')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('переключает режим отображения новости при клике на .rss-newsitem__btn', async () => {
        expect(wrapper.vm.$data.showHeightAuto).toBe(false)

        await wrapper.find('.rss-newsitem__btn').trigger('click')

        expect(wrapper.vm.$data.showHeightAuto).toBe(true)
        expect(wrapper.find('.rss-newsitem--list').classes()).toContain('rss-newsitem--list')
    })

    it('тест фильтра channelURL', () => {
        expect(RSSNewsItem.filters.channelURL('https://mos.ru')).toBe('mos.ru')
    })

    it('тест фильтра publicDate', () => {
        expect(RSSNewsItem.filters.publicDate('Tue, 19 Jul 2022 15:58:43 +0300')).toBe('19.07.2022 15:58:43')
    })
})
