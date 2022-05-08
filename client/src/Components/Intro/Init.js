import React from "react";
import "./index.css";

export function Init() {
  return (
    <div class="contenedor">
      <div class="cara">
        <div class="cont-orejas">
          <div class="orejas oreja1">
            <div class="item"></div>
          </div>
          <div class="orejas oreja2">
            <span></span>
          </div>
        </div>
        <div class="corazon">
          <div class="linea"></div>
        </div>
        <div class="cont-ojos">
          <div class="ojos ojo1">
            <div class="ocular"></div>
          </div>
          <div class="ojos ojo2">
            <div class="ocular"></div>
          </div>
        </div>
        <div class="box-nariz">
          <div class="nariz"></div>
        </div>
        <div class="lengua"></div>
      </div>
      <div class="cuerpo">
        <div class="cuello"></div>
        <div class="patas"></div>
      </div>
    </div>
  );
}

export default Init;
