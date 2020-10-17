import React, {useState, useEffect, createContext, useReducer} from 'react';
import axios from 'axios';
import authHeader from "../services/auth-header";

import {projectInfoReducer, cardReducer, fileReducer, ACTIONS} from './ProjectReducers';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const initialCards = {
    cards: [{
        id: "card-1",
        title: "Title",
        subtitle: "Subtitle",
        description: "Description"
    }]
}

const initialProjectInfo = {
    title: "",
    subtitle: ""
}

const initialFiles ={
    files:[]
}

export const PortfolioCardContext = createContext();

export const PortfolioCardProvider = props => {
    const projectID = props.location.pathname.split("/")[3];
    const [projectInfoState, dispatchProjectInfo] = useReducer(projectInfoReducer, initialProjectInfo);
    const [cardsState, dispatchCards] = useReducer(cardReducer, initialCards);
    const [filesState, dispatchFiles] = useReducer(fileReducer, initialFiles);

    /** Functions that manage cardsState */

    function addCard(cardInfo){
        dispatchCards({
            type: ACTIONS.ADD_CARD,
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
            type: ACTIONS.DELETE_CARD,
            payload: id
        })
    }

    function updateCard(cardInfo){
        dispatchCards({
            type: ACTIONS.UPDATE_CARD,
            payload: {
                id: cardInfo.id,
                title: cardInfo.title,
                subtitle: cardInfo.subtitle,
                description: cardInfo.description
            }
        })
    }

    function getCard(id){
        for(let i=0; i<cardsState.cards.length; i++){
            if(cardsState.cards[i].id === id){
                return cardsState.cards[i];
            }
        }
    }

    /** Functions that manage projectInfoState */
    function editProjectInfo(title, subtitle){
        dispatchProjectInfo({
            type: ACTIONS.UPDATE_PROJECT_INFO,
            payload: {
                title: title,
                subtitle: subtitle
            }
        });
    }


    /** Functions that manage filesState */
    function addFile(fname, downloadLink, cardid){
        dispatchFiles({
            type: ACTIONS.ADD_FILE,
            payload: {
                fname: fname,
                downloadLink: downloadLink,
                associatedWithCard: cardid
            }
        })
    }

    function associateFileWithCard(fname, cardid){
        dispatchFiles({
            type: ACTIONS.ASSOCIATE_CARD,
            payload: {
                fname: fname,
                associatedWithCard: cardid
            }
        })
    }

    function unassociateFileWithCard(fname){
        dispatchFiles({
            type: ACTIONS.UNASSOCIATE_CARD,
            payload: {
                fname: fname,
                associatedWithCard: ""
            }
        })
    }

    function getFilesAssociatedWithCard(id){
        return filesState.files.filter(file => file.associatedWithCard === id);
    }

    function getFilesUnassociatedWithAnyCard(id){
        return filesState.files.filter(file => file.associatedWithCard === "");
    }

    useEffect( () => {
         axios.get(API_URL + `/project/${projectID}`, { headers: authHeader() })
             .then( res => {
                 const project = res.data.project;
                 editProjectInfo(project.title, project.description);
                 
                 project.files.forEach(file => {
                     // 3rd argument should be file.cardID, but rn db stores unassigned cards as "unassigned" as opposed to ""
                    addFile(file.filename, file.file, "")
                 })
        //         setTitle(project.title);
        //         setDescription(project.description);
        //         setFiles(project.files);
             })
             .catch( err => {
                 console.log("Error", err);
             })
        // To add get request for cards.
        axios.get(`${API_URL}/getprojectcards/${projectID}`,{ headers: authHeader() })
            .then( cardRes => {
                console.log("CARDS", cardRes);
             })
    }, []);




    /* TO do */
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




    return(
        <PortfolioCardContext.Provider value={{
            // variables that can be accessed within the context
            projectInfo: projectInfoState,
            cards: cardsState.cards,
            files: filesState.files,

            // functions that can be accessed within the context
            editProjectInfo,
            addCard,
            deleteCard,
            updateCard,
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