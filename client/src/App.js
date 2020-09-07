import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import RegistrationComponent from "./components/registration.component";
import HomeComponent from "./components/home.component";
import HomeNavbar from "./components/homeNavbar.component";
import LoginComponent from "./components/login.component";
import MyProfile from "./components/myProfile.component";


import { Navbar } from 'react-bootstrap';

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
      <Router>
          <div className="container">
              <Route path="/register" exact component={RegistrationComponent}/>
          </div>
        
      </Router>
    );
  }
}

export default App;