import React, { useState, useRef, useCallback, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style'
import Header from '../../baseUI/header'
import SongsList from '../SongsList'
import Scroll from '../../baseUI/scroll'
import { HEADER_HEIGHT } from '../../api/config'
import {getParentUrl} from '../../api/utils'
import {connect} from 'react-redux'
import {getSingerInfo, changeEnterLoading} from './store/actionCreators'
import Loading from '../../baseUI/loading'

const Singer = (props) => {
    const [showStatus, setShowStatus] = useState(true)

    const {artist: artistIm, songs: songsIm, loading} = props
    const {getSingerDataDispatch} = props

    const artist = artistIm.toJS()
    const songs = songsIm.toJS()

    const collectButton = useRef()
    const imageWrapper = useRef()
    const songScrollWrapper = useRef()
    const songScroll = useRef()
    const header = useRef()
    const layer = useRef()
    const initialHeight = useRef(0)

    const backPage = () => {
        const url = getParentUrl(props.history.location.pathname)
        props.history.push(url)
    }

    const handleScroll = useCallback((pos) => {
        const height = initialHeight.current
        const newY = pos.y
        const imageDom = imageWrapper.current
        const buttonDom = collectButton.current
        const headerDom = header.current
        const layerDom = layer.current
        const minScrollY = -(height - OFFSET) + HEADER_HEIGHT
        const percent = Math.abs(newY / height)
        //下拉
        if (newY > 0) {
            imageDom.style["transform"] = `scale(${1 + percent})`;
            buttonDom.style["transform"] = `translate3d(0, ${newY}px, 0)`;
            layerDom.style.top = `${height - OFFSET + newY}px`
        } else if (newY >= minScrollY) {
            //上推未超过顶部
            layerDom.style.top = `${height - OFFSET + newY}px`
            buttonDom.style["transform"] = `translate3d(0, ${newY}px, 0)`
            buttonDom.style["opacity"] = `${1 - percent * 2}`
            imageDom.style.zIndex=50
            imageDom.style.paddingTop = '75%'
            imageDom.style.height = 0
        } else {
            layerDom.style.top = `${HEADER_HEIGHT - OFFSET}px`
            imageDom.style.zIndex=75
            imageDom.style.paddingTop = 0
            imageDom.style.height = `${HEADER_HEIGHT}px`
        }
    },[])

    useEffect(() => {
        const id = props.match.params.id
        getSingerDataDispatch(id)
    }, [])

    const OFFSET = 5
    useEffect(() => {
        const h = imageWrapper.current.offsetHeight
        initialHeight.current = h
        songScrollWrapper.current.style.top = `${h - OFFSET}px`
        layer.current.style.top = `${h - OFFSET}px`
        console.log(songScroll.current)
        songScroll.current.refresh()
    })

    const setShowStatusFalse = useCallback(() => {
        setShowStatus(false)
    }, [])


    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames='fly'
            appear={true}
            unmountOnExit
            onExited={backPage}
        >
            <Container>
                <Header
                    title={artist.name}
                    handleClick={setShowStatusFalse}
                    ref={header}
                ></Header>
                <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <SongsList
                            songs={songs}
                            showCollect={false}
                        >
                        </SongsList>
                    </Scroll>
                </SongListWrapper>
            {loading && <Loading></Loading>}
            </Container>
        </CSSTransition>

    )
}

const mapStateToProps = (state) => ({
    artist: state.getIn(['singerInfo', 'artist']),
    songs: state.getIn(['singerInfo', 'songsOfArtist']),
    loading: state.getIn(['singerInfo', 'loading']),
})

const mapDispatchToProps = (dispatch) => ({
    getSingerDataDispatch(id) {
        dispatch(changeEnterLoading(true))
        dispatch(getSingerInfo(id))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singer))