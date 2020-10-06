import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import DialogPortfolioCard from "./DialogPortfolioCard.component";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';


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

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
  }

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

  // Files associated with card
  const [files, setFiles] = useState(props.files);

  // Whether edit dialog is open
  const [open, setOpen] = React.useState(false);

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);


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
    console.log("In handle dialog confirm, files:", fs);
    if(fs.length > 0){
        console.log("Calling associateFilesWithCard function");
        props.associateFilesWithCard(props.id, fs);
    }
    

    setOpen(false);
  }

  const handleDialogCancel = () =>{
    setOpen(false);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings" onClick={handleMinimizeClick}>
            {showMedia ? <RemoveIcon /> : <ZoomOutMapIcon />}
          </IconButton>
        }
        title={title}
      />

      
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton>
            <EditIcon onClick={handleClickOpen}/>
        </IconButton>
        <IconButton>
            <DeleteIcon onClick={props.onDeleteClick}/>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <DialogPortfolioCard 
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            open={open}
            title={title}
            description={description}
            extendedDescription={extendedDescription}
            files={props.getFilesUnassociatedWithAnyCard()}
        />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {extendedDescription}
            <List>
            {props.getFilesAssociatedWithCard(props.id).map(file => 
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.fname}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>,
            )}
            </List>
            
          </Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
}

export default PortfolioCard;