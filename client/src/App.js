import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import RegistrationComponent from "./components/Register.component";
import HomeComponent from "./components/Home.component";
import HomeNavbar from "./components/HomeNavbar.component";
import LoginComponent from "./components/Login.component";
import MyProfile from "./components/MyProfile.component";

import { Navbar } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callWelcome() {
    fetch("http://localhost:9000/welcome")
      .then(res => console.log(res.text()))
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