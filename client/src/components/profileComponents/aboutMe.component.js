import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditAboutMe from "./editAboutMe.component"

import authHeader from "../../services/auth-header";


const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const AboutMe = () => {

    const [displayName, setDisplayName] = useState("");
    const [inspirations, setInspirations] = useState("");
    const [jobs, setJobs] = useState("");
    const [experiences, setExperiences] = useState("");
    
    useEffect( () => {
        axios.get(API_URL + "/aboutme", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setDisplayName(res.data.aboutMe.displayName);
                setInspirations(res.data.aboutMe.inspirations);
                setJobs(res.data.aboutMe.jobs);
                setExperiences(res.data.aboutMe.experiences);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    return (
        <Router>
            <div>
                <h2>About me</h2>
                <h3>Hi I am {displayName}</h3>
                <h3>I would love to {inspirations}</h3>
                <h3>I have worked as a {jobs}</h3>
                <h3>I have experienced {experiences}</h3>
                <Button href="/edit" variant="secondary">Edit about me</Button>
            </div>
            <div className="container">
                <Route path="/edit" exact component={EditAboutMe}/>
            </div>
        </Router>
    )

}

export default AboutMe;