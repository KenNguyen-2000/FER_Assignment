import "./App.css";
// import { Navbar, NavbarBrand } from "reactstrap";
// import Menu from "./components/MenuComponent";
// import { DISHES } from "./shared/dish";
import { Component } from "react";
import Main from "./components/MainComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
