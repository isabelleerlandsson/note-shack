import Title from "../components/Title/page";
import styles from "./page.module.css";
import Link from "next/link";
import React from "react";
import Button from "@/components/Button/page";

export default function App() {
  return (
    <>
      <header className={styles.header}>
        <Link href={"/login"} className={styles.login}>
          <Button>Logga in</Button>
        </Link>
        <Link href={"/create-account"} className={styles.login}>
          <Button>Skapa konto</Button>
        </Link>
      </header>
      <main className={styles.main}>
        <Title />
        <div className={styles.circle}></div>
        <div className={styles.circleTwo}></div>
        <Link className={styles.link} href={"/note"}>
          <Button>Kom igång</Button>
        </Link>
      </main>
    </>
  );
}
