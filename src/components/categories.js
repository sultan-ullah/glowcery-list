import React from "react";

const categories = props => {
  const categories = [
    { name: "Meats", icon: "fas fa-drumstick-bite", color: "#f4aa42" },
    { name: "Bakery", icon: "fas fa-bread-slice", color: "#a9f441" },
    { name: "Produce", icon: "fas fa-carrot", color: "#f44141" },
    { name: "Household", icon: "fas fa-home", color: "#4182f4" },
    { name: "Pantry", icon: "fas fa-cookie-bite", color: "#8e7cff" },
    { name: "Dairy", icon: "fas fa-ice-cream", color: "#ffe500" }
  ];

  const container = {
    margin: "0 auto",
    maxWidth: "400px",
    color: "#EEE5E9"
  };

  const iconBackground = {
    borderRadius: "50%",
    color: "white",
    height: "30px",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20px"
  };

  const header = {
    textTransform: "uppercase",
    letterSpacing: "3px",
    textAlign: "center"
  };

  const list = {
    padding: "0"
  };

  const listItem = {
    listStyle: "none",
    background: "#353535",
    margin: "20px 0px",
    height: "50px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 10px",
    boxSizing: "border-box",
    cursor: "pointer"
  };

  return (
    <div style={container}>
      <h3 style={header}>Glowcery</h3>
      <ul style={list}>
        {categories.map((item, index) => {
          return (
            <li
              style={listItem}
              key={index}
              onClick={() => props.clickHandler(item.name)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div style={{ ...iconBackground, backgroundColor: item.color }}>
                  <i className={item.icon} />
                </div>
                {item.name}
              </div>
              <div>
                <i className="fas fa-arrow-right" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default categories;
