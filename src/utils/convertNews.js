import X2JS from 'x2js'

/**
 * преобразование XML файла в массив объектов новостей
 * @param { Object } data       - XML файл
 * @returns { Array.<Object> }  - объект одной новости    
 */
export default function convert(data) {
    const x2js = new X2JS()

    const incNews = x2js.xml2js(data.data)
    const channel = incNews.rss.channel

    let news = channel.item.map(el => {
        let image

        if (Array.isArray(el.enclosure)) {
            image = el?.enclosure[0]?._url
        } else {
            image = el?.enclosure?._url
        }

        return {
            title: el?.title,
            description: el?.description,
            link: el?.link,
            pubDate: el?.pubDate,
            image,
            channelLink: channel.link
        }
    })

    return news
}