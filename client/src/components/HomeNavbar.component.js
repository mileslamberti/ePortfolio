import React, {Component} from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class HomeNavbar extends Component{
    
    render(){
        return(
            <div>
                <Navbar bg="light" variant='light' as="Nav">
                    <Navbar.Brand  c href="#home">Tech Pirates</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link href="/register">
                        Register
                    </Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                        <h6>Welcome 'User'</h6>
                        <NavDropdown.Item href="/">Account Information</NavDropdown.Item>
                        <NavDropdown.Item href="/">Account Settings</NavDropdown.Item>
                        <br></br>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Login in/Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>
        )
    }
}

