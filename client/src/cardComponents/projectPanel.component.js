import React, { useState, useEffect } from "react";
import { Grid, Container, IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import ProjectPanelCard from "./projectPanelCard.component";
import axios from "../api";

function ProjectPanel(props) {
  const [projects, setProjects] = useState([]);
  const [authorised, setAuthorised] = useState(props.authorised);

  const profileHandle = props.profileHandle;
  useEffect(() => {
    axios
      .get(`/${profileHandle}/getprojects`)
      .then((res) => {
        setProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setAuthorised(props.authorised);
  }, [props]);

  const handleAdd = () => {
    window.location = profileHandle + "/uploadProject";
  };

  return (
    <Grid container spacing={2}>
      {projects.map((project, i) => (
        <Grid item xs={12} lg={6}>
          <ProjectPanelCard project={project} profileHandle={profileHandle} />
        </Grid>
      ))}
      {authorised ? (
        <IconButton>
          {" "}
          <Add onClick={handleAdd} />{" "}
        </IconButton>
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default ProjectPanel;
