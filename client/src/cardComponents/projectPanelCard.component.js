import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import {Favorite, Share, ExpandMore, Edit, Delete, Remove, ZoomOutMap, Folder} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
<<<<<<< HEAD

function ProjectPanelCard(props){
    const classes = useStyles();

    const [Picture, setPicture] = useState(require("./images/programming.png"))
=======
// pass in project object in projectPanel component
function ProjectPanelCard(props){
    const classes = useStyles();

>>>>>>> master

    // Whether the media element is showing (can be minimised)
    const [showMedia, setMedia] = useState(true);

<<<<<<< HEAD

    
      const handleMinimizeClick = () =>{
        setMedia(showMedia === false)
      }

    return(
        <Card className={classes.root}>
=======
    const project = props.project;
    const profileHandle = props.profileHandle;

    // TODO IMPLEMENTE IMAGES
    const [Img, setImg] = useState(require("./images/programming.png"));

    const handleMinimizeClick = () =>{
        setMedia(showMedia === false)
    }

    const handleCardClick = () => {
      window.location=`/${profileHandle}/${project.projectID}`;
    }

    return(
        <Card className={classes.root} >
>>>>>>> master
            <CardHeader
                action={
                    <IconButton areia-label="settings" onClick={handleMinimizeClick}>
                        {showMedia ? <Remove /> : <ZoomOutMap />}
                    </IconButton>
                }
<<<<<<< HEAD
                title={"Name of Project"}
=======
                title={project.title}
>>>>>>> master
            />

            {showMedia && <CardMedia
                className={classes.media}
<<<<<<< HEAD
                image={Picture}
                title={"Title of ???"}
=======
                image={Img}
                title={Img}
                onClick={handleCardClick}
>>>>>>> master
            />}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
<<<<<<< HEAD
                    {"Description of Project"}
=======
                    {project.description}
>>>>>>> master
                </Typography>
            </CardContent>

        </Card>
    )

}

export default ProjectPanelCard;