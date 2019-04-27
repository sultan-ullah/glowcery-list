import React from "react";
import ListItem from "./listItem";
import Input from "./input";
import ls from "local-storage";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      list: ls.get(props.name) || [],
      clearInput: false
    };
    ls.set(props.name, this.state.list);
  }

  onSaveHandler() {
    if (!this.state.input) return;
    this.setState({
      list: [
        ...this.state.list,
        {
          name: this.state.input,
          done: false
        }
      ],
      input: "",
      clearInput: true
    });
    ls.set(this.props.name, [
      ...this.state.list,
      {
        name: this.state.input,
        done: false
      }
    ]);
  }

  onChangeHandler(e) {
    this.setState({
      input: e.target.value,
      clearInput: false
    });
  }

  onDeleteHandler(index) {
    let arr = this.state.list;
    arr.splice(index, 1);
    this.setState({
      list: arr
    });
    ls.set(this.props.name, arr);
  }

  onDoneHandler(index) {
    let arr = this.state.list;
    arr[index].done = !arr[index].done;
    this.setState({
      list: arr
    });
    ls.set(this.props.name, arr);
  }

  render() {
    const container = {
      margin: "0 auto",
      maxWidth: "250px",
      color: "#EEE5E9",
      position: "relative"
    };

    const heading = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };

    const list = {
      padding: "0",
      width: "100%",
      textAlign: "center",
      borderRadius: "10px",
      backgroundColor: "#353535",
      boxSizing: "border-box",
      paddingTop: "15px",
      minHeight: "200px"
    };
    
    return (
      <div style={container}>
        <div style={heading}>
          <h3>{this.props.name}</h3>
          <div />
        </div>

        <Input
          changeHandler={this.onChangeHandler.bind(this)}
          clickHandler={this.onSaveHandler.bind(this)}
          backButtonHandler={this.props.backButtonHandler.bind(this)}
          clearInput={this.state.clearInput}
        />
        <ul style={list}>
          {this.state.list.map((item, index) => {
            return (
              <ListItem
                key={index}
                index={index}
                text={item.name}
                done={item.done}
                onDeleteHandler={this.onDeleteHandler.bind(this)}
                onDoneHandler={this.onDoneHandler.bind(this)}
              />
            );
          })}
        </ul>
        <small>*Click on an item to cross it out</small>
      </div>
    );
  }
}
