import React from "react";
import styles from "./title.module.css";
import { Shadows_Into_Light, Tajawal } from "next/font/google";

const shadows_into_light = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
});

const tajawal = Tajawal({
  subsets: ["latin"],
  weight: ["400"],
});

const Title = () => {
  return (
    <>
      <div className={`${styles.note} ${shadows_into_light.className}`}>
        <h1>N</h1>
        <h1>O</h1>
        <h1>T</h1>
        <h1>E</h1>
      </div>
      <div className={`${styles.shack} ${tajawal.className}`}>
        <h1>S</h1>
        <h1>H</h1>
        <h1>A</h1>
        <h1>C</h1>
        <h1>K</h1>
      </div>
    </>
  );
};

export default Title;
