import React, { useState } from "react";
import style from "./index.module.css";
import { useFormik } from "formik";
import { MessageValidation } from "./message.validation";
import { PostMessage } from "../../../../api/message.requests";
import { useUserContext } from "../../../../global";
import { NavLink } from "react-router-dom";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const MessageUser = () => {
  const [user] = useUserContext();
  const [error, setError] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      comment: "",
    },
    validationSchema: MessageValidation,
    onSubmit: async (values, actions) => {
      if (user) {
        setError(false);
       await PostMessage(values);
        setTimeout(() => {
          actions.resetForm();
        }, 2000);
      }else{
        setError(true);
      }
    },
  });
  return (
    <div className={style.message} id="hero">
      <h2>ADD MESSAGE</h2>
      <form onSubmit={formik.handleSubmit} className={style.message_item}>
        <p className={style.comment}>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.comment}
            name="comment"
            cols="200"
            rows="10"
            placeholder="Comment text*"
          ></textarea>
        </p>
        <p className={style.comment}>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            type="text"
            placeholder="Name"
          />
        </p>
        <p className={style.comment}>
          <input
            onChange={formik.handleChange}
            value={formik.values.surname}
            name="surname"
            type="text"
            placeholder="Surname"
          />
        </p>
        <p className={style.comment}>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            placeholder="Email"
          />
        </p>
        <div className={style.comment}>
          <button type="submit">Submit comment</button>  { user? "" : <>{error ? (<div className={style.login_message}><p>You must be logged in <KeyboardArrowRightIcon/></p>&nbsp; &nbsp;<button><NavLink to="/login/user"><SensorOccupiedIcon/> Log In</NavLink></button></div>):(<div className={style.login_message}><button><NavLink to="/login/user"><SensorOccupiedIcon/> Log In</NavLink></button></div>)}</>}
        </div>
      </form>
    </div>
  );
};

export default MessageUser;
