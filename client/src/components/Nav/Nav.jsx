import React from "react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { FaDog } from "react-icons/fa";

export default function PageOptions() {
  return (
    <div className={styles.cont}>
      <NavLink
        activeClassName={styles.active}
        style={{ textDecoration: "none" }}
        to="/"
      >
        <div className={styles.logo}>
          {" "}
          <FaDog />
        </div>
      </NavLink>
      <NavLink
        activeClassName={styles.active}
        style={{ textDecoration: "none" }}
        to="/home"
      >
        <p>Home</p>{" "}
      </NavLink>
      <NavLink
        activeClassName={styles.active}
        style={{ textDecoration: "none" }}
        to="/create"
      >
        <p>Create</p>{" "}
      </NavLink>

      <NavLink
        activeClassName={styles.active}
        style={{ textDecoration: "none" }}
        to="/favorites"
      >
        <p>Favorites</p>{" "}
      </NavLink>

      <NavLink
        activeClassName={styles.active}
        style={{ textDecoration: "none" }}
        to="/about"
      >
        <p>About</p>{" "}
      </NavLink>
    </div>
  );
}
