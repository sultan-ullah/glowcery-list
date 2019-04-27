import React from "react";

const listItem = props => {
  const item = {
    listStyle: "none",
    padding: "0",
    textDecoration: props.done ? "line-through" : "none",
    cursor: "pointer"
  };

  const container = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: "15px"
  };

  const checkMark = {
    visibility: props.done ? "visible" : "hidden",
    color: "#51ba3f",
    cursor: "pointer"
  };

  const deleteIcon = {
    cursor: "pointer",
    color: "#f44e42"
  };

  return (
    <div style={container}>
      <i
        style={checkMark}
        className="fas fa-check"
        onClick={() => props.onDoneHandler(props.index)}
      />
      <li style={item} onClick={() => props.onDoneHandler(props.index)}>
        {props.text}
      </li>
      <i
        style={deleteIcon}
        className="far fa-trash-alt"
        onClick={() => props.onDeleteHandler(props.index)}
      />
    </div>
  );
};

export default listItem;
