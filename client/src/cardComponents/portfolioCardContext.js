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
    const [filesState, dispatchFiles] = useReducer(reducer, initialFiles);
    
    // TODO get files associated with wihtr
    const [files, setFiles] = useState([])
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
        dispatchCards({
            type: "delete-card",
            payload: id
        })
    }

    return(
        <PortfolioCardContext.Provider value={{
            projectInfo: projectInfoState,
            cards: cardsState.cards,
            files: filesState.files,
            editProjectInfo,
            addCard,
            deleteCard
        }}>
            {props.children}
        </PortfolioCardContext.Provider>
    )
}