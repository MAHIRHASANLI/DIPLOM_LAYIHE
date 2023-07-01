import React from 'react'
import style from "./index.module.css";

const NotFound = () => {
  return (
    <div className={style.not_found}>
        <h2>Not Found</h2>
        <p>The requested URL was not found on this server.</p>
        <hr />
        <address>Apache/2.4.41 (Ubuntu) Server at preview.colorlib.com Port 443</address>
    </div>
  )
}

export default NotFound