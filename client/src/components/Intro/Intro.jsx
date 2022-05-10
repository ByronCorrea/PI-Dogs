import "./intro.css";
import { Link } from "react-router-dom";

import React from "react";

function Intro() {
  return (
    <div className="intro">
      <div className="contenedor">
        <div className="cara">
          <div className="message-orange">
            <p className="message-content">Love is a 4 legged word!</p>
          </div>
          <div className="cont-orejas">
            <div className="orejas oreja1">
              <div className="item"></div>
            </div>
            <div className="orejas oreja2">
              <span></span>
            </div>
          </div>
          <div className="corazon">
            <div className="linea"></div>
          </div>
          <div className="cont-ojos">
            <div className="ojos ojo1">
              <div className="ocular"></div>
            </div>
            <div className="ojos ojo2">
              <div className="ocular"></div>
            </div>
          </div>
          <div className="box-nariz">
            <div className="nariz"></div>
          </div>
          <div className="lengua"></div>
        </div>
        <div className="cuerpo">
          <div className="cuello"></div>
          <div className="patas"></div>
        </div>
      </div>
      <div className="wrap">
        <Link to="/home">
          <button className="buttonSend">Let's Guau!</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;
