import React from "react";
import styles from "./button.module.css";

type ButtonProps = {
  children: string;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <>
      <button className={styles.root}>{children}</button>
    </>
  );
};

export default Button;
