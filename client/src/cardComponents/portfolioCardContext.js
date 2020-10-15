import React, {useState, createContext} from 'react';

export const PortfolioCardContext = createContext();

export const PortfolioCardProvider = props => {
    // Can be removed later, and while it is hard coded the IDs must sync up with what is in editProject
    const [cards, setCards] = useState([
        {
            id: `item-1`,
            title: "Assignment 1",
            description: "A very hard assignmnet",
            extendedDescription: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes",
        },
        {
            id: `item-2`,
            title: "Assignment 2",
            description: "An easy assignment",
            extendedDescription: "Below are the files that relate to Assignment 2",
        },
        {
            id: `item-3`,
            title: "Assignment 3",
            description: "A joke of an assignment",
        },
        {
            id: `item-4`,
            title: "Assignment 4",
            description: "A difficult assignment",
        }]
    );
    // TODO get files associated with wihtr
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

    return(
        <PortfolioCardContext.Provider value={[files, setFiles]}>
            {props.children}
        </PortfolioCardContext.Provider>
    )
}