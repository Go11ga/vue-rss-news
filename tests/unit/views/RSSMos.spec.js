import { shallowMount } from '@vue/test-utils'
import RSSMos from '@/views/RSSMos'

describe('RSSMos.vue', () => {
    it('проверка имени компонента', () => {
        let wrapper = shallowMount(RSSMos)

        expect(wrapper.vm.$options.name).toMatch('RSSMos')
    })
})