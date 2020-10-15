import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/registration.component";
import MyProfile from "./components/myProfile.component";
import UploadProject from './components/profileComponents/uploadProject.component';
import EditProject from './components/profileComponents/editProject.component';
import ProfilePage from "./components/profilepage.component";
import AboutThem from "./components/profileComponents/AboutThem.component";

<<<<<<< HEAD
import InitFirebase from  "./services/initFirebase";
import {PortfolioCardProvider} from "./cardComponents/portfolioCardContext"; 

=======
import {PortfolioCardProvider} from "./cardComponents/portfolioCardContext";
import InitFirebase from  "./services/initFirebase";
>>>>>>> girish
//import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//import landing from './views/landing'
//import login from './views/login'
//import signup from './views/signup'
//import NavBar from './components/NavBar'
<<<<<<< HEAD
/*
=======

>>>>>>> girish
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
<<<<<<< HEAD
=======
  
>>>>>>> girish
  callWelcome() {

      InitFirebase();
  }
<<<<<<< HEAD
  componentDidMount() {
    this.callWelcome();
  }
=======

>>>>>>> girish
  render() {
    return (
      <Router>
        <HomeNavbar/>
        <Switch>
          <Route exact path="/" component={Home} />
<<<<<<< HEAD
          <Route exact path="/profilespage" component={ProfilePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/uploadProject" component={UploadProject}/>
          <Route exact path="/editProject" render={() => <PortfolioCardProvider> <EditProject/> </PortfolioCardProvider>}/>

          <Route 
            path = "/:handle" 
            render = {(props) => (
              <AboutThem {...props}/>
            )}
          />   
=======
          <Route exact path="/profilepage" component={ProfilePage} />
          <div className="container mt-3">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={MyProfile} />
              <Route exact path="/uploadPortfolio" component={UploadProject}/>
              <Route exact path="/editPortfolio" render={() => <PortfolioCardProvider> <EditProject/> </PortfolioCardProvider>}/>
              <Route 
                path = "/:handle" 
                render = {(props) => (
                  <AboutThem {...props}/>
                )}
              />  
          </div>
>>>>>>> girish
        </Switch>
      </Router>
    );
  }
}

export default App;
