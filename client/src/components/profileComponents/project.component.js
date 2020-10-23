import React, { useState, useEffect, useContext} from "react";
import axios from 'axios';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Button, Box} from '@material-ui/core/';
import PortfolioCard from "../../cardComponents/portfolioCard.component";
import PortfolioTitleCard from "../../cardComponents/portfolioTitleCard.component"
import DialogPortfolioCard from "../../cardComponents/DialogPortfolioCard.component"
import FileUpload from "../fileUpload.component"

import {PortfolioCardContext} from "../../cardComponents/portfolioCardContext"; 

import {IconButton} from '@material-ui/core';
import { Delete, Folder, PictureAsPdfOutlined, Image} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

import UserService from "../../services/user.service";
import firebase from "firebase";
import InitFirebase from "../../services/initFirebase";

import authHeader from "../../services/auth-header";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

function Project(props) {
    // TODO REMOVEEE BAD BAD BAD BAD
    const projectID = props.location.pathname.split("/")[2];
    const [userHandle, setUserHandle] = useState('');
    const [authorised, setAuthorised] = useState(false);


    const { cards } = useContext(PortfolioCardContext);
    const { addCard } = useContext(PortfolioCardContext);
    const { deleteCard } = useContext(PortfolioCardContext);
    const { reorderCards } = useContext(PortfolioCardContext);
    const { associateFileWithCard } = useContext(PortfolioCardContext);


    // Files that will be uploaded to the database on submit
    const [AcceptedFiles, setAcceptedFiles] = useState([]);
    // Whether add card dialog is open
    const [open, setOpen] = React.useState(false);
    // Whether file component visible
    const [uploadOpen, setUploadOpen] = useState(false);
    const profileHandle = props.match.params.handle;

    // check user handle
    useEffect( () => {
      UserService.isUser(profileHandle).then(
          (res) => {
              setAuthorised(res);
              console.log(res);
          }
        )
        InitFirebase();
    }, []);
      

    const updateAccepted = (acceptedFiles) => {
      // Filter removes duplicate files by .name property; sorts by .name
      let combineFiles = AcceptedFiles.concat(acceptedFiles).filter((file, index, self) =>
          self.findIndex(f => f.name === file.name) === index
      ).sort(
          (f1, f2) => {
              return f1.name < f2.name;
          }
      )
        setAcceptedFiles(combineFiles);
    }

    const updateRejected = (rejectedFiles) => {
      ;    
    }

    const handleFileUpload = () => {
      if(uploadOpen){
        setUploadOpen(false);
        setAcceptedFiles([]); // Remove files staged for upload
      }
      else{
        setUploadOpen(true);
      }
    }

    function getListItemIcon(fileType){
      switch(fileType){
          case "application/pdf":
              return <PictureAsPdfOutlined />;
          case "image/png" || "image/jpeg":
              return <Image />
          default:
              return <Folder />;
      }
  }

    const onSubmitAddFiles = (event) => {
      AcceptedFiles.forEach((file) => {
        firebase.storage().ref(`/${userHandle}/projects/${projectID}/${file.name}`).put(file)
          .then( snapshot => {
              // add file to project's file collection
              snapshot.ref.getDownloadURL().then( downloadLink => {
                  const newFile = {
                      file: downloadLink,
                      filename: file.name,
                      associatedWithCard: ""
                  }
                  axios.post(`${API_URL}/files/${projectID}`, newFile, { headers: authHeader() })
                      .then(res =>{
                          console.log(res.data);
                      })
              })
              
          })
          .catch(err => {
              console.log(err);
          })
        });   
        
    }



    /** Prompts a dialog which will allow user to populate details of new card */
    const handleClickAddCard = () =>{
      setOpen(true);
    };

    /** Once adding a new card is confirmed */
    const handleDialogConfirm = (t, s, d, files) => {
      // make sure t,s,d are defined
      if (!t){
        t=''
      }
      if (!s){
        s=''
      }
      if (!d){
        d=''
      }
      const card = {
          id: `item-${new Date().getTime()}`,
          title: t,
          subtitle: s,
          description: d
      }
      
      addCard(card);
      files.forEach(file => {
        associateFileWithCard(file.filename, card.id)
      })
      setOpen(false);
      
    }
    /** Close dialog on cancel */
    const handleDialogCancel = () =>{
      setOpen(false);
    }

    // Returns Object of values to populate Dialog with
    const getDialogDescription = () =>{
      return(
        {
          title: "Add Content to Card",
          description: "To edit the contents of this card, change the values in the respective fields and press confirm. Upon confirming this card will be added to your project.",
          edit: false // We are adding a card as opposed to editing a pre-existing card.
        }
      )
    }
    // Reorders array on drag end if necessary
    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const items = reorder(
            cards,
            result.source.index,
            result.destination.index
        );
        reorderCards(result.source.index, result.destination.index);
        //setCards(items);
    }

    return (
      <>
      <PortfolioTitleCard authorised={authorised}/>
      {authorised ?
        (<>
        <Box mx="auto" m={1} mr={10}>
            <Button 
                variant="contained"
                color="primary"
                onClick={handleClickAddCard}
            >
                Add Card to Project
            </Button>
        
            <Button
              variant="contained"
              color="primary"
              onClick={handleFileUpload}
            >
                {uploadOpen ? "Cancel adding Files to Project" : "Add Files to Project"}
            </Button>
        </Box>
        {uploadOpen ?
          (<>
            <FileUpload updateAccepted={updateAccepted} updateRejected={updateRejected}/>
            <List>
                {AcceptedFiles.map((file, index) => 
                <ListItem key={index}>
                    <ListItemAvatar>
                    <Avatar>
                        {getListItemIcon(file.type)}
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary={file.name}
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"
                        onClick={() => {
                            const newFiles = [...AcceptedFiles]
                            newFiles.splice(index, 1);
                            setAcceptedFiles(newFiles)
                        }}
                    >
                        <Delete />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>,
                )}
            </List>

            <Button
                variant="contained"
                color="primary"
                onClick={onSubmitAddFiles}>
                Confirm Add Files
            </Button>
          </>) : (<></>)}
        </>) : (<></>)}
      <DialogPortfolioCard 
          handleDialogConfirm={handleDialogConfirm}
          handleDialogCancel={handleDialogCancel}
          open={open}
          dialogInformation={getDialogDescription()}
          authorised={authorised}
      />
      {authorised ?
        (<>
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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                              title={item.title}
                              description={item.description}
                              extendedDescription={item.extendedDescription}
                              picture={item.picture}
                              onDeleteClick={() => deleteCard(item.id)}
                              authorised={authorised}
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
        </>) : (<>
          {cards.map((item, index) => (
            <PortfolioCard
                id={item.id}
                title={item.title}
                description={item.description}
                extendedDescription={item.extendedDescription}
                picture={item.picture}
                onDeleteClick={() => deleteCard(item.id)}
                authorised={authorised}
            />
                ))}
        </>)}
    </>

    );
  }

export default Project;