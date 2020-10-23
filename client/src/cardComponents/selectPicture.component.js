import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, GridList, GridListTile, GridListTileBar, IconButton, Tooltip } from '@material-ui/core';
import {Edit} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      height: 360,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },

  }));

function SelectPicture(props){
    const imageDB = ["https://material-ui.com/static/images/grid-list/hats.jpg", "https://material-ui.com/static/images/grid-list/bike.jpg", "https://material-ui.com/static/images/grid-list/mushroom.jpg", "https://material-ui.com/static/images/grid-list/morning.jpg", "https://material-ui.com/static/images/grid-list/star.jpg", "https://material-ui.com/static/images/grid-list/olive.jpg", "https://material-ui.com/static/images/grid-list/honey.jpg", "https://material-ui.com/static/images/grid-list/plant.jpg"]
    
    const [originalPic, setOriginalPic] = useState(props.currentDisplayPicture)
    const [currentPic, setCurrentPic] = useState(props.currentDisplayPicture)

    
    const classes = useStyles();
    return (
        
        <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
        >
            <GridList cellHeight={155}>
                <GridListTile key={1} stle={{width:"33%"}}>
                    <img src={currentPic}/>
                    <GridListTileBar
                        title={"Current Display Picture"}
                        actionIcon={
                            <Tooltip title="Edit Display Picture">
                                <IconButton onClick={() => props.setEditDPOpen(true)}className={classes.icon}>
                                <Edit />
                                </IconButton>
                            </Tooltip>
                            }
                    />
                 </GridListTile>
            </GridList>
            {props.editDPOpen && 
            <>
                    {"Click the picture you wish to be the new display picture"}
                <GridList cellHeight={155} className={classes.gridList}>
                    {imageDB.map((item, index) =>
                        <GridListTile onClick={() => setCurrentPic(imageDB[index])}key={index}  style={{width: "33%"}}>
                            <img src={item} />
                        </GridListTile>
                        
                    )}
                </GridList>
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.setParentDisplayPicture(currentPic);
                        props.setEditDPOpen(false);
                    }}>
                    Confirm
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setCurrentPic(originalPic)
                        props.setEditDPOpen(false);
                    }}>
                    Cancel
                </Button>
            </>
            }       
        </Grid>
        
    )
}
export default SelectPicture;