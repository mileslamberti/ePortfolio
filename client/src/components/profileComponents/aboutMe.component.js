import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditAboutMe from "./editAboutMe.component"

import authHeader from "../../services/auth-header";


const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

export default class AboutMe extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: "",
            inspirations: "",
            jobs:"",
            experiences:""
        };
    }
    componentDidMount(){
        axios.get(API_URL + "/aboutme", { headers: authHeader() })
            .then( res => {
                console.log(res);
                this.setState({ 
                    displayName: res.data.aboutMe.displayName,
                    inspirations: res.data.aboutMe.inspirations,
                    jobs: res.data.aboutMe.jobs,
                    experiences: res.data.aboutMe.experiences })
            })
            .catch( err => {
                console.log(err);
            })
    }
    render() {
        return (
            <Router>
                <div>
                    <h2>About me</h2>
                    <h3>Hi I am {this.state.displayName}</h3>
                    <h3>I would love to {this.state.inspirations}</h3>
                    <h3>I have worked as a {this.state.jobs}</h3>
                    <h3>I have experienced {this.state.experiences}</h3>
                    <Button href="/edit" variant="secondary">Edit about me</Button>
                </div>
                <div className="container">
                    <Route path="/edit" exact component={EditAboutMe}/>
                </div>
            </Router>
        )
    }
}
