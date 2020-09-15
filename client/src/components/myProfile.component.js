import React from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';


import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import UploadProject from "./profileComponents/uploadProject.component";
import Projects from "./profileComponents/projects.component";

const axios=require("axios");

export default class MyProfile extends React.Component {

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-xs">
                        <DP/>
                    </div>
                    <div class="col-xl-">
                        <AboutMe/>
                    </div>
                </div>
                <div class="row">
                    <UploadProject/>
                </div>
                <div class="row">
                    <Projects/>
                </div>
            </div>
        )
    }
  }
