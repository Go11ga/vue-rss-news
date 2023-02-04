import { shallowMount } from '@vue/test-utils'
import RSSSprite from '@/components/RSSSprite'

describe('RSSSprite.vue', () => {
    let wrapper = shallowMount(RSSSprite)

    it('правильно рендерится', () => {
        expect(wrapper.findAll('svg').length).toBe(2)
    })

    it('snapshot', () => {
        expect(wrapper.element).toMatchSnapshot()
    })
})