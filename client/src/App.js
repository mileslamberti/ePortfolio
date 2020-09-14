import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import RegistrationComponent from "./components/registration.component";
import UploadPortfolio from "./components/uploadPortfolio.component";
import FileUpload from "./components/fileUpload.component";
=======
import HomeNavbar from "./components/homeNavbar.component";
>>>>>>> origin/master

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callWelcome() {
    fetch("http://localhost:9000/welcome")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callWelcome();
  }
  render() {
    return (
<<<<<<< HEAD
      <Router>
      <Navbar bg="light" variant='light' as="Nav">
        <Navbar.Brand  c href="#home">Tech Pirates</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>

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

      <div className="container">
                    <Route path="/register" exact component={RegistrationComponent}/>
                </div>
          <Route path="/uploadPortfolio" exact component={UploadPortfolio}/>
      </Router>
=======
      <HomeNavbar/>
>>>>>>> origin/master
      //      <Router>
      //          <div className="container">
      //              <Route path="/register" exact component={RegistrationComponent}/>
      //          </div>
      //      </Router>

    );
  }
}

export default App;