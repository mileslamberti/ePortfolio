import React, {useState} from "react";

import { Grid, Container } from "@material-ui/core";

import ProjectPanelCard from "./projectPanelCard.component";

function ProjectPanel(props){
    return(
        <Container>
        <Grid container spacing={1}>
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />            
            </Grid>
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />
            </Grid>
            
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />
            </Grid>
            <Grid item xs={12} lg={6}>
                <ProjectPanelCard />
            </Grid>
        </Grid>

    </Container>
    )
}

export default ProjectPanel;