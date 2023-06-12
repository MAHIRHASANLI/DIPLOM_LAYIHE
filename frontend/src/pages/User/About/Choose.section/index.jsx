import React from "react";
import style from "./index.module.css"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { FreeMode, Pagination } from "swiper";
import { useGlobalChoose } from "../../../../global";

const ChooseUser = () => {
  const [globalChoose] =useGlobalChoose();
  return (
    <div className={style.DivSwiper}>
      <h1 className={style.DivSwiper_text}>Why Choose Us</h1>
    <Swiper
    slidesPerView={3}
    spaceBetween={30}
    freeMode={true}
    pagination={{
      clickable: true,
    }}
    modules={[FreeMode, Pagination]}
    className={style.mySwiper}
  >
    {
      globalChoose && globalChoose.map((item)=>{
        return(
          <SwiperSlide key={item._id}  className={style.mySwiper_item} style={{width:"280px"}}>
            <div className={style.swiper_item}>
            <i className={item.url}></i>
            <h4 className={style.swiper_item_h4}>{item.name}</h4>
            <p className={style.swiper_item_p}>{item.title}</p>
            </div>
          </SwiperSlide>
        )
      })
    }
   
  </Swiper>
    </div>
  )
}

export default ChooseUser