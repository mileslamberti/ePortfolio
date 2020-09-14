import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

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
      <HomeNavbar/>
      //      <Router>
      //          <div className="container">
      //              <Route path="/register" exact component={RegistrationComponent}/>
      //          </div>
      //      </Router>

    );
  }
}

export default App;