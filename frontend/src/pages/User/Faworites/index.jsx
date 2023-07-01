import React, { useEffect } from "react";
import style from "./index.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUserContext } from "../../../global";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";
import Navbar from "../../../components/USER/Navbar";
import { FadingBalls } from "react-cssfx-loading";
import { Helmet } from "react-helmet";

const Faworites = () => {
  const navigate = useNavigate();
  const [user, setUser] = useUserContext();
  const [fawori, setFawori] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localStorag = JSON.parse(localStorage.getItem("fawori"));
    setFawori(localStorag);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div className="application">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Contact</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
    {loading ? (
      <div className="loading">
        <FadingBalls key="key" />
      </div>
    ) : (
      <>
        <Navbar/>
    <div className={style.faworites}>
      <div className={style.faworites_item}>
        <div className={style.username_item}>
        {user?(<>  <div>
            <p>
              <AccountCircleIcon /> USERNAME: {user?.username}
            </p>
            <p>
              <AttachEmailIcon /> EMAIL: {user?.email}
            </p>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                  width: "350",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    localStorage.removeItem("fawori");
                    setUser(null);
                    navigate("/login/user");
                    Swal.fire(
                      "Deleted!",
                      "Your User has been deleted.",
                      "success"
                    );
                  }
                });
              }}
            >
              Log out
            </button>
          </div></>):(<div style={{color:"white"}}>There is no user!</div>)}
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={70}
          grabCursor={true}
          autoplay={{ delay: 3000, enabled: true }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {fawori &&
            fawori.map((img) => {
              return (
                <SwiperSlide style={{ background: "transparent" }} key={img}>
                  <Card sx={{ minWidth: "100%" }}>
                    <CardContent>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={img}
                        alt="Fawori"
                      />
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => {
                          const localimage = JSON.parse(
                            localStorage.getItem("fawori")
                          );
                          const filterImage = localimage.filter(
                            (m) => m !== img
                          );
                          localStorage.setItem(
                            "fawori",
                            JSON.stringify(filterImage)
                          );
                          setFawori(filterImage);
                          Swal.fire({
                            position: "center-end",
                            icon: "success",
                            title: "Delete successfully!!",
                            showConfirmButton: false,
                            width: 280,
                            timer: 700,
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
    </>
      )}
    </div>
  );
};

export default Faworites;
