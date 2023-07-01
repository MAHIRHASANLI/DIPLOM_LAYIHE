import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import style from "./index.module.css";

// Import Swiper styles
import "swiper/css";
import { GetAllFollowInstagram } from "../../../api/followinginstagram.requests";
import { Autoplay } from "swiper";

const FollowerUser = () => {
  const [follower, setFollower] = React.useState([]);
  React.useEffect(() => {
    GetAllFollowInstagram().then((res) => {
      setFollower(res);
    });
  }, []);
  return (
    <div className={style.follower}>
      <h2>Follow Instagram</h2>
      <p>@Alime_photographer</p>
      <div style={{ paddingTop: "60px" }}>
        <Swiper
          speed={2000}
          grabCursor={true}
          autoplay={{ delay: 4000, enabled: true }}
          modules={[Autoplay]}
          watchSlidesProgress={true}
          slidesPerView={5}
          className="mySwiper"
        >
          {follower &&
            follower.map((item) => {
              return (
                <SwiperSlide className={style.swiper_item} key={item._id}>
                  <img src={item.url} alt="Loading..." />
                  <div className={style.count}>
                    <i className="fa-brands fa-instagram"></i>
                    <a href={`http://instagram.com/_u/${item.count}/`}>
                      {item.count}
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default FollowerUser;
