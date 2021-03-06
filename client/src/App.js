import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/registration.component";
import Profile from "./components/profile.component";
import UploadProject from './components/profileComponents/uploadProject.component';
import Project from './components/profileComponents/project.component';
import ProfilesPage from "./components/profilespage.component";
import { PortfolioCardProvider } from "./cardComponents/portfolioCardContext";

import InitFirebase from  "./services/initFirebase";


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
      InitFirebase();
  }
  componentDidMount() {
    this.callWelcome();
  }
  render() {
    return (
      <Router>
        <HomeNavbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profilespage" component={ProfilesPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact
            path = "/:handle" 
            render = {(props) => (
              <Profile {...props}/>
            )}
          />
          <Route exact path="/:handle/uploadProject" component={UploadProject}/>
          <Route exact 
            path="/:handle/:projectID" 
            render = {(props) => (
              <PortfolioCardProvider {...props}>
                <Project {...props}/>
              </PortfolioCardProvider>
            )}
          />  
        </Switch>
      </Router>
    );
  }
}

export default App;
