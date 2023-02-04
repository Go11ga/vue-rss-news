import { shallowMount } from '@vue/test-utils'
import RSSPagination from '@/components/ui/RSSPagination'

describe('RSSPagination.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(RSSPagination, {
            propsData: {
                currentPage: 1,
                totalCount: 8
            }
        })
    })

    afterEach(() => {
        wrapper.destroy()
    })

    it('проверка имени компонента', () => {
        expect(wrapper.vm.$options.name).toMatch('RSSPagination')
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })

    it('computed pages', () => {
        let localThis = {
            paginationLength: 3,
            currentPage: 1,
            totalCount: 3
        }

        expect(RSSPagination.computed.pages.call(localThis)).toStrictEqual([
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 }
        ])
    })
})