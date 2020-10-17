import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import {Favorite, Share, ExpandMore, Edit, Delete, Remove, ZoomOutMap, Folder} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

import DialogPortfolioCard from "./DialogPortfolioCard.component";

import {PortfolioCardContext} from "./portfolioCardContext";



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

function PortfolioCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [Picture, setPicture] = useState(require("./images/programming.png"))
  const [showMedia, setMedia] = useState(true);
  

  // These files are common across all cards
  const { files } = useContext(PortfolioCardContext);

  // Returns an array of filenames that are associated with a particular cardID
  function getFilesAssociatedWithCard(){
      return files.filter(file => file.associatedWithCard === props.id);
  }

  function getFilesUnassociatedWithAnyCard(){
      return files.filter(file => file.associatedWithCard === "")
  }

  // Files associated with Card, we need this to force immediate re-renders when removing files
  // associated with the card.
  const [associatedFiles, setAssociatedFiles] = useState(getFilesAssociatedWithCard());

  // Associates the filesToAdd files with a particular card
  function associateFilesWithCard(filesToAdd){
    filesToAdd = filesToAdd.map(file => file.fname);
    const cardID = props.id;
    let newFiles = files;
    for(let i=0; i<files.length; i++){
        // Unassociated card that whose name is in filesToAdd
        if(files[i].associatedWithCard === "" && filesToAdd.indexOf(files[i].fname) !== -1){
            //files[i].associatedWithCard = cardID;
            newFiles[i].associatedWithCard = cardID;
            
        }
    }
    setAssociatedFiles(getFilesAssociatedWithCard());
    //setFiles(newFiles);
}
function unassociateFileWithCard(file){
      let newFiles = files;
      const cardID = props.id;
      for(let i=0; i<files.length; i++){
          if(files[i].fname === file){
              console.assert(files[i].associatedWithCard === cardID, "Different card IDs")
              newFiles[i].associatedWithCard = ""
              break;
          }    
      }
      //setFiles(newFiles);
      setAssociatedFiles(getFilesAssociatedWithCard());
}


  // Title of Card
  const [title, setTitle] = useState(props.title);

  // Brief description of card
  const [description, setDescription] = useState(props.description);

  // Extended description of card viewable when pressing drop down button
  const [extendedDescription, setExtendedDescription] = useState(props.extendedDescription);


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

  const handleDialogConfirm = (t, d, e, fs) =>{
    setTitle(t);
    setDescription(d);
    setExtendedDescription(e);
    if(fs.length > 0){
        associateFilesWithCard(fs);
    }
    //TODO SUbmit to backend
    setOpen(false);
  }

  const handleDialogCancel = () =>{
    setOpen(false);
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
          <IconButton aria-label="settings" onClick={handleMinimizeClick}>
            {showMedia ? <Remove /> : <ZoomOutMap />}
          </IconButton>
        }
        title={title}
      />

      {/* The media (example an image) of the card can be minimised*/}
      {showMedia && <CardMedia
        className={classes.media}
        image={Picture}
        title={title}
        onClick={() => console.log("Clicked Picture")}
      />}
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"> <Favorite /> </IconButton>
        <IconButton aria-label="share"> <Share /> </IconButton>
        <IconButton onClick={handleClickOpen}> <Edit /> </IconButton>
        <IconButton onClick={props.onDeleteClick}> <Delete /> </IconButton>
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

      <DialogPortfolioCard 
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            open={open}
            title={title}
            description={description}
            extendedDescription={extendedDescription}
            cardID={props.id}
            dialogInformation={getDialogDescription()}
            files={getFilesUnassociatedWithAnyCard()}
        />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {extendedDescription}
          </Typography>
            <List>
            {associatedFiles.map((file, index) => 
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.fname}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete"
                    onClick={() => {
                      unassociateFileWithCard(file.fname);
                     }}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>,
            )}
            </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PortfolioCard;