import React, { useEffect} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./index.module.css"
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper";
// import { GetAllSlider } from "../../../../api/slider.requests";
import { useGlobalData } from "../../../../global";

const Slider = () => {
    const [globalSlider] = useGlobalData()
  
  return (
    <div className={style.About}>
        <Swiper
    cssMode={true}
    navigation={true}
    pagination={true}
    mousewheel={true}
    loop= {true}
    speed= {8000}
    keyboard={true}
    // autoplay={{
    //   delay: 4000,
    //   enabled: true,
    // }}
    modules={[Navigation, Pagination, Mousewheel, Keyboard,Autoplay]}
    className="mySwiper"
  >
    {
        globalSlider && globalSlider.map((item)=>{
            return(
                    <SwiperSlide key={item._id}>
                    <img className={style.image} style={{width:"100%", height:"100%",objectFit:"cover"}} src={item.url} alt="" />
                     <div className={style.About_item}>
                        <h1 className={style.name}>Hello <br /> I'm {item.name}</h1>
                        <p className={style.title}>{item.title}</p>
                       <div className={style.homeLink}>
                       <a href="" className={style.button}>Get A Quote</a><a href={`mailto:${item.email}`} className={style.email}>{item.email}</a>
                       </div>
                     </div>
                </SwiperSlide>
            )
        })
    }
  </Swiper>
    </div>
  )
}

export default Slider