import convert from '@/utils/convertNews'
import { incNews, newsProcessed } from '@/mocks/newsChannel'

describe('convertNews', () => {
    it('преобразует данные из XML файла', () => {
        expect(convert(incNews)).toEqual(newsProcessed)
    })
})