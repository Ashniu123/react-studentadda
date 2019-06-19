import React from 'react';

import './SetItem.css';

const SetItem = (props) => {
  return (
    <div className="setitem d-flex mx-4 my-4" style={{ backgroundColor: props.color }}>
      <div className="fa fa-pencil-square-o setoptions" onClick={props.onEdit} />
      <div className="mx-auto my-auto d-block settitle" onClick={props.onOpen}>
        {props.title}
      </div>
    </div>
  );
};

export default SetItem;
