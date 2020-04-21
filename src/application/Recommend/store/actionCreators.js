import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendRequest } from '../../../api/request'

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})

export const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners))
        }).catch(() => {
            console.log('banner list data error')
        })
    }
}

export const getRecommendList = () => { 
    return (dispatch) =>{
        getRecommendRequest().then(data =>{
            dispatch(changeRecommendList(data.result))
            dispatch(changeEnterLoading(false))
        }).catch(() => {
            console.log('recommend list data error')
        })
    }
}