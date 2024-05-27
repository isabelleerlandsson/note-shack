import React from "react";
import Button from "@/components/Button/page";
import styles from "./navbar.module.css";
import Link from "next/link";
import Logo from "@/assets/images/logo.svg";

const Navbar = () => {
  // LOG OUT
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <div className={styles.root}>
        <img src={Logo.src} alt="Logo" className={styles.logo} />
        <Link href={"/"} onClick={handleLogout}>
          <Button>Logga ut</Button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
