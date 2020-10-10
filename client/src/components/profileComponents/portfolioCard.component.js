import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import {Favorite, Share, ExpandMore, Edit, Delete, Remove, ZoomOutMap, Folder} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

import DialogPortfolioCard from "./DialogPortfolioCard.component";


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

  // Title of Card
  const [title, setTitle] = useState(props.title);

  // Brief description of card
  const [description, setDescription] = useState(props.description);

  // Extended description of card viewable when pressing drop down button
  const [extendedDescription, setExtendedDescription] = useState(props.extendedDescription);


  // Whether edit dialog is open
  const [open, setOpen] = React.useState(false);

  // Files associated with this particular card
  const [files, setFiles] = useState(props.getFilesAssociatedWithCard(props.id))


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
    setFiles([...files, ...fs])
    if(fs.length > 0){
        props.associateFilesWithCard(props.id, fs);
    }
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
        <IconButton> <Edit onClick={handleClickOpen}/> </IconButton>
        <IconButton> <Delete onClick={props.onDeleteClick}/> </IconButton>
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
            dialogInformation={getDialogDescription()}
            files={props.getFilesUnassociatedWithAnyCard()}
        />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {extendedDescription}
          </Typography>
            <List>
            {files.map((file, index) => 
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <Folder />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.fname}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <Delete onClick={() => {
                      props.unassociateFileWithCard(props.id, file.fname);
                      const newFiles = [...files]
                      newFiles.splice(index, 1);
                      setFiles(newFiles)
                    }}/>
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