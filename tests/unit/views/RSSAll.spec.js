import { shallowMount } from '@vue/test-utils'
import RSSAll from '@/views/RSSAll'

describe('RSSAll.vue', () => {
    it('проверка имени компонента', () => {
        let wrapper = shallowMount(RSSAll)

        expect(wrapper.vm.$options.name).toMatch('RSSAll')
    })
})