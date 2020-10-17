import React, { useState, useEffect, useContext} from "react";
import axios from 'axios';
import authHeader from "../../services/auth-header";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Button, Box} from '@material-ui/core/';
import PortfolioCard from "../../cardComponents/portfolioCard.component";
import PortfolioTitleCard from "../../cardComponents/portfolioTitleCard.component"
import DialogPortfolioCard from "../../cardComponents/DialogPortfolioCard.component"

import {PortfolioCardContext} from "../../cardComponents/portfolioCardContext"; 

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

function EditProject(props) {
    // TODO REMOVEEE BAD BAD BAD BAD
    const projectID = props.location.pathname.split("/")[3];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { cards } = useContext(PortfolioCardContext);
    const { files } = useContext(PortfolioCardContext); //useContext(PortfolioCardContext);


    const { addCard } = useContext(PortfolioCardContext);
    const { deleteCard } = useContext(PortfolioCardContext);

    useEffect( () => {
      // TODO REMOVE CONSOLE LOG
      axios.get(API_URL + `/project/${projectID}`, { headers: authHeader() })
          .then( projectRes => {
              const project = projectRes.data.project;
              setTitle(project.title);
              setDescription(project.description);
              //setFiles(project.files);
              //TODO remove console log
              console.log("Reading in data", project);
              axios.get(`${API_URL}/getprojectcards/${projectID}`,{ headers: authHeader() })
                .then( cardRes => {
                  console.log(cardRes);
                  
                })
              
          })
          .catch( err => {
              console.log(err);
          })
  }, []);

    // Whether add card dialog is open
    const [open, setOpen] = React.useState(false);

    /** Prompts a dialog which will allow user to populate details of new card */
    const handleClickAddCard = () =>{
      setOpen(true);
    };

    /** Once adding a new card is confirmed */
    const handleDialogConfirm = (t, s, d, _) => {
      const card = {
          id: `item-${new Date().getTime()}`,
          title: t,
          subtitle: s,
          description: d
      }
      addCard(card);     
      /*
      axios.post(`${API_URL}/projectcards/`, card, { headers: authHeader() })
          .then( res => {
              console.log(card);
              console.log(res.data);
      });        
      */
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
        //setCards(items);
    }

    return (
      <>
      <PortfolioTitleCard />

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
          >
              Add Files to Project
          </Button>
      </Box>
      <DialogPortfolioCard 
          handleDialogConfirm={handleDialogConfirm}
          handleDialogCancel={handleDialogCancel}
          open={open}
          dialogInformation={getDialogDescription()}
      />
      
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
    </>

    );
  }

export default EditProject;