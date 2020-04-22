import React, { forwardRef } from 'react'
import {SongList, SongItem } from './style'
import {getName, getCount} from '../../api/utils'

const SongsList = forwardRef((props, refs) => {
    const {collectCount, showCollect, songs} = props

    const totalCount = songs.length

    const selectItem  = (e, index) => {
        console.log(index)
    }

    const songList = (list) => {
        const res = list.map((item, index) => {
            return (
                //todo key={item.id}
                <li key={index} onClick={(e) => selectItem(e, index)}>
                    <span className='index'>{index+1}</span>
                    <span>
                        { item.ar ? getName (item.ar): getName (item.artists) } - { item.al ? item.al.name : item.album.name}
                    </span>
                </li>
            )
        })
        return res
    }

    const collect = (count) => {
        return (
            <div className='add-list'>
                <i className='iconfont'>&#xe62d;</i>
                <span>收藏({getCount(count)})</span>
            </div>
        )
    }


    return (
        <SongList ref={refs} showBackground={props.showBackground}>
            <div className='first-line'>
                <div className='play-all' onClick={(e) => selectItem(e,0)}>
                    <i className='iconfont'>&#xe6e3;</i>
                    <span> 播放全部 <span className='sum'>(共 {totalCount} 首)</span></span>
                </div>
                {showCollect && collect(collectCount)}
            </div>
            <SongItem>
                {songList(songs)}
            </SongItem>
        </SongList>
    )
})


export default React.memo(SongsList)