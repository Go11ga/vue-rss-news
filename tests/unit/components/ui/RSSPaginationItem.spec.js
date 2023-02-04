import { shallowMount, createLocalVue } from '@vue/test-utils'
import RSSPaginationItem from '@/components/ui/RSSPaginationItem'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('RSSPaginationItem.vue', () => {
    let wrapper
    let router

    beforeEach(() => {
        router = new VueRouter()

        wrapper = shallowMount(RSSPaginationItem, {
            localVue,
            router,
            propsData: {
                label: '1',
                value: 1,
                active: true,
                size: 'big'
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('проверка имени компонента', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSPaginationItem')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('props', async () => {
        expect(wrapper.classes().includes('rss-pagination__link')).toBe(true)
        expect(wrapper.classes().includes('rss-pagination__link--big')).toBe(true)
        expect(wrapper.classes().includes('rss-pagination__link--active')).toBe(true)

        wrapper.setProps({
            label: '1',
            value: 1,
            active: false,
            size: undefined
        })

        await localVue.nextTick()

        expect(wrapper.classes().includes('rss-pagination__link')).toBe(true)
        expect(wrapper.classes().includes('rss-pagination__link--big')).toBe(false)
        expect(wrapper.classes().includes('rss-pagination__link--active')).toBe(false)
    })

    it('computed path', () => {
        let localThis = {
            $route: {
                name: 'mos' 
            },
            value: 1
        }

        expect(RSSPaginationItem.computed.path.call(localThis)).toMatch('/mos/1')
    })
})
