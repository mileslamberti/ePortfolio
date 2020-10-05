import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from '@material-ui/core/Card';
import PortfolioCard from "./portfolioCard.component";
import PortfolioTitleCard from "./portfolioTitleCard.component"


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
    const [state, setState] = useState([
        {
            id: "item-1",
            content: 1,
            title: "Assignment 1",
            description: "A very hard assignmnet",
            picture: Picture1
        },
        {
            id: "item-2",
            content: 2,
            title: "Assignment 2",
            description: "An easy assignment",
            picture: Picture2
        },
        {
            id: "item-3",
            content: 3,
            title: "Assignment 3",
            description: "A joke of an assignment",
            picture: Picture1
        },
        {
            id: "item-4",
            content: 4,
            title: "Assignment 4",
            description: "A difficult assignment",
            picture: Picture1
        }]
        );
        console.log(state)

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

    function deleteCard(){

    }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
    return (
        <>
        <PortfolioTitleCard 
            title={"Title of Portfolio"}
            description={"Description of Portfolio"}
        />
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