import { axiosInstance } from "./config"
//Recommend
export const getBannerRequest = () => {
    return axiosInstance.get('/banner')
}

export const getRecommendRequest = () => {
    return axiosInstance.get('/personalized')
}

//Singers
export const getHotSingerListRequest = (count) => {
    return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
    return axiosInstance.get(`artist/list?cat=${category}&initial=${alpha.toLocaleLowerCase()}&offset=${count}`)
}

//Rank
export const getRankListRequest = () => {
    return axiosInstance.get(`/toplist/detail`)
}

//Album
export const getAlbumDetailRequest = (id) => {
    return axiosInstance.get(`playlist/detail?id=${id}`)
}