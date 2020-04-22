import React, { useEffect, useState } from 'react'
import { NavContainer, List, ListContainer, ListItem } from './style'
import Horizen from '../../baseUI/horizen-item'
import { categoryTypes, alphaTypes } from '../../api/config'
import Scroll from '../../baseUI/scroll'
import { actionCreators } from './store'
import { connect } from 'react-redux'
import {
    changeAlpha,
    changeCategory,
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/actionCreators'
import Lazyload, { forceCheck } from 'react-lazyload'
import placeholderImg from './singer.png'
import Loading from '../../baseUI/loading'
import { renderRoutes } from 'react-router-config'

const Singers = (props) => {
    const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props
    const { updateDispatch, getHotSingerDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props
    const {category, alpha, setAlpha, setCategory} = props 
    // const [category, setCategory] = useState('')
    // const [alpha, setAlpha] = useState('')

    useEffect(() => {
        if (!singerList.size) {
            getHotSingerDispatch()
        }
    }, [])

    const enterDetail = (id) => {
        props.history.push(`/singers/${id}`)
    }

    const handleUpdateCategory = (val) => {
        setCategory(val)
        updateDispatch(val, alpha)

    }

    const handleUpdateAlpha = (val) => {
        setAlpha(val)
        updateDispatch(category, val)
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, pageCount)
    }

    const handlePullDown = () => {
        console.log('down')
        pullDownRefreshDispatch(category, alpha)
    }
    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : []
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (

                            //todo key={item.accountId}
                            <ListItem key={index} onClick={() => {enterDetail(item.id)}}>
                                <div className='img_wrapper'>
                                    <Lazyload placeholder={<img src={placeholderImg} width='100%' height='100%' alt='music' />}>
                                        <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt='music' />
                                    </Lazyload>
                                </div>
                                <span className='name'>{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <>
            <NavContainer>
                <Horizen
                    list={categoryTypes}
                    title={'分类(默认热门):'}
                    oldVal={category}
                    handleClick={handleUpdateCategory}
                ></Horizen>
                <Horizen
                    list={alphaTypes}
                    title={'首字母:'}
                    oldVal={alpha}
                    handleClick={handleUpdateAlpha}
                ></Horizen>
            </NavContainer>
            <ListContainer>
                {enterLoading && <Loading></Loading>}
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            {renderRoutes(props.route.routes)}
        </>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
    alpha: state.getIn(['singers', 'alpha']),
    category: state.getIn(['singers', 'category']),
})

const mapDispatchToProps = (dispatch) => ({
    setAlpha(d) {
        dispatch(changeAlpha(d))
    },
    setCategory(d) {
        dispatch(changeCategory(d))
    },
    getHotSingerDispatch() {
        dispatch(getHotSingerList())
    },
    updateDispatch(category, alpha) {
        dispatch(changePageCount(0))
        dispatch(changeEnterLoading(true))
        dispatch(getSingerList(category, alpha))
    },
    pullUpRefreshDispatch(category, alpha, count) {
        dispatch(changePullUpLoading(true))
        dispatch(changePageCount(count + 1))
        if (category === '' && alpha === '') {
            dispatch(refreshMoreHotSingerList());
        } else {
            dispatch(refreshMoreSingerList(category, alpha))
        }
    },
    pullDownRefreshDispatch(category, alpha) {
        dispatch(changePullDownLoading(true))
        dispatch(changePageCount(0))
        if (category === '' && alpha === '') {
            dispatch(getHotSingerList())
        } else {
            dispatch(getSingerList(category, alpha))
        }

    }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))