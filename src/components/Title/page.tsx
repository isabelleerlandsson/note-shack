import React from "react";
import styles from "./title.module.css";
import Link from "next/link";
import Button from "../Button/page";

const Title = () => {
  return (
    <>
      {/* <h1 className={`${styles.letter} ${styles.n}`}>N</h1>
      <h1 className={`${styles.letter} ${styles.o}`}>O</h1>
      <h1 className={`${styles.letter} ${styles.t}`}>T</h1>
      <h1 className={`${styles.letter} ${styles.e}`}>E</h1>
      <h1 className={`${styles.letter} ${styles.s}`}>S</h1>
      <h1 className={`${styles.letter} ${styles.h}`}>H</h1>
      <h1 className={`${styles.letter} ${styles.a}`}>A</h1>
      <h1 className={`${styles.letter} ${styles.c}`}>C</h1>
      <h1 className={`${styles.letter} ${styles.k}`}>K</h1> */}

      <div className={styles.note}>
        <h1>N</h1>
        <h1>O</h1>
        <h1>T</h1>
        <h1>E</h1>
      </div>
      <div className={styles.shack}>
        <h1>S</h1>
        <h1>H</h1>
        <h1>A</h1>
        <h1>C</h1>
        <h1>K</h1>
      </div>

      <Link href={"/note"}>
        <Button>Kom igång</Button>
      </Link>
    </>
  );
};

export default Title;
