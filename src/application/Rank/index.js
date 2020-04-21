import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store'
import { filterIndex } from '../../api/utils'
import { Container, List, ListItem, SongList } from './style'
import Scroll from '../../baseUI/scroll'
import Loading from '../../baseUI/loading'
const Rank = (props) => {
    const { rankList: list, loading } = props
    const { getRankListDispatch } = props

    const rankList = list ? list.toJS() : []

    const globalStartIndex = filterIndex(rankList)
    const officialList = rankList.slice(0, globalStartIndex)
    const globalList = rankList.slice(globalStartIndex)

    useEffect(() => {
        getRankListDispatch();
    }, [])

    const renderSongList = (list) => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : null
    }

    const renderRankList = (list, isGlobal) => {
        return (
            <List globalRank={isGlobal}>
                {
                    list.map((item) => {
                        return (
                            <ListItem key={item.coverImgId} tracks={item.tracks}>
                                <div className='img-wrapper'>
                                    <img src={item.coverImgUrl} alt='' />
                                    <div className='decorate'></div>
                                    <span className='update-frequecy'>{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }
    const displayStyle = loading ? { 'display': 'none' } : { 'display': '' }

    console.log(props.route)
    return (
        <Container>
            <Scroll>
                <div>
                    <h1 className="offical" style={displayStyle}> 官方榜 </h1>
                    {renderRankList(officialList, false)}
                    <h1 className="global" style={displayStyle}> 全球榜 </h1>
                    {renderRankList(globalList, true)}
                    
                    {loading && <Loading></Loading>}
                </div>
            </Scroll>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading'])
})


const mapStateToDispatch = (dispatch) => ({
    getRankListDispatch() {
        dispatch(getRankList())
    }
})

export default connect(mapStateToProps, mapStateToDispatch)(React.memo(Rank))