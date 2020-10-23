import React, { useState, useEffect }from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';
import './profile.component.css';
import img from './random.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import UserInfo from "./profileComponents/userInfo.component";
import Tags from "./profileComponents/tags.component";
import Tabs from "./tabs.component";
import FindUser from "./profileComponents/findUser.component";
import UserService from "../services/user.service"

import ProjectPanel from "../cardComponents/projectPanel.component"
export default function Profile (props) {
    
        const profileHandle = props.location.pathname.split("/")[1]
        const [authorised, setAuthorised] = useState(false);

        useEffect( () => {
            UserService.isUser(profileHandle).then(
                (res) => {
                    setAuthorised(res);
                    console.log(res);
                }
              )
        }, []);

        return (
        <div>
            <div class="profile">
                <div class="profile_left">
                    <div class="img_here">
                        <DP authorised={authorised} profileHandle={profileHandle}/>
                    </div>
                    <div class="profile_content">
                        <div class="profile_item profile_info">
                            <UserInfo authorised={authorised} profileHandle={profileHandle}/>
                        </div>
                        <div class="profile_item profile_skills">
                            <div class="title">
                                <p class="bold">skills</p>
                                <div>
                                    <Tags authorised={authorised} profileHandle={profileHandle}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profile_right">
                    <div class="profile_item profile_about">
                        <AboutMe authorised={authorised} profileHandle={profileHandle}/>
                    </div>
                    <div class="profile_item profile_work">
                        <div class="title">
                        <p class="bold">Work Experience</p>
                        </div>
                        <ul>
                            <li>

                            
                        <div class="date">Example date: 2013 - 2015</div> 
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
                            </div>
                            </li>
                        </ul>
                    </div>
                    <div class="profile_item profile_education">
                        <div class="title">
                            <p class="bold">Education</p>
                        </div>
                        <ul>
                        <li>
                        <div class="date">2018 - present</div> 
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
                        </div>
                        </li>
                        </ul>
                    </div>
                    <ProjectPanel authorised={authorised} profileHandle={profileHandle}/>   
                </div>
                
                
            </div>
        </div>

        )
    
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