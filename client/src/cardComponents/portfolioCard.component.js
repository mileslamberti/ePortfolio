import React, {useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Button} from '@material-ui/core';
import {Favorite, Share, ExpandMore, Edit, Delete, Remove, ZoomOutMap, Folder, GetApp} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

import DialogPortfolioCard from "./DialogPortfolioCard.component";

import {PortfolioCardContext} from "./portfolioCardContext";




const useStyles = makeStyles((theme) => ({
  root: {
      width: "100%"
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

function PortfolioCard(props) {
  const classes = useStyles();
<<<<<<< HEAD

  // Whether drop-down button is showing, ie "expanded"
  const [expanded, setExpanded] = React.useState(false);
  const [Picture, setPicture] = useState(require("./images/programming.png"))
=======
  // Whether drop-down button is showing, ie "expanded"
  const [expanded, setExpanded] = React.useState(false);
>>>>>>> master
  
  // Whether the media element is showing (can be minimised)
  const [showMedia, setMedia] = useState(true);
  
  const { getCard } = useContext(PortfolioCardContext);
  // Edit the contents of this card with this function
  const { updateCard } = useContext(PortfolioCardContext);
  const { associateFileWithCard } = useContext(PortfolioCardContext);
  const { unassociateFileWithCard } = useContext(PortfolioCardContext);
  const { getFilesAssociatedWithCard } = useContext(PortfolioCardContext);
  const { getFilesUnassociatedWithAnyCard } = useContext(PortfolioCardContext);

  // Contents of this card in this varaible
  const card = getCard(props.id);

  const associatedFiles = getFilesAssociatedWithCard(card.id);
  const unassociatedFiles = getFilesUnassociatedWithAnyCard(card.id);
  // These files are common across all cards
  const { files } = useContext(PortfolioCardContext);

  // Whether edit dialog is open
  const [open, setOpen] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMinimizeClick = () =>{
    setMedia(showMedia === false)
  }

  const handleClickOpen = () =>{
    setOpen(true);
  };

<<<<<<< HEAD
  const handleDialogConfirm = (t, s, d, fs) =>{
=======
  const handleDialogConfirm = (t, s, d, fs, newDP) =>{
    console.log("new dp", newDP);
>>>>>>> master
    const updatedCard = {
      id: props.id,
      title: t,
      subtitle: s,
      description: d,
      projectID: card.projectID,
      position: card.position,
<<<<<<< HEAD
      img: card.img
    }
    updateCard(updatedCard);

    fs.forEach(file => {
      associateFileWithCard(file.fname, card.id);
    });
=======
      img: newDP
    }
    updateCard(updatedCard);
    
    fs.forEach(file =>{
      associateFileWithCard(file.filename, updatedCard.id);
    })
>>>>>>> master
    setOpen(false);
  }

  const handleDialogCancel = () =>{
    setOpen(false);
  }
  const getFile = (file) =>{
    var link = document.createElement("a");
    if (link.download !== undefined) {
        link.setAttribute("href", file);
        link.setAttribute("target", "_blank");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }

  // Returns Object of values to populate Dialog with
  const getDialogDescription = () =>{
    return(
      {
        title: "Edit Card Contents",
        description: "To edit the contents of this card, change the values in the respective fields and press confirm.",
        edit: true
      }
    )
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
<<<<<<< HEAD
          <IconButton aria-label="settings" onClick={handleMinimizeClick}>
            {showMedia ? <Remove /> : <ZoomOutMap />}
          </IconButton>
        }
=======
                <IconButton aria-label="settings" onClick={handleMinimizeClick}>
                  {showMedia ? <Remove /> : <ZoomOutMap />}
                </IconButton>
                }
>>>>>>> master
        title={card.title}
      />
      {/* The media (example an image) of the card can be minimised*/}
      {showMedia && <CardMedia
        className={classes.media}
<<<<<<< HEAD
        image={Picture}
=======
        image={card.img}
>>>>>>> master
        title={card.title}
        onClick={() => console.log("Clicked Picture")}
      />}
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {card.subtitle}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"> <Favorite /> </IconButton>
        <IconButton aria-label="share"> <Share /> </IconButton>
        {props.editMode && <IconButton onClick={handleClickOpen}> <Edit /> </IconButton>}
        {props.editMode && <IconButton onClick={props.onDeleteClick}> <Delete /> </IconButton>}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
<<<<<<< HEAD
=======
      {/** No Dialog or Collapse if not edit mode */}
      {props.editMode && 
>>>>>>> master
      <DialogPortfolioCard 
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            open={open}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            cardID={props.id}
            dialogInformation={getDialogDescription()}
            files={unassociatedFiles}
<<<<<<< HEAD
        />
=======
            displayPicture={card.img}
      />} 
>>>>>>> master
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {card.description}
          </Typography>
            <List>
            {associatedFiles.map((file, index) => 
              <ListItem key={index} >
                <ListItemAvatar>
                  <Avatar>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.filename}
                />
                {/* onClick={() => {getFile(file.downloadLink)}} */}
                {/* <Link 
                  to={file.filename} 
                  target={file.filename} 
                  download={getFile(file.downloadLink)}
                  > Download */}
                  <IconButton onClick={() => {getFile(file.downloadLink)}}>
                    <GetApp />
                  </IconButton>
                {/** Can't delete associated files if not in edit mode */}
                {props.editMode && <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete"
                    onClick={() => {
                      unassociateFileWithCard(file.filename);
                     }}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
                }
              </ListItem>,
            )}
            </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PortfolioCard;