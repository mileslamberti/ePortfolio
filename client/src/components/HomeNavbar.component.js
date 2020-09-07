import React, {Component} from 'react';
import { Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import logo from '../techPirates.svg';

export default class HomeNavbar extends Component{
    
    render(){
        return(
            <div>
                <Navbar bg="info" expand="sm" variant="dark">
                    <Navbar.Brand href="/">
                        <img
                        alt=""
                        src={logo}
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/myprofile">My profile</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

