import * as React from "react";
import { GetAllGallery } from "../../../../api/gallery.requests";
import style from "./index.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../../../../global";

const GalleryUser = () => {
  const [user] = useUserContext();
  const [gallery, setGallery] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
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
      if (aa.className.includes("gallery")) {
        aa.classList.remove("gallery");
      }
      document.querySelector(".gallery")?.classList.remove("gallery");
      btn.classList.add("gallery");
    });
  });

  return (
    <div className={style.gallery_user}>
      <div className={style.btns}>
        <button
          id="aa"
          onClick={(e) => handleClick(e)}
          className="btn gallery"
          data-aos="fade-up"
        >
          All
        </button>
        <button
          data-aos="fade-up"
          onClick={(e) => handleClick(e)}
          value="human"
          className="btn"
        >
          Human
        </button>
        <button
          data-aos="fade-up"
          onClick={(e) => handleClick(e)}
          value="nature"
          className="btn"
        >
          Nature
        </button>
        <button
          data-aos="fade-up"
          onClick={(e) => handleClick(e)}
          value="country"
          className="btn"
        >
          Country
        </button>
        <button
          data-aos="fade-up"
          onClick={(e) => handleClick(e)}
          value="video"
          className="btn"
        >
          Video
        </button>
      </div>

      <div className={style.container}>
        <div className={style.media_container}>
          {gallery &&
            gallery.map((file) => {
              return (
                <div className={style.media} key={file._id} data-aos="fade-up">
                  <i
                    onClick={() => {
                      if (user) {
                        const localParse = JSON.parse(
                          localStorage.getItem("fawori")
                        );
                        const findLocal = localParse.find(
                          (img) => img === file.url
                        );
                        if (!findLocal) {
                          localParse.push(file.url);
                          localStorage.setItem(
                            "fawori",
                            JSON.stringify(localParse)
                          );
                          Swal.fire({
                            position: "center-end",
                            icon: "success",
                            title: "Fawori successfully!!",
                            showConfirmButton: false,
                            timer: 800,
                            width: 250,
                          });
                        }
                      } else {
                        Swal.fire({
                          position: "center-end",
                          icon: "error",
                          title: "You're not logged in!!",
                          showConfirmButton: false,
                          timer: 800,
                          width: 250,
                        });
                      }
                    }}
                    className="fa-solid fa-heart-circle-plus"
                  ></i>
                  <img src={file.url} alt={file.category} />
                  <span onClick={() => setFile(file)}>+</span>
                </div>
              );
            })}
        </div>

        <div
          className={style.popup_media}
          style={{ display: file ? "block" : "none" }}
        >
          <span onClick={() => setFile(null)}>&times;</span>
          {<img src={file?.url} alt={file?.category} />}
        </div>
      </div>

      <button type="button" className={style.btn_2}>View More</button>
    </div>
  );
};

export default GalleryUser;
