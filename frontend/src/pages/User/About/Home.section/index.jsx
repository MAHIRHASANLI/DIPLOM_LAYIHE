import React from "react";
import { Link } from 'react-router-dom';
import style from "./index.module.css";
import { useGlobalChoose } from "../../../../global";
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const HomeGlobalSection = () => {
  const [globalChoose, setGlobalChoose] = useGlobalChoose();
  return (
    <div className={style.HomeImg}>
      <div className={style.HomeImg_content}>
        <h2 className={style.HomeImg_content_h2}>About Us</h2>
        <ol className={style.HomeImg_content_home}><OtherHousesIcon style={{fontSize:"20px"}}/> <Link to="/">Home</Link> <ArrowForwardIosIcon style={{fontSize:"15px"}}/><span className={style.HomeImg_content_about}>About</span></ol>
      </div>

      <img className={style.HomeImg_item} src={globalChoose.url} alt="#" />;
      {/* {globalChoose &&
        globalChoose.map((item) => {
          return
        })} */}
    </div>
  );
};

export default HomeGlobalSection;
