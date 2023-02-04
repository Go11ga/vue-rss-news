import { news } from '@/store/modules/news'
import { mosNews, mosNewsSorted } from '@/mocks/mosNews'
import { riaNews, riaNewsSorted } from '@/mocks/riaNews'
import { incNews, newsProcessed } from '@/mocks/newsChannel'
import axios from 'axios'

describe('getters', () => {
    const state = {
        mosNews,
        riaNews,
        activeChannel: ''
    }

    it('getNews', () => {
        state.activeChannel = 'mos'
        expect(news.getters.getNews(state)).toEqual(mosNewsSorted)

        state.activeChannel = 'ria'
        expect(news.getters.getNews(state)).toEqual(riaNewsSorted)

        state.activeChannel = 'all'
        expect(news.getters.getNews(state)).toEqual([...mosNewsSorted, ...riaNewsSorted])
    })

    it('getNewsToRender', () => {
        state.activeChannel = 'mos'
        state.searchValue = "Test title 1"

        let getters = {
            getNews: mosNewsSorted
        }

        expect(news.getters.getNewsToRender(state, getters)).toEqual([        
            {      
                channelLink: 'https://www.mos.ru/',
                description: 'Test 1',
                image: 'https://www.mos.ru/upload/1',
                link: 'https://www.mos.ru/news/item/1',
                pubDate: 'Wed, 27 Jul 2022 11:00:00 +0300',
                title: 'Test title 1'
            }
        ])
    })

    it('getViewMode', () => {
        state.viewMode = 'grid'
        expect(news.getters.getViewMode(state)).toMatch('grid')
    })

    it('getLoadingNewsProcess', () => {
        state.loadingNewsProcess = true
        expect(news.getters.getLoadingNewsProcess(state)).toBe(true)
    })

    it('getActiveChannel', () => {
        state.activeChannel = 'mos'
        expect(news.getters.getActiveChannel(state)).toMatch('mos')
    })
})

describe('mutations', () => {
    it('setMosNews', () => {

        const payload = incNews

        const state = {
            mosNews: []
        }

        news.mutations.setMosNews(state, payload)

        expect(state.mosNews).toEqual(newsProcessed)
    })

    it('setRiaNews', () => {

        const payload = incNews

        const state = {
            riaNews: []
        }

        news.mutations.setRiaNews(state, payload)

        expect(state.riaNews).toEqual(newsProcessed)
    })

    it('setActiveChannel', () => {
        const channel = 'mos'

        const state = {
            activeChannel: 'all'
        }

        news.mutations.setActiveChannel(state, channel)

        expect(state.activeChannel).toMatch('mos')
    })

    it('setViewMode', () => {
        const mode = 'grid'

        const state = {
            viewMode: ''
        }

        news.mutations.setViewMode(state, mode)

        expect(state.viewMode).toMatch('grid')
    })

    it('setSearchValue', () => {
        const value = 'testSearch'

        const state = {
            searchValue: ''
        }

        news.mutations.setSearchValue(state, value)

        expect(state.searchValue).toMatch('testSearch')
    })
})

jest.mock('axios')

describe('actions', () => {
    it('fetchNews success', async () => {
        const mockData = { data: 'xml document' }
    
        axios.get.mockResolvedValue(mockData)

        const store = { 
            state: {}, 
            commit: jest.fn() 
        }

        await news.actions.fetchNews(store)
    
        expect(store.commit).toHaveBeenCalledTimes(2)
        expect(store.commit).toHaveBeenCalledWith("setMosNews", { data: 'xml document' })
        expect(store.commit).toHaveBeenCalledWith("setRiaNews", { data: 'xml document' })
    })

    it('fetchNews error', async () => {
        axios.get.mockRejectedValue({ message: 'error' })

        const store = { 
            state: {}, 
            commit: jest.fn() 
        }

        await news.actions.fetchNews(store)
        expect(store.commit).toHaveBeenCalledTimes(1)
        expect(store.commit).toHaveBeenCalledWith("setError", { msg: 'error', type: "error" })
    })
})