import React from "react";
import ls from "local-storage";

const Input = props => {

  const container = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100px',
    width: '200px',
    backgroundColor: 'pink'
  }


  return (
    <div style={container}>
      <input
        type="text"
        id="item"
        name="item"
        placeholder="What did you want to buy?"
        onChange={props.changeHandler}
      />

      <button onClick={props.clickHandler}>Add</button>
    </div>
  );
};

const ListItem = props => {
  const listItemStyle = {
    listStyle: "none"
  };

  return <li style={listItemStyle}>{props.text}</li>;
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      list: ls.get(props.name) || []
    };
    ls.set(props.name, this.state.list);
  }

  onSaveHandler() {
    console.log(this.state.list);
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        {
          name: this.state.input,
          done: false
        }
      ]
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
      input: e.target.value
    });
  }

  render() {
    const container = {
      margin: "0 auto",
      maxWidth: "250px",
      color: "#EEE5E9"
    };

    const heading = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    };

    const title = {};

    const backButton = {
      cursor: "pointer"
    };

    return (
      <div style={container}>
        <div style={heading}>
          <i
            onClick={this.props.backButtonHandler}
            style={{ marginRight: "10px" }}
            className="fas fa-arrow-left"
          />
          <h3>{this.props.name}</h3>
          <i className="fas fa-plus-circle" />
        </div>
        <Input
          changeHandler={this.onChangeHandler.bind(this)}
          clickHandler={this.onSaveHandler.bind(this)}
        />
        <ul>
          {this.state.list.map((item, index) => {
            return <ListItem key={index} text={item.name} />;
          })}
        </ul>
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
    backgroundColor: "pink",
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
      <h3 style={header}>Categories</h3>
      <ul style={list}>
        {categories.map((item, index) => {
          return (
            <li style={listItem} key={index} onClick={() => props.clickHandler(item.name)}>
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
      view: "categories"
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
