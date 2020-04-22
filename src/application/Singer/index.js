import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Container, ImgWrapper, CollectButton, BgLayer} from './style'
import Header from '../../baseUI/header'

const oneSong = {
    name: "我好像在哪见过你",
    ar: [{ name: "薛之谦" }],
    al: {
        name: "薛之谦专辑"
    }
}
const hotSongs = new Array(20).fill(oneSong)
const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs
}

const Singer = (props) => {
    const [showStatus, setShowStatus] = useState(true)

    const backPage = () => {
        const url = getParentUrl(props.history.location.pathname)
        props.history.push(url)
    }

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
                <Header title={'head'}></Header>
                <ImgWrapper bgUrl={artist.picUrl}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer></BgLayer>
            </Container>
        </CSSTransition>

    )
}

export default Singer