import * as React from "react";
import { useGlobalTeam } from "../../../../global";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const TeamUser = () => {
  const [globalTeam] = useGlobalTeam();
  return (
    <div className={style.Team}>
        <h2 className={style.team_logo} data-aos="fade-up">Our Team</h2>
    <div style={{width:"86%"}}>
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {globalTeam &&
            globalTeam.map((item) => {
              return (
                <Grid key={item._id} className={style.grid} item xs={12} sm={6} md={4} lg={3}>
                  <div data-aos="fade-up" className={style.grid_item} >
                    <div className={style.image}>
                      <img className={style.image_img} src={item.url} alt="" />
                    </div>
                      <h5 className={style.team_name}>{item.name}</h5>
                      <span className={style.team_title}>{item.title}</span>
                    <div className={style.team_icons}>
                   <a href={item.facebook}><i className="fa-brands fa-facebook-f"></i></a>
                    <a href={item.linkedn}><i style={{marginLeft:"20px"}} className="fa-brands fa-linkedin-in"></i></a>
                    <a href={item.twitter}><i style={{marginLeft:"20px"}} className="fa-brands fa-twitter"></i></a>
                    <a href={item.pinterest}><i style={{marginLeft:"20px"}} className="fa-brands fa-pinterest-p"></i></a>
                    </div>
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

export default TeamUser;
