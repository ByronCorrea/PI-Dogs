/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Favorites.module.css";

import { useSelector, useDispatch } from "react-redux";
import loafingimg2 from "../../assets/loadingDog_2.gif";
import loadingImg from "../../assets/dog-mitchells-vs-machines.gif";

import TargetFav from "../Home/Targets/TargetFav";
import { get_Favorites } from "../../actions/index";

import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

const Home = () => {
  //me traigo el estado de mi action con useSelector
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [paginado, setPaginado] = useState([0, 7]);

  let favoritesDogs = useSelector((state) => state.favorites);

  function handlerClick(e) {
    if (e === "right") {
      let num_1 = paginado[0] + 8;
      let num_2 = paginado[1] + 8;
      setPaginado([num_1, num_2]);
    } else {
      let num_1 = paginado[0] - 8;
      let num_2 = paginado[1] - 8;
      if (num_1 < 0) {
        num_1 = 0;
        num_2 = 7;
      }
      setPaginado([num_1, num_2]);
    }
  }

  useEffect(() => {
    dispatch(get_Favorites());

    //para q se vea el gif de loading
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return (
    <div className={styles.divRey}>
      <div className={styles.contInputs}></div>
      <div className={styles.contFiltros}></div>

      <div className={styles.contRey}>
        {loading ? (
          <div className={styles.loadingCont}>
            <img src={loadingImg} alt="" />
          </div>
        ) : favoritesDogs.length ? (
          favoritesDogs.map((el, index) =>
            index >= paginado[0] && index <= paginado[1] && el.id ? (
              el.userCreate === true ? (
                <div key={el.id}>
                  <TargetFav props={el} key={el.id} />
                </div>
              ) : (
                <TargetFav props={el} key={el.id} />
              )
            ) : null
          )
        ) : (
          <div>
            <img src={loafingimg2} alt="img" />
          </div>
        )}
      </div>

      <div className={styles.contFiltros}>
        {paginado[0] === 0 ? (
          <HiArrowCircleLeft
            className={styles.arowButtonLef}
            style={{ color: "transparent" }}
            onClick={() => handlerClick("left")}
          />
        ) : (
          <HiArrowCircleLeft
            className={styles.arowButtonLef}
            onClick={() => handlerClick("left")}
          />
        )}

        {paginado[1] >= favoritesDogs.length ? (
          <HiArrowCircleRight
            className={styles.arowButton}
            style={{ color: "transparent" }}
            onClick={() => handlerClick("right")}
          />
        ) : (
          <HiArrowCircleRight
            className={styles.arowButton}
            onClick={() => handlerClick("right")}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
