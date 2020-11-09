import React, {useState, useEffect} from "react";
import { Grid, Container, IconButton } from "@material-ui/core";
import {Add} from '@material-ui/icons';

import ProjectPanelCard from "./projectPanelCard.component";
import authHeader from "../services/auth-header";
import axios from "axios";
const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function ProjectPanel(props){
    const [ projects, setProjects ] = useState([]);
    const [authorised, setAuthorised] = useState(props.authorised);

    const profileHandle = props.profileHandle;
    useEffect( () => {
        axios.get(API_URL + `/${profileHandle}/getprojects`)
            .then( res => {
                console.log(res.data);
                setProjects(res.data.projects);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    useEffect( () => {
        setAuthorised(props.authorised);
    }, [props]);

    const handleAdd = () => {
        window.location = profileHandle + '/uploadProject';
    };

    return(
        
        <Container>
            { projects.map((project, i) => (
                <Grid item xs={12} lg={6}>
                    <ProjectPanelCard
                        project={project}
                        profileHandle={profileHandle}/>
                </Grid>
            ))}
            { authorised ?
                <IconButton> <Add onClick={handleAdd} /> </IconButton>
            : <></>}
        </Container>
    )
}

export default ProjectPanel;