import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Button} from '@material-ui/core/';
import { spacing } from '@material-ui/system';
import PortfolioCard from "./portfolioCard.component";
import PortfolioTitleCard from "./portfolioTitleCard.component"
import Box from '@material-ui/core/Box';


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
    const [state, setState] = useState([
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
            associatedWithCard: state[0].id
        },
        {
            fname: "Assignment2.pdf",
            associatedWithCard: state[1].id
        },
        {
            fname: "Assignment3.pdf",
            associatedWithCard: ""
        },
        {
            fname: "main.c",
            associatedWithCard: state[0].id
        },
        {
            fname: "file.py",
            associatedWithCard: ""
        }
    ])
        console.log(state)

    // Returns an array of filenames that are associated with a particular cardID
    function getFilesAssociatedWithCard(cardID){
        return files.filter(file => file.associatedWithCard === cardID).map(file => file.fname)
    }
    // Reorders array on drag end if necessary
    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            state,
            result.source.index,
            result.destination.index
        );
        setState(items);
    }



  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
        <>
        <PortfolioTitleCard 
            title={"Title of Portfolio"}
            description={"Description of Portfolio"}
        />
        <Box mx="auto" m={1}>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => setState([...state, {id: `item-${new Date().getTime()}`,
                title: "Insert Title Here",
                description: "Insert Description Here"}])}
            >
                Add Card
            </Button>
        </Box>
        

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.map((item, index) => (
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
                            title={item.title}
                            description={item.description}
                            extendedDescription={item.extendedDescription}
                            associatedFiles={getFilesAssociatedWithCard(item.id)}
                            picture={item.picture}
                            onDeleteClick={() => {
                                console.log("Clicked", index)
                                console.log(state)
                                const newState = [...state];
                                newState.splice(index, 1);
                                setState(newState);
                                
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
      </>
    );
  }

export default EditProject;