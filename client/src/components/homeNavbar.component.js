import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';

import AuthService from "../services/auth.service";

import Home from "./home.component";
import Login from "./login.component";
import Register from "./registration.component";
import MyProfile from "./myProfile.component";
import EditAboutMe from './profileComponents/editAboutMe.component';
import UploadPortfolio from './profileComponents/uploadPortfolio.component';
import EditProject from './profileComponents/editProject.component';
import ProfilePage from "./profilepage.component";

const  HomeNavbar = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };
    
    return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Tech Pirates
        </Link>
        <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/profilepage"} className="nav-link">
                Profiles
              </Link>
            </li>
          </div>
        {currentUser ? ( // if logged in...
          <div className="navbar-nav ml-auto">
            <NavDropdown title="Account" id="basic-nav-dropdown">
            <h6>Welcome 'User'</h6>
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
                <NavDropdown.Item href="/edit">Edit profile</NavDropdown.Item>
                <NavDropdown.Item href="/">Account Information</NavDropdown.Item>
                <NavDropdown.Item href="/">Account Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={logOut}>Log Out</NavDropdown.Item>
              </NavDropdown>
          </div>
        ) : ( // if not logged in...
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <Route exact path="/" component={Home} />
      <Route exact path="/profilepage" component={ProfilePage} />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/edit" exact component={EditAboutMe}/>
          <Route exact path="/uploadPortfolio" exact component={UploadPortfolio}/>
          <Route exact path="/editPortfolio" exact component={EditProject}/>
        </Switch>
      </div>
    </Router>
    )
}

export default HomeNavbar;