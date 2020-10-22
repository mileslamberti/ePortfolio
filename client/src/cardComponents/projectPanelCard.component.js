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


    // Whether the media element is showing (can be minimised)
    const [showMedia, setMedia] = useState(true);

    const [project, setProject] = useState(props)
    // TODO IMPLEMENTE IMAGES
    const [Img, setImg] = useState(require("./images/programming.png"));

    
    const handleMinimizeClick = () =>{
        setMedia(showMedia === false)
    }

    const handleCardClick = () => {
      window.location=`/projects/${project.projectID}`;
    }

    return(
        <Card className={classes.root} >
            <CardHeader
                action={
                    <IconButton areia-label="settings" onClick={handleMinimizeClick}>
                        {showMedia ? <Remove /> : <ZoomOutMap />}
                    </IconButton>
                }
                title={project.title}
            />

            {showMedia && <CardMedia
                className={classes.media}
                image={Img}
                title={Img}
                onClick={handleCardClick}
            />}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {project.description}
                </Typography>
            </CardContent>

        </Card>
    )

}

export default ProjectPanelCard;