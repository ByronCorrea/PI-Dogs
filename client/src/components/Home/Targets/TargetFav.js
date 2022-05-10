import React, { useState } from "react";
import style from "./Target.module.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { delete_Favorites } from "../../../actions/index";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; // --rite
import loadingImg from "../../../assets/loadingDog_2.gif";

const Target = ({ props }) => {
  const [favoritoIcon, setFavoritoIcon] = useState(false);
  const dispatch = useDispatch();

  function favoriteado(id) {
    setFavoritoIcon(!favoritoIcon);
    setTimeout(() => {
      dispatch(delete_Favorites(props.id));
    }, 500);
  }

  return (
    <div key={props.id} className={style.master}>
      {props.image ? (
        <Link key={props.id} to={`/details/${props.id}`}>
          <div>
            <img src={props.image} alt="" />
          </div>
        </Link>
      ) : (
        <Link key={props.id} to={`/details/${props.id}`}>
          <div>
            <img src={loadingImg} alt="" />
          </div>
        </Link>
      )}

      <div className={style.cardDatos}>
        <div className={style.contTitulo}>
          <div className={style.cardNombre}>
            <p>{props.name}</p>
          </div>

          {favoritoIcon ? (
            <MdFavoriteBorder
              className={style.iconFav}
              onClick={() => favoriteado(props.id)}
            />
          ) : (
            <MdFavorite
              className={style.iconFav}
              onClick={() => favoriteado(props.id)}
            />
          )}
        </div>
        <div className={style.datos}>
          <div className={style.pesoAndIcon}>
            <p className={style.cardDato}>
              Weight: <span>{props.weight_min}</span>-{" "}
              <span>{props.weight_max}</span> Kg{"   "}
            </p>
            {props.userCreate ? (
              <div className={style.tooltip}>
                <div className={style.bottom}>
                  <h5>Press to delete</h5>
                </div>
              </div>
            ) : null}
          </div>
          <div className={style.temperamentos}>
            <p> {props.temperaments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Target;
