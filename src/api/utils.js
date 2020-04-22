export const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + "万";
    } else {
        return Math.floor(count / 10000000) / 10 + "亿";
    }
}

export const getName = list => {
    let str = ""
    list.map((item, index) => {
        str += index === 0 ? item.name : "/" + item.name
        return item
    })
    return str
}

export const debounce = (func, delay) => {
    let timeout = null;
    return function (...args) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;


export const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1
        }
    }
    return 0
}

export const getParentUrl = (url) => {
    const list = url.split('/').filter((item, index) => item || !index)
    return list.slice(0,-1).join('/') + '/'
}