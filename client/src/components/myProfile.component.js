import React, {useState, useCallback} from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';

import update from 'immutability-helper'

import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import Projects from "./profileComponents/projects.component";

import EditPortfolio from "./profileComponents/editPortfolio.component";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditProject from "./profileComponents/editProject.component";

const axios=require("axios");


export default class MyProfile extends React.Component {

    

    render() {
        return (
            <div class="container">
                <DP/>
                <div class="row">
                    
                    <div class="col-xl-">
                        <AboutMe/>
                    </div>
                </div>
                <div class="row">
                    <Projects/>
                </div>
                <EditProject />
                
                
            </div>
        )
    }
  }
