import React, { useEffect } from 'react'
import Slider from '../../components/slider'
import RecommendList from '../../components/list'
import { Content } from './style'
import Scroll from '../../baseUI/scroll'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { forceCheck } from 'react-lazyload'
import Loading from '../../baseUI/loading'
const Recommend = (props) => {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendDataDispatch } = props

  useEffect(() => {
    if(!bannerList.size){
      getBannerDataDispatch()
    }
    if(!recommendList.size){
      getRecommendDataDispatch()
    }
  }, [])
  const bannerListjs = bannerList ? bannerList.toJS() : []
  const recommendListjs = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListjs}></Slider>
          <RecommendList recommendList={recommendListjs}></RecommendList>
        </div>
      </Scroll>
      {enterLoading && <Loading></Loading>}
    </Content>

  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => ({
  getBannerDataDispatch() {
    dispatch(actionCreators.getBannerList())
  },
  getRecommendDataDispatch() {
    dispatch(actionCreators.getRecommendList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))