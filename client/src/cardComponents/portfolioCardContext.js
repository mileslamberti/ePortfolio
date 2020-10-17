import React, {useState, useEffect, createContext, useReducer} from 'react';

import portfolioCardReducer from './portfolioCardReducer';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const initialCards = {
    cards: [{
        id: "card-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description"
    }]
}

let initialProjectInfo = {
    title: "Doggo",
    subtitle: "Catto"
}

const initialFiles ={
    files:[{
        fname: "Assignment1.pdf",
        associatedWithCard: "card-1"
    },
    {
        fname: "Assignment2.pdf",
        associatedWithCard: ""
    }]
    
}

export const PortfolioCardContext = createContext();

function reducer(state, action){
    switch(action.type){
        case "update-info":
            return{
                ...state,
                title: action.payload.title,
                subtitle: action.payload.subtitle
            }
        default:
            console.log("in default");
            return state
    }
}

function reducer2(state, action){
    switch(action.type){
        case "add-card":
            return{
                ...state,
                cards: [...state.cards, action.payload]

            }
        case "delete-card":
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            }
        case "edit-card":
            const updatedCards = state.cards.map(card => {
                if(card.id === action.payload.id){
                    return {...card, ...action.payload}
                }
                return card;
            })
            return {
                ...state,
                cards: updatedCards
            }
        default:
            return state;
    }
}

function reducer3(state, action){
    switch(action.type){
        case "associateCard":
            return {
                ...state,
                files: state.files.map(file => {
                    if(file.fname === action.payload.fname){
                        return{...file, ...action.payload}
                    }
                    return file;
                })
            }
        case "unassociateCard":
            return{
                ...state,
                files: state.files.map(file => {
                    if(file.associatedWithCard === ""){
                        console.log("File not associated with any card")
                    }
                    if(file.fname === action.payload.fname){
                        return{...file, ...action.payload}
                    }
                    return file;
                })
            }
        default:
            return state;
    }
}

export const PortfolioCardProvider = props => {
    // Can be removed later, and while it is hard coded the IDs must sync up with what is in editProject
    const hardCodedCard = [{
        id: `item-1`,
        title: "Card 1",
        description: "A very hard assignmnet",
        extendedDescription: "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes",
    }]
    const hardCodedFile ={
        fname: "Assignment1.pdf",
        associatedWithCard: hardCodedCard[0].id
    }
    const [projectInfoState, dispatchProjectInfo] = useReducer(reducer, initialProjectInfo);
    const [cardsState, dispatchCards] = useReducer(reducer2, initialCards);
    const [filesState, dispatchFiles] = useReducer(reducer3, initialFiles);
    
    function associateFileWithCard(fname, cardid){
        dispatchFiles({
            type: 'associateCard',
            payload: {
                fname: fname,
                associatedWithCard: cardid
            }
        })
    }

    function unassociateFileWithCard(fname){
        dispatchFiles({
            type: 'unassociateCard',
            payload: {
                fname: fname,
                associatedWithCard: ""
            }
        })
    }
    // TODO get files associated with wihtr
    //useEffect( () => {
        // TODO REMOVE CONSOLE LOG
        //console.log(projectID);
        // axios.get(API_URL + `/project/${projectID}`, { headers: authHeader() })
        //     .then( res => {
        //         const project = res.data.project;
        //         //TODO remove console log
        //         setTitle(project.title);
        //         setDescription(project.description);
        //         setFiles(project.files);
        //     })
        //     .catch( err => {
        //         console.log(err);
        //     })
    //}, []);

    function editProjectInfo(title, subtitle){
        dispatchProjectInfo({
            type: 'update-info',
            payload: {
                title: title,
                subtitle: subtitle
            }
        });
    }

    function addCard(cardInfo){
        dispatchCards({
            type: "add-card",
            payload: {
                id: cardInfo.id,
                title: cardInfo.title,
                subtitle: cardInfo.subtitle,
                description: cardInfo.description
            }
        });
    }

    function deleteCard(id){
        const associatedFiles = getFilesAssociatedWithCard(id);
        associatedFiles.forEach(file => {
            unassociateFileWithCard(file.fname);
        })
        dispatchCards({
            type: "delete-card",
            payload: id
        })
    }

    function getCard(id){
        for(let i=0; i<cardsState.cards.length; i++){
            if(cardsState.cards[i].id === id){
                return cardsState.cards[i];
            }
        }
    }

    function editCard(cardInfo){
        dispatchCards({
            type: "edit-card",
            payload: {
                id: cardInfo.id,
                title: cardInfo.title,
                subtitle: cardInfo. subtitle,
                description: cardInfo.description
            }
        })
    }

    function reorderCards(sourceIndex, destIndex){
        const result = Array.from(cardsState);
        const [removed] = result.splice(sourceIndex, 1);
        result.splice(destIndex, 0, removed);
        console.log(result);
        dispatchCards({
            type: "reorder-cards",
            payload: result
        })
    }

    function getFilesAssociatedWithCard(id){
        return filesState.files.filter(file => file.associatedWithCard === id);
    }

    function getFilesUnassociatedWithAnyCard(id){
        return filesState.files.filter(file => file.associatedWithCard === "");
    }


    return(
        <PortfolioCardContext.Provider value={{
            projectInfo: projectInfoState,
            cards: cardsState.cards,
            files: filesState.files,
            editProjectInfo,
            addCard,
            deleteCard,
            editCard,
            getCard,
            associateFileWithCard,
            unassociateFileWithCard,
            getFilesAssociatedWithCard,
            getFilesUnassociatedWithAnyCard
        }}>
            {props.children}
        </PortfolioCardContext.Provider>
    )
}