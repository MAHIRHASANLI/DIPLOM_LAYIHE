import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import style from "./index.module.css";
import { useGlobalPassion } from "../../../../global";
import { useState } from "react";

const PassionUser = () => {
  const [globalPassion] = useGlobalPassion();
  const [file, setFile] = useState(null);

  return (
    <div className={style.Passion}>
      <div style={{ width: "87%" }}>
        <Box sx={{ flexGrow: 1 }}>
          {globalPassion &&
            globalPassion.map((item) => {
              return (
                <Grid key={item._id} container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div>
                      <h3 className={style.passion_about} data-aos="fade-up">{item.about}</h3>
                      <p className={style.passion_title} data-aos="fade-up">{item.title}</p>
                      <p className={style.passion_title} data-aos="fade-up">{item.title}</p>

                     <div data-aos="fade-up">
                     <button className={style.button}>Contact Us</button>
                     </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={style.iframe_img}  data-aos="fade-up">
                      <i
                        onClick={() => setFile(item)}
                        style={{ margin: "auto" }}
                        className="fa-solid fa-play"
                      ></i>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="w-full rounded"
                        src={item.img}
                        alt="Loading..."
                      />
                    </div>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </div>

      <div className={style.popup_media}  style={{ display: file ? "block" : "none" }}>
        <span onClick={() => setFile(null)}>&times;</span>
        {<video src={file?.url} muted autoPlay controls></video>}
      </div>
    </div>
  );
};

export default PassionUser;
