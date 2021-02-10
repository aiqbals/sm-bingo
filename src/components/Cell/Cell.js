import React from "react";
import "./Cell.scss";

const Cell = ({ id, children, onToggle, isSet }) => {
  const classname = `tile ${isSet ? "tileset" : ""} ${
    id === "12" ? "avoid-clicks" : ""
  } `;
  //console.log(id + ' ' + classname);
  //debugger
  return (
    <div className={classname} onClick={onToggle}>
      {children}
    </div>
  );
};

export default Cell;
