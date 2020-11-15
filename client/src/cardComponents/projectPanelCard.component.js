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
// pass in project object in projectPanel component
function ProjectPanelCard(props){
    const classes = useStyles();
    const [raised, setRaised] = useState(false);


    // Whether the media element is showing (can be minimised)
    const [showMedia, setMedia] = useState(true);

    const project = props.project;
    const profileHandle = props.profileHandle;

    const handleCardClick = () => {
      window.location=`/${profileHandle}/${project.projectID}`;
    }

    const toggleRaised = () => {
      setRaised(!raised);
    }

    return(
        <Card className={classes.root}  onClick={handleCardClick} 
          onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised}>
            <CardHeader
                title={project.title}
            />


            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {project.description}
                </Typography>
            </CardContent>

        </Card>
    )

}

export default ProjectPanelCard;