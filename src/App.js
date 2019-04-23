import React from "react";

const Input = props => {
  const containerStyle = {
    marginTop: "30px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px"
  };

  const textInputStyle = {
    width: "500px",
    height: "40px",
    marginRight: "10px",
    fontSize: "20px",
    padding: "10px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    height: "40px",
    width: "100px",
    fontSize: "20px",
    border: "3px solid pink",
    backgroundColor: "white",
    borderRadius: "10px"
  };

  if (props.clearInput) {
    document.querySelector("#item").value = "";
  }

  return (
    <div style={containerStyle}>
      <input
        type="text"
        id="item"
        name="item"
        placeholder="What did you want to buy?"
        style={textInputStyle}
        onChange={props.changeHandler}
      />

      <button
        style={buttonStyle}
        onClick={props.clickHandler}
        disabled={props.empty}
      >
        Add
      </button>
    </div>
  );
};

const ListItem = props => {
  const listItemStyle = {
    listStyle: "none"
  };

  return <li style={listItemStyle}>{props.text}</li>;
};

const List = props => {
  const listStyle = {
    padding: "0"
  };

  return (
    <ul style={listStyle}>
      {props.items.map((item, index) => (
        <ListItem text={item} key={index} />
      ))}
    </ul>
  );
};

class App extends React.Component {
  state = {
    listItems: ["bananas", "milk", "cookies"],
    clearInput: false
  };

  clickHandler() {
    this.setState({
      listItems: [this.state.item, ...this.state.listItems],
      item: "",
      clearInput: true
    });
  }

  changeHandler(e) {
    this.setState({
      item: e.target.value,
      clearInput: false
    });
  }

  render = () => {
    return (
      <div className="App">
        <Input
          changeHandler={this.changeHandler.bind(this)}
          clickHandler={this.clickHandler.bind(this)}
          clearInput={this.state.clearInput}
          empty={!this.state.item}
        />
        <List items={this.state.listItems} />
      </div>
    );
  };
}
export default App;
