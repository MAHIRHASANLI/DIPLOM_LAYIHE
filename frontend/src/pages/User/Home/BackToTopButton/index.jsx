import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import style from "./index.module.css";

const BackToTopButton = () => {
    const [backToTopBtn, setBackToTopBtn] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                setBackToTopBtn(true);
            }else{
                setBackToTopBtn(false);
            }
        })
    },[])

    const scrollUp =()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
    }
  return (
   <>
     {backToTopBtn && (<button onClick={scrollUp} className={style.scroll_button}></button>)}
   </>
  )
}

export default BackToTopButton