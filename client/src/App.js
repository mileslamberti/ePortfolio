import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/registration.component";
import MyProfile from "./components/myProfile.component";
import UploadPortfolio from './components/profileComponents/uploadPortfolio.component';
import EditProject from './components/profileComponents/editProject.component';
import ProfilePage from "./components/profilepage.component";
import AboutThem from "./components/profileComponents/AboutThem.component";

import {PortfolioCardProvider} from "./cardComponents/portfolioCardContext"; 

//import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
//import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//import landing from './views/landing'
//import login from './views/login'
//import signup from './views/signup'
//import NavBar from './components/NavBar'
/*
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
})*/




class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return (
      <Router>
        <HomeNavbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profilepage" component={ProfilePage} />
          <div className="container mt-3">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={MyProfile} />
<<<<<<< HEAD
              <Route exact path="/edit" component={EditAboutMe}/>
              <Route exact path="/uploadPortfolio" component={UploadPortfolio}/>
              <Route exact path="/editPortfolio" render={() => <PortfolioCardProvider> <EditProject/> </PortfolioCardProvider>}/>
=======
              <Route exact path="/uploadPortfolio" exact component={UploadPortfolio}/>
              <Route exact path="/editPortfolio" exact component={EditProject}/>
>>>>>>> 2e2c750a5c8f568d3f1af1349313bb8a279982e3
              <Route 
                path = "/:handle" 
                render = {(props) => (
                  <AboutThem {...props}/>
                )}
              />  
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;