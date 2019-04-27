import React from "react";
import ls from "local-storage";

const Input = props => {
  const container = {
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const inputStyle = {
    width: "150px",
    height: "30px",
    padding: "0",
    borderRadius: "10px",
    border: "none",
    paddingLeft: "10px",
    fontSize: "0.9em"
  };

  const icon = {
    cursor: 'pointer'
  }

  if (props.clearInput) {
    document.querySelector('#item').value = '';
  }

  return (
    <div style={container}>
      <i className="fas fa-arrow-left" onClick={props.backButtonHandler} style={icon}/>
      <input
        type="text"
        style={inputStyle}
        id="item"
        name="item"
        onChange={props.changeHandler}
        placeHolder="Enter an item"
      />
      <i className="fas fa-plus-circle" onClick={props.clickHandler} style={icon}/>
    </div>
  );
};

const ListItem = props => {
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
    <div style={container} >
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

class List extends React.Component {
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
      ...this.state,
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
      ...this.state,
      input: e.target.value,
      clearInput: false
    });
  }

  onDeleteHandler(index) {
    console.log(index);
    let arr = this.state.list;
    arr.splice(index, 1);
    this.setState({
      ...this.state,
      list: arr
    });
    ls.set(this.props.name, arr);
  }

  onDoneHandler(index) {
    let arr = this.state.list;
    arr[index].done = !arr[index].done;
    this.setState({
      ...this.state,
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

    const backButton = {
      cursor: "pointer",
      position: "absolute",
      top: "20px"
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

const Categories = props => {
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
    maxWidth: "250px",
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
    fontWeight: "bold",
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "categories",
    };
  }

  categoriesClickHandler(name) {
    this.setState({
      view: "list",
      current: {
        name: name,
        list: []
      }
    });
  }

  backButtonHandler() {
    this.setState({
      ...this.state,
      view: "categories"
    });
  }

  render = () => {
    let activeView = null;
    if (this.state.view === "list") {
      activeView = (
        <div>
          <List
            name={this.state.current.name}
            list={this.state.current.list}
            backButtonHandler={this.backButtonHandler.bind(this)}
          />
        </div>
      );
    } else if (this.state.view === "categories") {
      activeView = (
        <Categories clickHandler={this.categoriesClickHandler.bind(this)} />
      );
    }

    return <div className="App">{activeView}</div>;
  };
}
export default App;
