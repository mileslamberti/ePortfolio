import React from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';
import './myprofile.component.css';
import img from './random.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import UserInfo from "./profileComponents/userInfo.component";
import Experience from "./profileComponents/experience.component";
import Education from "./profileComponents/education.component";
import Projects from "./profileComponents/projects.component";
import Tags from "./profileComponents/tags.component";
import Tabs from "../components/tabs.component";
import FindUser from "./profileComponents/findUser.component";

export default class MyProfile extends React.Component {

    render() {
        return (
        <div>
            <div class="profile">
                <div class="profile_left">
                    <div class="img_here">
                        {/* <img src={img} alt= "profile pic" height={300} width={300} /> */}
                        <DP/>
                    </div>
                    <div class="profile_content">
                        <div class="profile_item profile_info">
                            <div class="title">
                            <p class="bold">Name</p>
                            <p class="regular">Occupation</p>
                            </div>
                            <ul>
                            <li>
                            <div class = "profile_data">
                                <p>Location</p>
                                <p>Number</p>
                                <p>Email</p>
                            </div>
                            </li>
                            </ul>
                        </div>
                        <div class="profile_item profile_skills">
                            <div class="title">
                                <p class="bold">skill's</p>
                                <div>
                                    <Tags/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile_right">
                    <div class="profile_item profile_about">
                        <div class="title">
                        <p class="bold">About us</p>
                        </div>
                        <AboutMe/>
                    </div>
                    <div class="profile_item profile_work">
                        <div class="title">
                        <p class="bold">Work Experience</p>
                        </div>
                        <ul>
                            <li>
                            <Experience/>
                            
                        {/* <div class="date">Example date: 2013 - 2015</div> 
                            <div class="info">
                                <p class="semi-bold">Company name</p> 
                                <p>job title</p>
                                <p>job description</p>
                            </div>
                            </li>
                            <li>
                            <div class="date">Example date: 2015 - present</div> 
                            
                            <div class="info">
                                <p class="semi-bold">Company name</p> 
                                <p>job title</p>
                                <p>job description</p>
                            </div> */}
                            </li>
                        </ul>
                    </div>
                    <div class="profile_item profile_education">
                        <div class="title">
                            <p class="bold">Education</p>
                        </div>
                        <ul>
                        <li>
                            <Education/>
                        {/* <div class="date">2018 - present</div> 
                        <div class="info">
                            <p class="semi-bold">Unimelb</p> 
                            <p>N/A</p>
                        </div>
                        </li>
                        <li>
                        <div class="date">2005-2015</div>
                        <div class="info">
                            <p class="semi-bold">BRS</p> 
                            <p>High School</p>
                        </div> */}
                        </li>
                        </ul>
                    </div>            
                </div>
                
                
            </div>
        </div>

        )
    }
}






/* <div>
                        <Tabs> 
                        <div label="About Me"> 
                            <div class="aboutme">
                                <AboutMe/>
                            </div>
                        </div> 
                        <div label="Experience"> 
                            <div class="aboutme">
                                <p>experiences</p>
                            </div>
                        </div> 
                        <div label="Projects"> 
                            <div class="row">
                                <Projects/>
                            </div> 
                        </div> 
                        <div label="Images"> 
                            <div class="row">
                                Images
                            </div> 
                        </div> 
                        <div label="Videos"> 
                            <div class="row">
                                Videos
                            </div> 
                        </div> 
                        </Tabs> 
                    </div>
                </div> */