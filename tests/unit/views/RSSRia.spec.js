import { shallowMount } from '@vue/test-utils'
import RSSRia from '@/views/RSSRia'

describe('RSSRia.vue', () => {
    it('проверка имени компонента', () => {
        let wrapper = shallowMount(RSSRia)

        expect(wrapper.vm.$options.name).toMatch('RSSRia')
    })
})