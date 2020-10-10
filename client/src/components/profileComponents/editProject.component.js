import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Button, Box} from '@material-ui/core/';
import PortfolioCard from "./portfolioCard.component";
import PortfolioTitleCard from "./portfolioTitleCard.component"
import DialogPortfolioCard from "./DialogPortfolioCard.component"


// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
    console.log(result)
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

function EditProject() {
    const [Picture1, setPicture1] = useState("./images/test.jpg")
    const [Picture2, setPicture2] = useState("./images/programming.png")
    // These are the cards associated with the project
    // Card IDs MUST be unique.
    const [cards, setCards] = useState([
        {
            id: `item-1-${new Date().getTime()}`,
            title: "Assignment 1",
            description: "A very hard assignmnet",
            extendedDescription: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes",
            picture: Picture1
        },
        {
            id: `item-2-${new Date().getTime()}`,
            title: "Assignment 2",
            description: "An easy assignment",
            extendedDescription: "Below are the files that relate to Assignment 2",
            picture: Picture2
        },
        {
            id: `item-3-${new Date().getTime()}`,
            title: "Assignment 3",
            description: "A joke of an assignment",
            picture: Picture1
        },
        {
            id: `item-4-${new Date().getTime()}`,
            title: "Assignment 4",
            description: "A difficult assignment",
            picture: Picture1
        }]
        );
    const [files, setFiles] = useState([
        {
            fname: "Assignment1.pdf",
            associatedWithCard: cards[0].id
        },
        {
            fname: "Assignment2.pdf",
            associatedWithCard: cards[1].id
        },
        {
            fname: "Assignment3.pdf",
            associatedWithCard: ""
        },
        {
            fname: "main.c",
            associatedWithCard: cards[0].id
        },
        {
            fname: "file.py",
            associatedWithCard: ""
        }
    ])

    // Whether add card dialog is open
    const [open, setOpen] = React.useState(false);

    const handleClickAddCard = () =>{
      setOpen(true);
    };
  
    const handleDialogConfirm = (t, d, e, _) =>{
      setCards([...cards, {id: `item-${new Date().getTime()}`,
                title: t,
                description: d,
                extendedDescription: e}
              ])
      setOpen(false);
    }
  
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
    
    // Returns an array of filenames that are associated with a particular cardID
    function getFilesAssociatedWithCard(cardID){
        return files.filter(file => file.associatedWithCard === cardID)
    }

    function getFilesUnassociatedWithAnyCard(){
        return files.filter(file => file.associatedWithCard === "")
    }

    // Associates the filesToAdd files with a particular card
    function associateFilesWithCard(cardID, filesToAdd){
        filesToAdd = filesToAdd.map(file => file.fname);
        let newFiles = files;
        for(let i=0; i<files.length; i++){
            // Unassociated card that whose name is in filesToAdd
            if(files[i].associatedWithCard === "" && filesToAdd.indexOf(files[i].fname) != -1){
                //files[i].associatedWithCard = cardID;
                newFiles[i].associatedWithCard = cardID;
                
            }
        }
        setFiles(newFiles);
    }
    function unassociateFileWithCard(cardID, file){
        let newFiles = files;
        for(let i=0; i<files.length; i++){
            console.log(files[i].fname, file);
            if(files[i].fname === file){
                console.assert(files[i].associatedWithCard === cardID, "Different card IDs")
                newFiles[i].associatedWithCard = ""
                break;
            }
            
        }
        setFiles(newFiles);
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
        setCards(items);
    }



  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
        <>
        <PortfolioTitleCard 
            title={"Title of Portfolio"}
            description={"Description of Portfolio"}
        />
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
                            getFilesAssociatedWithCard={getFilesAssociatedWithCard}
                            getFilesUnassociatedWithAnyCard={getFilesUnassociatedWithAnyCard}
                            associateFilesWithCard={associateFilesWithCard}
                            unassociateFileWithCard={unassociateFileWithCard}
                            picture={item.picture}
                            onDeleteClick={() => {
                                console.log("Clicked", index)
                                console.log(cards)
                                const newState = [...cards];
                                newState.splice(index, 1);
                                setCards(newState);

                                let associatedFiles = getFilesAssociatedWithCard(item.id);
                                let newFiles = files;
                                for(let i=0; i<files.length; i++){
                                    if(associatedFiles.map(file => file.fname).indexOf(files[i].fname) != -1){
                                        newFiles[i].associatedWithCard = "";
                                    }
                                }
                                setFiles(newFiles);
                                
                                
                            }}
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
      {console.log(files)}
      </>
    );
  }

export default EditProject;