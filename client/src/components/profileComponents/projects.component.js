import React, { useState, useEffect }from 'react';
import axios from 'axios';
import authHeader from "../../services/auth-header";

import { Card, Button } from "react-bootstrap" ;

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const Projects = () => {
    const [search, setSearch] = useState('');
    const [projects, setProjects] = useState([]);
    useEffect( () => {
        axios.get(API_URL + `/projects`, { headers: authHeader() })
            .then( res => {
                const projects = res.data.projects;
                setProjects(projects);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    const filteredProjects = projects.filter ( project => {
        console.log(project);
        return project.title.includes( search )
     })
    return (
        <div>
            <h2>Projects Page</h2>
            <div className="row">
                {filteredProjects.map(renderCard)}
            </div>
        </div>
    )
}
const renderCard = (card, index) => {
    return(
        <div className="col-md-3" style={{ marginTop: "20px" }}>
            <Card style={{ width: '18rem' }} key={ index }>
            <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/>
            <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
                <Button href={`/projects/${card.projectID}`} variant="primary">View Project</Button>
            </Card.Body>
            </Card>
        </div>
    
    );
}


const ViewProject = (props) => {
    // TODO REMOVEEE BAD BAD BAD BAD
    const projectID = props.location.pathname.split("/")[2];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([])
    useEffect( () => {
        axios.get(API_URL + `/project/${projectID}`, { headers: authHeader() })
            .then( res => {
                const project = res.data.project;
                //console.log(res.data);
                setTitle(project.title);
                setDescription(project.description);
                setFiles([project.files]);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    return (
        <div>
            <h2>Title: {title}</h2>
            <h3>Description: {description}</h3>
            <Button href={`/projects`} variant="primary">Back to projects</Button>
        </div>
    )
}

export {
    ViewProject,
    Projects
  };
