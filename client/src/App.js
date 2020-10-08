import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

//import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//import landing from './views/landing'
//import login from './views/login'
//import signup from './views/signup'
//import NavBar from './components/NavBar'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e53935',
    },
    secondary: {
      main: '#b39ddb',
    },
  },
  typography : {
    useNextVariants: true
  }
})




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

  componentDidMount() {
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