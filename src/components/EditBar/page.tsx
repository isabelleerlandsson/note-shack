import React, { useState } from "react";
import { IoIosColorWand as Color } from "react-icons/io";
import { BsLink45Deg as Link } from "react-icons/bs";
import { PiGridFourLight as Grid } from "react-icons/pi";
import { PiListChecksLight as Check } from "react-icons/pi";
import { PiImages as Upload } from "react-icons/pi";

import styles from "./editbar.module.css";

const EditBar = ({ onColorChange, noteId }) => {
  const [selectedColor, setSelectedColor] = useState();

  const changeColor = (color) => {
    setSelectedColor(color);
    onColorChange(noteId, color);
  };

  const colorOptions = [
    { value: "#f5b6da" },
    { value: "#E1BEE7" },
    { value: "#BBDEFB" },
    { value: "#ade8b5" },
    { value: "#FFF9C4" },
    { value: "#FFE0B2" },
  ];

  return (
    <div>
      <div className={styles.dropdown}>
        <Color className={styles.icons} title="Välj en färg" />
        <div className={styles.dropdownContent}>
          {colorOptions.map((option) => (
            <div
              key={option.value}
              className={styles.colorOption}
              style={{ backgroundColor: option.value }}
              onClick={() => changeColor(option.value)}
            ></div>
          ))}
        </div>
      </div>
      <Grid className={styles.icons} title="Lägg till en tabell" />
      <Check className={styles.icons} title="Gör en checklista" />
      <Link className={styles.icons} title="Lägg till en länk" />
      <Upload className={styles.icons} title="Infoga bilaga" />
    </div>
  );
};

export default EditBar;
