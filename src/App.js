import React from "react";
import ls from 'local-storage';

const Input = props => {

  return (
    <div>
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
    listStyle: "none",
    display: 'inline'
  };

  return <div><span>x</span><li style={listItemStyle}>{props.text}</li></div>;
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      name: props.name,
      list: props.list
    };
    if (!ls.get(props.name)) {
      ls.set(props.name, []);
    }
  }

  onSaveHandler() {
    this.setState({
      ...this.state,
      list: [...this.state.list, this.state.input]
    })
    ls.set(this.state.name, [...this.state.list, this.state.input])
    
  }

  onChangeHandler(e) {
    this.setState({
      ...this.state,
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h4>{this.state.name}</h4>
        <Input
          changeHandler={this.onChangeHandler.bind(this)}
          clickHandler={this.onSaveHandler.bind(this)}
        />
        <ul>
          {ls.get(this.state.name).map((item, index) => {
            return <ListItem key={index} text={item}/>;
          })}
        </ul>
      </div>
    );
  }
}

const Categories = props => {
  const categories = [
    "Meat & Poultry",
    "Bakery",
    "Produce",
    "Household",
    "Clothing"
  ];

  return (
    <div>
      <h4 style={{ marginBottom: "10px" }}>Categories</h4>
      <ul>
        {categories.map((item, index) => {
          return (
            <li key={index} onClick={props.clickHandler}>
              {item}
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

  categoriesClickHandler(e) {
    this.setState({
      view: "list",
      current: {
        name: e.target.innerText,
        list: []
      }
    });
  }

  backButtonHandler() {
    console.log(ls.get(this.state.current.name));
    this.setState ({
      ...this.state,
      view: "categories",
    });
  }

  render = () => {
    let activeView = null;
    if (this.state.view === "search") {
      activeView = <h1>Search View</h1>;
    } else if (this.state.view === "list") {
      activeView = (
        <List name={this.state.current.name} list={this.state.current.list} />
      );
    } else if (this.state.view === "categories") {
      activeView = (
        <Categories clickHandler={this.categoriesClickHandler.bind(this)} />
      );
    }

    return <div className="App">
    <button onClick={this.backButtonHandler.bind(this)} >go back</button>
    {activeView}
    </div>;
  };
}
export default App;
