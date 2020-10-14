import React, { useState, useEffect }from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

export default function AboutThem (props) {
    // TODO REMOVEEE BAD BAD BAD BAD
    const searchedUser = props.location.pathname.split("/")[1];
    const [displayName, setDisplayName] = useState("");
    const [inspirations, setInspirations] = useState("");
    const [jobs, setJobs] = useState("");
    const [experiences, setExperiences] = useState("");
    useEffect( () => {
        axios.get(API_URL + `/${searchedUser}`)
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
        <div>
            <h2>{displayName}</h2>
            <h3>Aspires: {inspirations}</h3>
            <h3>Has worked as: {jobs}</h3>
            <h3>Has experienced: {experiences}</h3>
        </div>
    )
}
