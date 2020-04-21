import React, { useState, useEffect } from 'react'
import { SliderContainer } from './style'
import 'swiper/css/swiper.css'
import Swipper from 'swiper'
import Swiper from 'swiper'

const Slider = (props) => {
    const [sliderSwipper, setSliderSwipper] = useState(null)
    const { bannerList } = props;

    useEffect(() => {
        if(sliderSwipper || !bannerList.length) return
        let newSliderSwiper = new Swiper('.slider-container', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: { el: '.swiper-pagination' }
        })
        setSliderSwipper(newSliderSwiper)

    }, [bannerList.length, sliderSwipper])

    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map((slider, index) => {
                            return (
                                //done key={slider.imageUrl}
                                <div className="swiper-slide" key={slider.imageUrl}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    )
}

export default React.memo(Slider)