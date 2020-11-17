import React, {useState, useContext} from 'react';
import axios from "../api";
import { makeStyles } from '@material-ui/core/styles';

import { Button, Grid, GridList, GridListTile, GridListTileBar, IconButton, Tooltip } from '@material-ui/core';
import {Edit} from '@material-ui/icons';
import {PortfolioCardContext} from "./portfolioCardContext";

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
    //const imageDB = ["https://material-ui.com/static/images/grid-list/hats.jpg", "https://material-ui.com/static/images/grid-list/bike.jpg", "https://material-ui.com/static/images/grid-list/mushroom.jpg", "https://material-ui.com/static/images/grid-list/morning.jpg", "https://material-ui.com/static/images/grid-list/star.jpg", "https://material-ui.com/static/images/grid-list/olive.jpg", "https://material-ui.com/static/images/grid-list/honey.jpg", "https://material-ui.com/static/images/grid-list/plant.jpg"]
    
    const [originalPic, setOriginalPic] = useState(props.currentDisplayPicture)
    const [currentPic, setCurrentPic] = useState(props.currentDisplayPicture)
    const { getStockPictures } = useContext(PortfolioCardContext);
    
    const imageDB = getStockPictures().tiles
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const onChangeChoosenImage = (e) => {
        e.preventDefault();
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("file", image, image.name);
        setLoading(true);
        axios
            .post("/user/image", formData)
            .then((res) => {
                setCurrentPic(res.data.image);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }
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
                        <GridListTile onClick={() => setCurrentPic(imageDB[index].fileLink)}key={index}  style={{width: "33%"}}>
                            <img src={item.fileLink} />
                        </GridListTile>
                        
                    )}
                </GridList>
                <input
                    className={classes.input}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={onChangeChoosenImage}
                    style={{ display: 'none' }}
                />
                <Button
                    htmlFor="icon-button-file"
                    className={classes.image}
                    color="primary"
                    variant="contained"
                    onClick={ () => document.getElementById('icon-button-file').click()}
                    >
                    Upload image
                </Button>
                {loading ? <span className="spinner-border spinner-border-sm"></span> :
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.setParentDisplayPicture(currentPic);
                        props.setEditDPOpen(false);
                    }}>
                    Confirm
                </Button>
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setCurrentPic(originalPic);
                        setLoading(false);
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