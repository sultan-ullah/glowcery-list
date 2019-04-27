import React from "react";

const input = props => {
  const container = {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const inputStyle = {
    width: "250px",
    height: "30px",
    padding: "0",
    borderRadius: "10px",
    border: "none",
    paddingLeft: "10px",
    margin: '0px 20px',
    fontSize: '0.7em'
  };

  const icon = {
    cursor: "pointer"
  };

  if (props.clearInput) {
    document.querySelector("#item").value = "";
  }

  return (
    <div style={container}>
      <i
        className="fas fa-arrow-left"
        onClick={props.backButtonHandler}
        style={icon}
      />
      <input
        type="text"
        style={inputStyle}
        id="item"
        name="item"
        onChange={props.changeHandler}
        placeHolder="Enter an item"
      />
      <i
        className="fas fa-plus-circle"
        onClick={props.clickHandler}
        style={icon}
      />
    </div>
  );
};

export default input;
