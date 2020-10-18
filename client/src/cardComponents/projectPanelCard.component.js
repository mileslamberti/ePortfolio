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

function ProjectPanelCard(props){
    const classes = useStyles();

    const [Picture, setPicture] = useState(require("./images/programming.png"))

    // Whether the media element is showing (can be minimised)
    const [showMedia, setMedia] = useState(true);


    
      const handleMinimizeClick = () =>{
        setMedia(showMedia === false)
      }

    return(
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton areia-label="settings" onClick={handleMinimizeClick}>
                        {showMedia ? <Remove /> : <ZoomOutMap />}
                    </IconButton>
                }
                title={"Name of Project"}
            />

            {showMedia && <CardMedia
                className={classes.media}
                image={Picture}
                title={"Title of ???"}
            />}

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {"Description of Project"}
                </Typography>
            </CardContent>

        </Card>
    )

}

export default ProjectPanelCard;