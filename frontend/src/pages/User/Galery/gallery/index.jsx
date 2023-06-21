import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetAllGallery } from "../../../../api/gallery.requests";
import style from "./index.module.css";

const GalleryUser = () => {
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
 var btns = document.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    
    const current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}
  return (
    <div className={style.gallery_user}>
      <div>
        <button onClick={(e)=>handleClick(e)} value="" className="btn">
          All
        </button>
        <button onClick={(e)=>handleClick(e)} value="human" className="btn">
          Human
        </button>
        <button onClick={(e)=>handleClick(e)} value="nature" className="btn">
          Nature
        </button>
        <button onClick={(e)=>handleClick(e)} value="country" className="btn">
          Country
        </button>
        <button onClick={(e)=>handleClick(e)} value="video" className="btn">
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
                
                      {/*  data-aos="zoom-in-right" */}
                    <div className={style.gallery_img}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={item.url}
                        alt="Loading..."
                      />
                      <i className="fa-solid fa-plus"></i>
                    </div>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default GalleryUser;
