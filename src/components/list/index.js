import React from 'react'
import { ListWrapper, List, ListItem } from './style'
import { getCount } from '../../api/utils'
import LazyLoad from 'react-lazyload'
import placeholderImg from './music.png'
import { withRouter } from 'react-router-dom'

const RecommendList = (props) => {
    const enterDetail = (id) => {
        props.history.push(`/recommend/${id}`)
    }
    return (
        <ListWrapper>
            <h1 className='title'>推荐歌单</h1>
            <List>
                {
                    props.recommendList.map((item, index) => {
                        return (
                            <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    <LazyLoad placeholder={<img width="100%" height="100%" alt="music" src={placeholderImg}></img>}>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                    <div className="desc">{item.name}</div>
                                </div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </ListWrapper>
    )
}

export default React.memo(withRouter(RecommendList))