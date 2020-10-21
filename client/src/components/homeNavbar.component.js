import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown } from 'react-bootstrap';

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";


const HomeNavbar = () => {

    const [currentUser, setCurrentUser] = useState("");
    const [me, setMe] = useState("");

    useEffect(() => {
      const user = AuthService.getCurrentUser();
      
      if (user) {
        setCurrentUser(user);
        if (!me){
          UserService.getMe().then(
            (me) => {
              setMe(me);
            }
          )
        }
      }

    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };
    
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Tech Pirates
        </Link>
        <div className="navbar-nav">
            <li className="nav-item">
              <Link to={"/profilespage"} className="nav-link">
                Profiles
              </Link>
            </li>
        </div>
        {currentUser ? ( // if logged in...
          <div className="navbar-nav ml-auto">
            <NavDropdown title="Account" id="basic-nav-dropdown">
            <h6>Welcome {me.handle}</h6>
                <NavDropdown.Item href="/profile">My profile</NavDropdown.Item>
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

    )
}

export default HomeNavbar;