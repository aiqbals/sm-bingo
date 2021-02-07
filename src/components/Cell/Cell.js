import React from 'react';

import './Cell.scss';

const Cell = ({ children, onToggle, isSet }) => {
  return (
    <div 
      className={ `tile ${isSet ? "tileset" : ""}` } 
      onClick={onToggle}>

        {children}

    </div>
  );
}

export default Cell;