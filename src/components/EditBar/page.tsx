import React from "react";
import { IoColorPaletteOutline as Color } from "react-icons/io5";
import { PiGridFourLight as Grid } from "react-icons/pi";

type EditBarProps = {
  children?: string;
  type?: string;
};

const EditBar: React.FC<EditBarProps> = ({ children }) => {
  return (
    <div>
      <Color />
      <Grid />
    </div>
  );
};

export default EditBar;
