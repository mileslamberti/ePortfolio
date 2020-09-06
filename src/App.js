import React, { Component } from "react";
import "./App.css";

import Profiles from "./components/Profiles";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Profiles</h1>
        <div className="header-bar" />
        <app-profiles />
        <Profiles />
      </div>
    );
  }
}

export default App;
