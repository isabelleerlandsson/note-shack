import React from "react";
import { IoIosColorWand as Color } from "react-icons/io";
import { BsLink45Deg as Link } from "react-icons/bs";
import { PiGridFourLight as Grid } from "react-icons/pi";
import { PiListChecksLight as Check } from "react-icons/pi";
import { PiImages as Upload } from "react-icons/pi";

import styles from "./editbar.module.css";

const EditBar = () => {
  return (
    <div>
      <Color className={styles.icons} title="Välj en färg" />
      <Grid className={styles.icons} title="Lägg till en tabell" />
      <Check className={styles.icons} title="Gör en checklista" />
      <Link className={styles.icons} title="Lägg till en länk" />
      <Upload className={styles.icons} title="Infoga bilaga" />
    </div>
  );
};

export default EditBar;
