import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RegistrationComponent from "./components/registration.component";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callWelcome() {
    fetch("http://localhost:9000/welcome")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callWelcome();
  }
  render() {
    return (
      <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{this.state.apiResponse}aa</h2>
      </div>
      <RegistrationComponent/>
    </div>
    );
  }
}

export default App;