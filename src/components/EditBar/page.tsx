import React from "react";
import { IoColorPaletteOutline as Color } from "react-icons/io5";
import { PiGridFourLight as Grid } from "react-icons/pi";

import styles from "./edit-bar.module.css";

type EditBarProps = {
  children?: string;
  type?: string;
};

const EditBar: React.FC<EditBarProps> = ({ children }) => {
  return (
    <div className={styles.editIcons}>
      <Color />
      <Grid />
    </div>
  );
};

export default EditBar;
