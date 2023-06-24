import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetAllGallery } from "../../../../api/gallery.requests";
import style from "./index.module.css";

import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import { Fab } from "@mui/material";

const GalleryUser = () => {
  const [img, setImg] = React.useState("");
  console.log(img);
  const [gallery, setGallery] = React.useState([]);
  React.useEffect(() => {
    GetAllGallery().then((res) => {
      setGallery(res);
    });
  }, []);

  function handleClick(e) {
    GetAllGallery(e.target.value).then((res) => {
      setGallery(res);
    });
  }

  // Get all buttons with class="btn" inside the container
  var aa = document.getElementById("aa");
  const btnsElement = document.querySelectorAll(".btn");
  btnsElement.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (aa.className.includes("active")) {
        aa.classList.remove("active");
      }
      document.querySelector(".active")?.classList.remove("active");
      btn.classList.add("active");
    });
  });
  /////

  ////
  return (
    <div className={style.gallery_user}>
     
    
      <div className={style.btns}>
        <button
          id="aa"
          onClick={(e) => handleClick(e)}
          //  value=""
          className="btn active"
        >
          All
        </button>
        <button onClick={(e) => handleClick(e)} value="human" className="btn">
          Human
        </button>
        <button onClick={(e) => handleClick(e)} value="nature" className="btn">
          Nature
        </button>
        <button onClick={(e) => handleClick(e)} value="country" className="btn">
          Country
        </button>
        <button onClick={(e) => handleClick(e)} value="video" className="btn">
          Video
        </button>
      </div>
      <div style={{ width: "90%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {gallery &&
              gallery.map((item) => {
                return (
                  <Grid key={item._id} item xs={12} sm={6} md={3} lg={3}>
                    <div className={style.gallery_img}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={item.url}
                      />
                      {/* <SlideshowLightbox className="container grid grid-cols-3 gap-2 mx-auto">
                        <img
                          src={item.url}
                          style={{ width: "100%", height: "100%" }}
                          alt=""
                        />
                      </SlideshowLightbox> */}
                      <a
                        // href={item.url}
                        style={{ color: "red" }}
                        className="w-full rounded"
                      >
                        +
                      </a>
                      {/* <i className="w-full rounded fa-solid fa-plus"></i> */}
                    </div>
                    {/* <SimpleLightbox><img src={item.url} alt="" /></SimpleLightbox> */}
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
      <a href="#" className={style.btn_2}>
        View More
      </a>
    </div>
  );
};

export default GalleryUser;
