import React, {useState, useEffect} from "react";
import { Grid, Container } from "@material-ui/core";
import Button from '@material-ui/core/Button';
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
    return(
        
        <Container>
            { authorised ?
            <Button
                variant="contained"
                color="disabled"
                startIcon={<Add />}
                href={`${profileHandle}/uploadProject`}
            >
                Upload Project
            </Button>
            : <></>}
            { projects.map((project, i) => (
                <Grid item xs={12} lg={6}>
                    <ProjectPanelCard
                        project={project}
                        profileHandle={profileHandle}/>
                </Grid>
            ))}
        </Container>
    )
}

export default ProjectPanel;