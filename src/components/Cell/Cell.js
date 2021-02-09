import React from 'react';

import './Cell.scss';

const Cell = ({ id, children, onToggle, isSet, id12 }) => {
  return (
    <div 
      className={ `tile ${ isSet ? "tileset" : ""}` } 
      onClick={onToggle}>
        {children}
    </div>
  );
}

export default Cell;