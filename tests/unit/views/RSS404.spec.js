import { shallowMount } from '@vue/test-utils'
import RSS404 from '@/views/RSS404'

describe('RSS404.vue', () => {
    it('проверка имени компонента', () => {
        let wrapper = shallowMount(RSS404)

        expect(wrapper.vm.$options.name).toMatch('RSS404')
    })
})