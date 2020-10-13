import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomeNavbar from "./components/homeNavbar.component";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Register from "./components/registration.component";
import MyProfile from "./components/myProfile.component";
import EditAboutMe from './components/profileComponents/editAboutMe.component';
import EditProject from './components/profileComponents/editProject.component';
import ProfilePage from "./components/profilepage.component";
import AboutThem from "./components/profileComponents/AboutThem.component";

import FirebaseUploader from './components/profileComponents/firebaseUploader.component';
import UploadPortfolio from "./components/profileComponents/uploadProject.component";

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
          <Route exact path="/profilepage" exact component={ProfilePage} />
          <Route exact path="/login" exact component={Login} />
          <Route exact path="/register" exact component={Register} />
          <Route exact path="/profile" exact component={MyProfile} />
          <Route exact path="/edit" exact component={EditAboutMe}/>
          <Route exact path="/uploadportfolio" exact component={UploadPortfolio}/>
          <Route exact path="/editportfolio" exact component={EditProject}/>
          <Route 
            path = "/:handle" 
            render = {(props) => (
              <AboutThem {...props}/>
            )}
          />  
        </Switch>
      </Router>
    );
  }
}

export default App;