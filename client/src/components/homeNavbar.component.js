import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import RegistrationComponent from "./registration.component";
import MyProfile from "./myProfile.component";
import EditAboutMe from './profileComponents/editAboutMe.component';
import UploadPortfolio from './profileComponents/uploadPortfolio.component';


export default class HomeNavbar extends Component {
    render() {
        return (
            <Router>
                <Navbar bg="light" variant='light' as="Nav">
                    <Navbar.Brand  c href="home">Tech Pirates</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link href="/register">
                    Register
                    </Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                    <h6>Welcome 'User'</h6>
                        <NavDropdown.Item href="/myprofile">My profile</NavDropdown.Item>
                        <NavDropdown.Item href="/edit">Edit profile</NavDropdown.Item>
                        <NavDropdown.Item href="/">Account Information</NavDropdown.Item>
                        <NavDropdown.Item href="/">Account Settings</NavDropdown.Item>
                        <br></br>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Login in/Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
                <div className="container">
                    {/* <Route path="/register" exact component={RegistrationComponent}/> */}
                    <Route path="/myprofile" exact component={MyProfile}/>
                    <Route path="/edit" exact component={EditAboutMe}/>
                    <Route path="/uploadPortfolio" exact component={UploadPortfolio}/>
                </div>
            </Router>
        )
    }
}
