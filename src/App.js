import React from "react";
import Categories from "./components/categories";
import List from "./components/list";

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
