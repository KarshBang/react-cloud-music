import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle, useMemo } from 'react'
import PropTypes from 'prop-types'
import BScroll from "better-scroll"
import styled from 'styled-components'
import LoadingV2 from './loading-v2'
import Loading from './loading'
import { debounce } from '../api/utils'

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState(null)
    const ScrollContainerRef = useRef(null);
    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props
    const { pullUp, pullDown, onScroll } = props

    const pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp])

    const pullDownDebounce = useMemo(() =>{
        return debounce(pullDown, 300)
    }, [pullDown])

    useEffect(() => {
        const scroll = new BScroll(ScrollContainerRef.current, {
            scrollX: direction === 'horizental',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])

    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh()
        }
    })

    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on('scroll', (scroll) => {
            onScroll(scroll)
        })
        return () => {
            bScroll.off('scroll')
        }
    }, [onScroll, bScroll])

    useEffect(() => {
        if (!bScroll || !pullUp) return
        bScroll.on('scrollEnd', () => {
            // 判断是否滑动到了底部
            if (bScroll.y <= bScroll.maxScrollY + 100) {
                pullUpDebounce()
            }
        })

        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUpDebounce, bScroll])

    useEffect(() => {
        if (!bScroll || !pullDown) return
        bScroll.on('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce()
            }
        });
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDownDebounce, bScroll])

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                BScroll.scrollTo(0, 0)
            }
        },
        getBScroll() {
            return bScroll
        }
    }))
    const PullUpdisplayStyle = pullUpLoading ? { display: "" } : { display: "none" }
    const PullDowndisplayStyle = pullDownLoading ? { display: "" } : { display: "none" }

    return (
        <ScrollContainer ref={ScrollContainerRef}>
            {props.children}
            <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>
            <PullDownLoading style={PullDowndisplayStyle}><LoadingV2></LoadingV2></PullDownLoading>
        </ScrollContainer>
    )
})

Scroll.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizental']),
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,
    bounceBottom: PropTypes.bool
}

Scroll.defaultProps = {
    direction: 'vertical',
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}


export default Scroll