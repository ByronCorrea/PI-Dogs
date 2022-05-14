/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import loafingimg2 from "../../assets/loadingDog_2.gif";
import { useSelector, useDispatch } from "react-redux";
import loadingImg from "../../assets/dog-mitchells-vs-machines.gif";

import Target from "./Targets/Target";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getDogs,
  getDogsCreateByUser,
  getTemperaments,
  getDogsForApi,
  getDogsForTemperament,
  getByBreed,
  deleteDog,
  delete_Favorites,
  clearBreeds,
} from "../../actions/index";

import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

const Home = () => {
  //me traigo el estado de mi action con useSelector
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [paginado, setPaginado] = useState([0, 7]);

  let alldogs = useSelector((state) => state.dogs);

  const allTemperaments = useSelector((state) => state.temperaments);

  function act() {
    setLoading(true);
    setPaginado([0, 7]);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function deleteAndBack(id) {
    deleteDog(id, dispatch);
    dispatch(delete_Favorites(id));
    act();
  }

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

  function handleOrder(e) {
    switch (e.target.value) {
      case "DESC":
        alldogs = alldogs.sort((b, a) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        act();
        break;
      case "ASC":
        alldogs = alldogs.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        act();
        break;
      case "weight_min":
        alldogs = alldogs.sort((a, b) => {
          if (Number(a.weight_min) > Number(b.weight_min)) return 1;
          if (Number(a.weight_min) < Number(b.weight_min)) return -1;
          return 0;
        });
        act();
        break;
      case "weight_max":
        alldogs = alldogs.sort((b, a) => {
          if (Number(a.weight_max) > Number(b.weight_max)) return 1;
          if (Number(a.weight_max) < Number(b.weight_max)) return -1;
          return 0;
        });
        act();
        break;
      case "All":
        dispatch(getDogs());
        act();
        break;
      case "true":
        dispatch(getDogsCreateByUser());
        act();
        break;

      case "false":
        dispatch(getDogsForApi());
        act();
        break;
      default:
        break;
    }
    act();
  }

  function handleTemperament(e) {
    console.log(e.target.value);

    dispatch(getDogsForTemperament(e.target.value));
  }

  function searchByInput(e) {
    dispatch(getByBreed(e));
  }

  function submiteado() {
    let el = document.getElementById("input_1");

    searchByInput(el.value);
  }

  function handleReset(e) {
    e.preventDefault();
    dispatch(clearBreeds());
    dispatch(getDogs());
    act();
  }

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());

    //para q se vea el gif de loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.divRey}>
      <div className={styles.contInputs}>
        <div className={styles.divBuscador}>
          <input
            autoComplete="off"
            id="input_1"
            type="text"
            placeholder="Search by breed"
            className={styles.input}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchByInput(e.target.value);

                e.target.value = "";
                act();
              }
            }}
          />
          <button
            className={styles.iconEnter}
            onClick={() => {
              submiteado();
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className={styles.contFiltros}>
        <select onChange={(e) => handleOrder(e)}>
          <option value="All">All</option>
          <option value="false">Real</option>
          <option value="true">Created</option>
        </select>

        <select onChange={(e) => handleOrder(e)}>
          <option value="x">Order</option>
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="weight_min">Weight min</option>
          <option value="weight_max">Weight max</option>
        </select>

        <select
          onChange={(e) => {
            handleTemperament(e);
          }}
        >
          {allTemperaments &&
            allTemperaments.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
        </select>
        <button
          className={styles.reset}
          onClick={(e) => {
            handleReset(e);
          }}
        >
          Reset
        </button>
      </div>

      <div className={styles.contRey}>
        {loading ? (
          <div className={styles.loadingCont}>
            <img src={loadingImg} alt="" />
          </div>
        ) : alldogs.length ? (
          alldogs.map((el, index) =>
            index >= paginado[0] && index <= paginado[1] && el.id ? (
              el.userCreate === true ? (
                <div key={el.id}>
                  <Target props={el} key={el.id} />
                  <div className={styles.tacho}>
                    <span
                      className={styles.iconDelete}
                      onClick={() => deleteAndBack(el.id)}
                    >
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                </div>
              ) : (
                <Target props={el} key={el.id} />
              )
            ) : null
          )
        ) : (
          <div>
            <img src={loafingimg2} alt="img" />
            <h1 className={styles.no}>¡Connection error!</h1>
          </div>
        )}
      </div>

      <div className={styles.contFiltros}>
        {paginado[0] === 0 ? (
          <HiArrowCircleLeft
            className={styles.arowButtonLeft}
            style={{ color: "transparent" }}
            onClick={() => handlerClick("left")}
          />
        ) : (
          <HiArrowCircleLeft
            className={styles.arowButtonLeft}
            onClick={() => handlerClick("left")}
          />
        )}

        {paginado[1] >= alldogs.length ? (
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
