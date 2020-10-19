import React, {useState, useEffect} from "react";
import { Grid, Container } from "@material-ui/core";
import ProjectPanelCard from "./projectPanelCard.component";
import authHeader from "../services/auth-header";
import axios from "axios";
const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function ProjectPanel(props){
    const [ projects, setProjects ] = useState([]);

    useEffect( () => {
        axios.get(API_URL + "/projects", { headers: authHeader() })
            .then( res => {
                console.log(res.data.projects);
                setProjects(res.data.projects);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);
    return(
        <Container>
            { projects.map((project, i) => (
                <Grid item xs={12} lg={6}>
                    <ProjectPanelCard {...project}/>
                </Grid>
            ))}
    </Container>
    )
}

export default ProjectPanel;