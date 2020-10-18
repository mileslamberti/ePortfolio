import React, {useState, useEffect, createContext, useReducer} from 'react';
import axios from 'axios';
import authHeader from "../services/auth-header";

import {projectInfoReducer, cardReducer, fileReducer, ACTIONS} from './ProjectReducers';
import { ScreenLockLandscapeRounded } from '@material-ui/icons';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const initialCards = {
    cards: []
}

const initialProjectInfo = {
    title: "",
    description: ""
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
                description: cardInfo.description,
                projectID: projectID,
                position: cardsState.cards.length,
                img: "implementImgLink.com"
            }
        });
        const card = {
            id: cardInfo.id,
            title: cardInfo.title,
            subtitle: cardInfo.subtitle,
            description: cardInfo.description,
            projectID: projectID,
            position: cardsState.cards.length,
            img: "implementImgLink.com"
        }
        console.log(card);
        axios.post(`${API_URL}/projectcards/`, card, { headers: authHeader() })
            .then(res => console.log(res));
    }
    function loadCard(cardInfo){
        dispatchCards({
            type: ACTIONS.ADD_CARD,
            payload: {
                id: cardInfo.id,
                title: cardInfo.title,
                subtitle: cardInfo.subtitle,
                description: cardInfo.description,
                position: cardInfo.position,
                projectID: cardInfo.projectID,
                img: cardInfo.img
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
        // backend needs a card object with id and projectID
        const card = {
            id: id,
            projectID: projectID
        }
        // card sent as object to be in expected form card={id,projectID}
        axios.post(`${API_URL}/deleteprojectcard/`, card, { headers: authHeader() })
            .then(res => console.log(res));
    }

    function updateCard(cardInfo){
        dispatchCards({
            type: ACTIONS.UPDATE_CARD,
            payload: {
                id: cardInfo.id,
                title: cardInfo.title,
                subtitle: cardInfo.subtitle,
                description: cardInfo.description,
                position: cardInfo.position,
                projectID: cardInfo.projectID,
                img: cardInfo.img
            }
        })
        axios.post(`${API_URL}/projectcards/`, cardInfo, { headers: authHeader() })
            .then(res => console.log(res.data));
    }

    function getCard(id){
        for(let i=0; i<cardsState.cards.length; i++){
            if(cardsState.cards[i].id === id){
                return cardsState.cards[i];
            }
        }
    }

    /** Functions that manage projectInfoState */
    function editProjectInfo(project){
        dispatchProjectInfo({
            type: ACTIONS.UPDATE_PROJECT_INFO,
            payload: {
                title: project.title,
                description: project.description,
                projectID: project.projectID,
                files: project.files,
            }
        });
        axios.post(`${API_URL}/projects/`, project, { headers: authHeader() })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    /** Functions that manage projectInfoState */
    function loadProjectInfo(project){
        dispatchProjectInfo({
            type: ACTIONS.UPDATE_PROJECT_INFO,
            payload: {
                title: project.title,
                description: project.description,
                projectID: project.projectID,
                files: project.files,
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
    function loadFile(fname, downloadLink, cardid){
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
                 console.log(project);
                 loadProjectInfo(project);
                 
                 project.files.forEach(file => {
                    loadFile(file.filename, file.file, file.cardID)
                 })
             })
             .catch( err => {
                 console.log("Error", err);
             })
        // To add get request for cards.
        axios.get(`${API_URL}/getprojectcards/${projectID}`,{ headers: authHeader() })
            .then( cardRes => {
                console.log("CARDS", cardRes);
                cardRes.data.cards.forEach( card => {
                    loadCard(card.card);
                })
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
            loadCard,
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