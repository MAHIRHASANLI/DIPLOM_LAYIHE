// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import style from "./index.module.css";
// import required modules
import { Navigation, Mousewheel, Keyboard, Autoplay } from "swiper";
import { useGlobalData } from "../../../../global";
import { Link } from "react-router-dom";

const Slider = () => {
  const [globalSlider] = useGlobalData();
  return (
    <div className={style.About}>
        <Swiper
          cssMode={true}
          navigation={true}
          mousewheel={true}
          loop={true}
          speed={15000}
          keyboard={true}
          autoplay={{
            delay: 10000,
            enabled: true,
          }}
          modules={[Navigation, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper"
        >
          {globalSlider &&
            globalSlider.map((item) => {
              return (
                <SwiperSlide className={style.slider_after} key={item._id}>
                  <img
                    className="image"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={item.url}
                    alt={item.name}
                  />

                  <div className={style.About_item}>
                    <h1 className={style.name}>
                      Hello <br /> I'm {item.name}
                    </h1>
                    <p className={style.title}>{item.title}</p>
                    <div className={style.homeLink}>
                      <Link to="/contact" className={style.button}>
                        Get A Quote
                      </Link>
                      <a href={`mailto:${item.email}`} className={style.email}>
                        {item.email}
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
    </div>
  );
};

export default Slider;
