/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getById } from "../../../actions/index";
import loadingImg from "../../../assets/loadingDog_2.gif";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  let dogData = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getById(id));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  return (
    <div className={styles.contRey}>
      {loading ? (
        <div className={styles.caja}>
          <div className={styles.contImg_loading}>
            <img alt="" src={loadingImg} />
          </div>
        </div>
      ) : (
        <div className={styles.caja}>
          <div className={styles.contImg}>
            <img alt="" src={dogData.image} />
          </div>
          <div className={styles.contInfo}>
            <div className={styles.title}>{dogData.name}</div>

            <div className={styles.medidas}>
              <div className={styles.lifeSpan}>
                <div className={styles.text}>
                  Heigth: <span>{dogData.height_min}</span>-
                  <span>{dogData.height_max} Cm</span>
                </div>
              </div>
              <div className={styles.lifeSpan}>
                <div className={styles.text}>
                  Weight: <span>{dogData.weight_min}</span>-{" "}
                  <span>{dogData.weight_max} Kg</span>
                </div>
              </div>
              <div className={styles.lifeSpan}>
                <div className={styles.text}>
                  Life Span: <span>{dogData.life_span}</span>
                </div>
              </div>
            </div>
            <div className={styles.temperaments}>
              <div className={styles.temperaments}>Temperaments</div>
              <span> {dogData.temperaments}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
