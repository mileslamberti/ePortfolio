import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown } from "react-bootstrap";
import axios from "../api";
import {
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core/";

import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";
import UserService from "../services/user.service";

const HomeNavbar = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [me, setMe] = useState("");
  const [priv, setPriv] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if (!me) {
        UserService.getMe().then((me) => {
          setMe(me);
          setPriv(me.private);
          // This is for when a user doesn't have the private field in credentials (old users)
          if (!me.private) {
            axios.post(
              "/private",
              { private: false },
              { headers: authHeader() }
            );
            setPriv(false);
          }
        });
      }
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  const togglePriv = () => {
    setPriv(!priv);
    axios.post("/private", { private: !priv }, { headers: authHeader() });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isPriv = () => {
    if (priv) {
      return "Your profile is hidden!";
    } else {
      return "Your profile is public!";
    }
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
            <div class="dropdown-header">Welcome {me.handle}</div>
            <NavDropdown.Item href={"/" + me.handle}>
              My profile
            </NavDropdown.Item>
            <NavDropdown.Item href={"/" + me.handle + "/uploadProject"}>
              Upload project
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleClickOpen}>
              Configure privacy
            </NavDropdown.Item>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Hide profile?</DialogTitle>
              <DialogContent>
                <DialogContentText>{isPriv()}</DialogContentText>
                <Switch checked={priv} onChange={togglePriv} />
                <DialogContentText>
                  Feeling a bit shy? By having your profile hidden it prevents
                  others from seeing it.
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={logOut}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      ) : (
        // if not logged in...
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
  );
};

export default HomeNavbar;
