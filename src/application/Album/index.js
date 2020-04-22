import React, { useState, useRef, useEffect, useCallback } from 'react'
import style from '../../assets/global-style'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import Header from '../../baseUI/header'
import Scroll from '../../baseUI/scroll'
import { getCount } from '../../api/utils'
import { connect } from 'react-redux'
import { changeEnterLoading, getAlbumList } from './store/actionCreator'
import { isEmptyObject, getParentUrl } from '../../api/utils'
import Loading from '../../baseUI/loading'
import SongsList from '../SongsList'
import {HEADER_HEIGHT} from '../../api/config'

const Album = (props) => {
    const id = props.match.params.id;
    const { currentAlbum: currentAlbumImmutable, enterLoading } = props
    const { getAlbumDataDispatch } = props
    const currentAlbum = currentAlbumImmutable.toJS()
    const [showStatus, setShowStatus] = useState(true)
    const [title, setTitle] = useState('歌单')
    const [isMarquee, setIsMarquee] = useState(false)
    const headerEl = useRef()

    useEffect(() => {
        getAlbumDataDispatch(id)
    }, [getAlbumDataDispatch, id])

    const handleBack = useCallback(() => {
        setShowStatus(false)
    }, [])


    const handleScroll = useCallback((pos) => {
        const minScrollY = -HEADER_HEIGHT
        const percent = Math.abs(pos.y / minScrollY)
        const headerDom = headerEl.current

        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"]
            headerDom.style.opacity = Math.min(1, (percent - 1) / 2)
            setTitle(currentAlbum.name)
            setIsMarquee(true)
        } else {
            headerDom.style.backgroundColor = ''
            headerDom.style.opacity = 1
            setTitle('歌单')
            setIsMarquee(false)
        }
    }, [currentAlbumImmutable])

    const backPage = () => {
        const url = getParentUrl(props.history.location.pathname)
        props.history.push(url)
    }

    const renderTopDesc = () => (
        <TopDesc backgroud={currentAlbum.coverImgUrl}>
            <div className="background">
                <div className="filter"></div>
            </div>
            <div className='img-wrapper'>
                <div className='decorate'></div>
                <img src={currentAlbum.coverImgUrl} alt='' />
                <div className="play-count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(currentAlbum.subscribedCount)} 万 </span>
                </div>
            </div>
            <div className='desc-wrapper'>
                <div className='title'>{currentAlbum.name}</div>
                <div className='person'>
                    <div className='avatar'>
                        <img src={currentAlbum.creator.avatarUrl} alt='' />
                    </div>
                    <div className='name'>{currentAlbum.creator.nickname}</div>
                </div>
            </div>
        </TopDesc>
    )

    const renderMenu = () => (
        <Menu>
            <div>
                <i className='iconfont'>>&#xe6ad;</i>
                评论
            </div>
            <div>
                <i className='iconfont'>&#xe86f;</i>
                点赞
            </div>
            <div>
                <i className='iconfont'>&#xe62d;</i>
                收藏
            </div>
            <div>
                <i className='iconfont'>&#xe606;</i>
                更多
            </div>
        </Menu>
    )

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
                <Header ref={headerEl} isMarquee={isMarquee} title={title} handleClick={handleBack}></Header>
                {!isEmptyObject(currentAlbum) &&
                    <Scroll bounceTop={false} onScroll={handleScroll}>
                        <div>
                            {renderTopDesc()}
                            {renderMenu()}
                            <SongsList
                            songs={currentAlbum.tracks}
                            collectCount={currentAlbum.subscribedCount}
                            showCollect={true}
                            ></SongsList>
                        </div>
                    </Scroll>
                }
                {
                    enterLoading && <Loading></Loading>
                }
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading']),
})

const mapDispatchToProps = (dispatch) => ({
    getAlbumDataDispatch(id) {
        dispatch(changeEnterLoading(true))
        dispatch(getAlbumList(id))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))