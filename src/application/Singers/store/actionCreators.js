import { getHotSingerListRequest, getSingerListRequest } from '../../../api/request'
import * as actionTypes from './constants'
import { fromJS } from 'immutable'

export const changeAlpha = (data) => ({
    type: actionTypes.CHANGE_ALPHA,
    data
})

export const changeCategory = (data) => ({
    type: actionTypes.CHANGE_CATEGORY,
    data
})

export const changeSingerList = (data) => ({
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
})

export const changePageCount = (data) => ({
    type: actionTypes.CHANGE_PAGE_COUNT,
    data
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const changePullUpLoading = (data) => ({
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = (data) => ({
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})

export const getHotSingerList = () => {
    return (distpatch) => {
        getHotSingerListRequest(0).then((res, err) => {
            console.log(res, err, '------------')
            const data = res.artists
            distpatch(changeSingerList(data))
            distpatch(changeEnterLoading(false))
            distpatch(changePullUpLoading(false))
            distpatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('hot singer data error')
        })
    }
}

export const refreshMoreHotSingerList = () => {
    return (distpatch, getState) => {
        const state = getState()
        const pangeCount = state.getIn(['singers', 'pageCount'])
        const singerList = state.getIn(['singers', 'singerList']).toJS()
        getHotSingerListRequest(pangeCount).then(res => {
            const data = [...singerList, ...res.artists]
            distpatch(changeSingerList(data))
            distpatch(changePullUpLoading(false))
        }).catch(() => {
            console.log('refresh hot singer data error')
        })
    }
}

export const getSingerList = (category, alpha) => {
    return (distpatch) => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.artists
            distpatch(changeSingerList(data))
            distpatch(changeEnterLoading(false))
            distpatch(changePullUpLoading(false))
            distpatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('singer data error')
        })
    }
}

export const refreshMoreSingerList = (category, alpha) => {
    return (distpatch, getState) => {
        const state = getState()
        const pangeCount = state.getIn(['singers', 'pageCount'])
        const singerList = state.getIn(['singers', 'singerList']).toJS()
        getSingerListRequest(category, alpha, pangeCount).then(res => {
            const data = [...singerList, ...res.artists]
            distpatch(changeSingerList(data))
            distpatch(changePullUpLoading(false))
        }).catch(() => {
            console.log('refresh hot singer data error')
        })
    }
}