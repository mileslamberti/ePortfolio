import React from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';


import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import Projects from "./profileComponents/projects.component";

const axios=require("axios");

export default class MyProfile extends React.Component {

    render() {
        return (
            <div className="container">
                <DP/>
                <div className="row">
                    
                    <div className="col-xl-">
                        <AboutMe/>
                    </div>
                </div>
                <div className="row">
                    <Projects/>
                </div>
            </div>
        )
    }
  }
