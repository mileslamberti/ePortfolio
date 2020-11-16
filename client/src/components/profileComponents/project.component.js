import React, { useState, useEffect, useContext } from "react";
import axios from "../../api";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Grid, Icon } from "@material-ui/core/";
import PortfolioCard from "../../cardComponents/portfolioCard.component";
import PortfolioTitleCard from "../../cardComponents/portfolioTitleCard.component";
import DialogPortfolioCard from "../../cardComponents/DialogPortfolioCard.component";
import FileUpload from "../fileUpload.component";

import { PortfolioCardContext } from "../../cardComponents/portfolioCardContext";

import { IconButton } from "@material-ui/core";
import {
  Delete,
  Folder,
  PictureAsPdfOutlined,
  Image,
  ArrowBack,
} from "@material-ui/icons";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Typography,
} from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

import UserService from "../../services/user.service";
import firebase from "firebase";
import InitFirebase from "../../services/initFirebase";

import authHeader from "../../services/auth-header";
import { makeStyles } from "@material-ui/core/styles";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70%",
    position: "absolute",
    left: "50%",
    transform: "translate(-50%)",
  },
}));

const grid = 8;

// Style for each droppable card
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  width: "100%",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

// Style for the entire list of cards
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "70%",
});

function Project(props) {
  // TODO REMOVEEE BAD BAD BAD BAD
  const projectID = props.location.pathname.split("/")[2];
  const [authorised, setAuthorised] = useState(false);

  const { cards } = useContext(PortfolioCardContext);
  const { addCard } = useContext(PortfolioCardContext);
  const { deleteCard } = useContext(PortfolioCardContext);
  const { reorderCards } = useContext(PortfolioCardContext);
  const { associateFileWithCard } = useContext(PortfolioCardContext);
  const { projectInfo } = useContext(PortfolioCardContext);

  // Files that will be uploaded to the database on submit
  const [AcceptedFiles, setAcceptedFiles] = useState([]);
  // Whether add card dialog is open
  const [open, setOpen] = React.useState(false);
  // Whether file component visible
  const [uploadOpen, setUploadOpen] = useState(false);

  const [helpOpen, setHelpOpen] = useState(false);

  // Whether delete warning dialog is open
  const [warningOpen, setWarningOpen] = useState(false);

  const profileHandle = props.match.params.handle;
  const classes = useStyles();
  // check user handle
  useEffect(() => {
    UserService.isUser(profileHandle).then((res) => {
      setAuthorised(res);
      console.log(res);
    });
    InitFirebase();
  }, []);

  const updateAccepted = (acceptedFiles) => {
    // Filter removes duplicate files by .name property; sorts by .name
    let combineFiles = AcceptedFiles.concat(acceptedFiles)
      .filter(
        (file, index, self) =>
          self.findIndex((f) => f.name === file.name) === index
      )
      .sort((f1, f2) => {
        return f1.name < f2.name;
      });
    setAcceptedFiles(combineFiles);
  };

  const updateRejected = (rejectedFiles) => {};

  const handleFileUpload = () => {
    if (uploadOpen) {
      setUploadOpen(false);
      setAcceptedFiles([]); // Remove files staged for upload
    } else {
      setUploadOpen(true);
    }
  };

  function getListItemIcon(fileType) {
    switch (fileType) {
      case "application/pdf":
        return <PictureAsPdfOutlined />;
      case "image/png" || "image/jpeg":
        return <Image />;
      default:
        return <Folder />;
    }
  }

  const onSubmitAddFiles = (event) => {
    setUploadOpen(false);
    AcceptedFiles.forEach((file) => {
      firebase
        .storage()
        .ref(`/${profileHandle}/projects/${projectID}/${file.name}`)
        .put(file)
        .then((snapshot) => {
          // add file to project's file collection
          snapshot.ref.getDownloadURL().then((downloadLink) => {
            const newFile = {
              file: downloadLink,
              filename: file.name,
              associatedWithCard: "",
            };
            axios
              .post(`/files/${projectID}`, newFile, {
                headers: authHeader(),
              })
              .then((res) => {
                console.log(res.data);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const handleDeleteProject = () => {
    axios
      .post(`/deleteproject/${projectID}`, {}, { headers: authHeader() })
      .then((res) => {
        console.log(res);
        window.location = `/${profileHandle}`;
      });
  };

  /** Prompts a dialog which will allow user to populate details of new card */
  const handleClickAddCard = () => {
    setOpen(true);
  };

  /** Once adding a new card is confirmed */
  const handleDialogConfirm = (t, s, d, files) => {
    // make sure t,s,d are defined
    if (!t) {
      t = "";
    }
    if (!s) {
      s = "";
    }
    if (!d) {
      d = "";
    }
    const card = {
      id: `item-${new Date().getTime()}`,
      title: t,
      subtitle: s,
      description: d,
    };

    addCard(card);
    files.forEach((file) => {
      associateFileWithCard(file.filename, card.id);
    });
    setOpen(false);
  };
  /** Close dialog on cancel */
  const handleDialogCancel = () => {
    setOpen(false);
  };

  // Returns Object of values to populate Dialog with
  const getDialogDescription = () => {
    return {
      title: "Add Content to Card",
      description:
        "To edit the contents of this card, change the values in the respective fields and press confirm. Upon confirming this card will be added to your project.",
      edit: false, // We are adding a card as opposed to editing a pre-existing card.
    };
  };
  // Reorders array on drag end if necessary
  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(cards, result.source.index, result.destination.index);
    reorderCards(result.source.index, result.destination.index);
    //setCards(items);
  }

  const backClick = () => {
    window.history.back();
  };

  return (
    <div>
      <IconButton color="secondary">
        {" "}
        <ArrowBack onClick={backClick} />{" "}
      </IconButton>
      {authorised ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setHelpOpen(true)}
        >
          Help
        </Button>
      ) : (
        <></>
      )}
      <div>
        <Grid container spacing={1} direction="column">
          <Grid item xs={12}>
            <PortfolioTitleCard authorised={authorised} />
          </Grid>

          <Grid item xs={6}>
            {authorised ? (
              <Grid
                container
                mx="auto"
                m={1}
                mr={10}
                spacing={1}
                direction="row"
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickAddCard}
                  >
                    Add Card to Project
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFileUpload}
                  >
                    {uploadOpen
                      ? "Cancel adding Files to Project"
                      : "Add Files to Project"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setWarningOpen(true)}
                  >
                    Delete Project
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>

          {/*  */}
          
          {authorised && (
            <Dialog open={warningOpen} onClose={() => setWarningOpen(false)}>
              <DialogTitle id="form-dialog-title">
                {" "}
                Are you sure you want to delete?
              </DialogTitle>
              <DialogContentText>
                <Typography gutterBottom>
                  You are about to <b>delete</b> this project, titled:{" "}
                  {projectInfo.title}. This cannot be undone.
                </Typography>
                <Typography>Press confirm to delete.</Typography>
              </DialogContentText>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setWarningOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteProject}
                startIcon={<Delete />}
              >
                Confirm Delete
              </Button>
            </Dialog>
          )}

          <Grid item xs={6}>
            <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
              <DialogContent>
                <DialogTitle id="form-dialog-title">
                  How to showcase your projectID
                </DialogTitle>
                <DialogContentText>
                  <Typography gutterBottom>
                    To help you showcase your project, you may create cards by
                    pressing the "Add Card to Project" button.
                  </Typography>
                  <Typography gutterBottom>
                    Each card has a <i>title</i>, <i>subtitle</i> and{" "}
                    <i>description</i> you can use to describe a particular
                    aspect of your project. Furthermore, you may associate files
                    you have uploaded with your card, and select the picture
                    displayed with your card. To <b>edit</b> the contents of a
                    card, press the <i>pencil button</i> in the bottom-left of
                    each card.
                  </Typography>
                  <Typography gutterBottom>
                    You may drag and drop the cards into the location/order you
                    want them to be displayed.
                  </Typography>
                  <Typography gutterBottom>
                    To <b>delete</b> a card, press the <i>bin button</i> in the
                    bottom-left of each card.
                  </Typography>
                </DialogContentText>
              </DialogContent>
            </Dialog>

            {uploadOpen ? (
              <>
                <FileUpload
                  updateAccepted={updateAccepted}
                  updateRejected={updateRejected}
                />
                <List>
                  {AcceptedFiles.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>{getListItemIcon(file.type)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={file.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            const newFiles = [...AcceptedFiles];
                            newFiles.splice(index, 1);
                            setAcceptedFiles(newFiles);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmitAddFiles}
                >
                  Upload files to Project
                </Button>
              </>
            ) : (
              <></>
            )}
            <DialogPortfolioCard
              handleDialogConfirm={handleDialogConfirm}
              handleDialogCancel={handleDialogCancel}
              open={open}
              dialogInformation={getDialogDescription()}
              authorised={authorised}
            />
            {authorised ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {/*We map each card into a PortfolioCard*/}
                      {cards.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <PortfolioCard
                                id={item.id}
                                picture={item.picture}
                                editMode={authorised}
                                onDeleteClick={() => deleteCard(item.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <>
                {cards.map((item, index) => (
                  <PortfolioCard
                    id={item.id}
                    picture={item.picture}
                    editMode={authorised}
                    onDeleteClick={() => deleteCard(item.id)}
                  />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Project;
