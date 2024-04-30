import React from "react";
import styles from "./button.module.css";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

type ButtonProps = {
  children: string;
  type?: string;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <>
      <button className={`${styles.root} ${poppins.className}`}>
        {children}
      </button>
    </>
  );
};

export default Button;
