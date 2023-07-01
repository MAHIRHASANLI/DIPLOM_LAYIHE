import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import style from "./index.module.css";
import { useGlobalBlog } from "../../../../global";
var image = document.getElementsByClassName("image");
for (let i = 0; i < image.length; i++) {
  console.log(i);
}

const BlogUser = () => {
  const [globalBlog] = useGlobalBlog([]);
  return (
    <div className={style.blog_user}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {globalBlog &&
            globalBlog.map((item) => {
              return (
                <Grid key={item._id} item xs={12} sm={6} md={4} lg={4}>
                <div data-aos="fade-up" className={style.blog_item}>
                <img
                    className="image"
                    style={{ width: "100%" }}
                    src={item.url}
                    alt=""
                  />
                 <div className={style.top_item}><span>{item.type}</span></div>

                  <div className={style.title_blog}>
                  <div className={style.center_item}><span>{item.time}</span><span style={{color:"white"}}>|</span>  <span>{item.comment}</span></div>
                  <div className={style.bottom_item}><span>{item.title}</span></div>
                  </div>
                </div>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
};

export default BlogUser;
