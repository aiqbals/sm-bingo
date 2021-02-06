import React from 'react';

import './Cell.css';

const Cell = ({ children, onToggle, isSet }) => {
  return (
    <div 
      className={ `tile ${isSet ? "tile--set" : ""}` } 
      onClick={onToggle}>

        {children}

    </div>
  );
}

export default Cell;