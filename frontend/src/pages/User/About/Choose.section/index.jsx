import React from "react";
import style from "./index.module.css"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


// import required modules
import { Autoplay} from "swiper";
import { useGlobalChoose } from "../../../../global";


const ChooseUser = () => {
  const [globalChoose] =useGlobalChoose();
  return (
    <div className={style.DivSwiper}>
      <h1 className={style.Swiper_title}>Why Choose Us</h1>
      {/* centeredSlides={true} */}
  <Swiper  slidesPerView={3}    spaceBetween={70}  grabCursor={true}  autoplay={{ delay: 3000, enabled: true, }} modules={[ Autoplay]} className="mySwiper">
         { globalChoose && globalChoose.map((item)=>{
        return(
          <SwiperSlide style={{background:"transparent"}} key={item._id} >
            <div className={style.swiper_item}>
            <i className={item.url}></i>
            <h4 className={style.swiper_item_h4}>{item.name}</h4>
            <p className={style.swiper_item_p}>{item.title}</p>
            </div>
          </SwiperSlide>)
         })
        }
      </Swiper>
    </div>
  )
}

export default ChooseUser