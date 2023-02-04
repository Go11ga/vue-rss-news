function range (start, stop, step = 1) {
    return Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
}

/**
 * функция для подготовки кнопок с номерами страниц в пагинации
 * @param { Number } listLength     - количество элементов (кнопок) в пагинации 
 * @param { Number } currentPage    - номер активной страницы
 * @param { Number } totalPages     - количество страниц в пагинации 
 * @returns { Array.<Object> }      - массив объектов вида: { label: '1', value: 1 }
 */
export default function getPaginationOptions ({
    listLength = 10,
    currentPage = 0,
    totalPages
}) {
    const offest = Math.ceil(listLength / 2)
    let start = currentPage - offest
    let end = currentPage + offest

    if (totalPages <= listLength) {
        start = 0
        end = totalPages  

    } else if (currentPage <= offest) {
        start = 0
        end = listLength

    } else if ((currentPage + offest) >= totalPages) { 
        start = totalPages - listLength
        end = totalPages
    }
    
    return range(start, end)
        .map(value => ({
        label: String(value + 1),
        value: value + 1
    }))
}