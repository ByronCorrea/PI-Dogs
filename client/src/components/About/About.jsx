import React from "react";
import Perfil from "../../assets/cv.jpg";
import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.back}>
      <div className={styles.card} data-state="#about">
        <div className={styles.cardHeader}>
          <div className={styles.cardCover}></div>
          <img src={Perfil} alt="Avatar" className={styles.cardAvatar} />
          <h1 className={styles.cardFullname}>Byron Correa</h1>
          <h2 className={styles.cardJobTitle}>Full Stack Web Developer</h2>
        </div>
        <div className={styles.cardMain}>
          <div className={(styles.cardSection, styles.isActive)} id="about">
            <div className={styles.cardContent}>
              <div className={styles.cardSubtitle}>ABOUT</div>
              <p className={styles.cardDesc}>
                I'm a lover of technology, innovation and everything related to
                the IT world. Constantly learning new technologies. With
                creativity to develop the projects of the future.
              </p>
            </div>
            <div className={styles.cardSocial}>
              <a
                href="https://github.com/ByronCorrea"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/byron-correa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bx bxl-linkedin-square"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
