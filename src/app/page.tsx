import Title from "../components/Title/page";
import styles from "./page.module.css";
import Link from "next/link";
import React from "react";

export default function App() {
  return (
    <>
      <header className={styles.header}>
        <Link href={"/login"} className={styles.login}>
          Logga in{" "}
        </Link>
        <Link href={"/create-account"} className={styles.login}>
          Skapa konto{" "}
        </Link>
      </header>
      <main className={styles.main}>
        <Title />
        <div className={styles.circle}></div>
        <div className={styles.circleTwo}></div>
      </main>
    </>
  );
}
