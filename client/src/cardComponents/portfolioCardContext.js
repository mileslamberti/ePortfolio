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
    description: "",
    projectID: "",
    files: []

}

const initialFiles ={
    files:[]
}

export const PortfolioCardContext = createContext();

export const PortfolioCardProvider = props => {
    const projectID = props.location.pathname.split("/")[2];
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
            .then(res => console.log(res.data));
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
            unassociateFileWithCard(file.filename);
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

    function reorderCards(sourceIndex, destIndex){
        dispatchCards({
            type: ACTIONS.REORDER_CARD,
            payload: {sourceIndex: sourceIndex, destIndex: destIndex}
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
    function editProjectInfo(project){
        dispatchProjectInfo({
            type: ACTIONS.UPDATE_PROJECT_INFO,
            payload: {
                title: project.title,
                description: project.description,
                projectID: project.projectID,
            }
        });
        axios.post(`${API_URL}/saveproject/`, project, { headers: authHeader() })
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
            }
        });
    }

    /** Functions that manage filesState */
    function addFile(filename, downloadLink, cardid){
        dispatchFiles({
            type: ACTIONS.ADD_FILE,
            payload: {
                filename: filename,
                downloadLink: downloadLink,
                associatedWithCard: cardid
            }
        })
    }
    function loadFile(file){
        dispatchFiles({
            type: ACTIONS.ADD_FILE,
            payload: {
                filename: file.filename,
                downloadLink: file.file,
                associatedWithCard: file.associatedWithCard
            }
        })
    }

    function associateFileWithCard(filename, cardid){
        dispatchFiles({
            type: ACTIONS.ASSOCIATE_CARD,
            payload: {
                filename: filename,
                associatedWithCard: cardid
            }
        })
        const reqBody = {
            filename: filename,
            id: cardid,
            projectID: projectInfoState.projectID
        }
        axios.post(`${API_URL}/assignfiletocard`,reqBody, { headers: authHeader() })
            .then(res => console.log(res))
    }

    function unassociateFileWithCard(filename){
        dispatchFiles({
            type: ACTIONS.UNASSOCIATE_CARD,
            payload: {
                filename: filename,
                associatedWithCard: ""
            }
        })
        const reqBody = {
            filename: filename,
            id: "",
            projectID: projectInfoState.projectID
        }
        axios.post(`${API_URL}/assignfiletocard`,reqBody, { headers: authHeader() })
            .then(res => console.log(res))
    }

    function getFilesAssociatedWithCard(id){
        return filesState.files.filter(file => file.associatedWithCard === id);
    }

    function getFilesUnassociatedWithAnyCard(id){
        return filesState.files.filter(file => file.associatedWithCard === "");
    }

    useEffect( () => {

        //fetch project
         axios.get(API_URL + `/project/${projectID}`, { headers: authHeader() })
             .then( res => {
                const project = res.data.project;
                loadProjectInfo(project);
             })
             .catch( err => {
                 console.log("Error", err);
             })
        // fetch project files
        axios.get(API_URL + `/files/${projectID}`,{ headers: authHeader() })
            .then( res => {
                const files = res.data.files;
                files.forEach(file => {
                    loadFile(file);
                })
            })
            .catch( err => {
                console.log("Error", err);
            })
        // fetch project cards
        axios.get(`${API_URL}/getprojectcards/${projectID}`,{ headers: authHeader() })
            .then( cardRes => {
                cardRes.data.cards.forEach( card => {
                    loadCard(card.card);
                })
             }).catch( err => {
                console.log("Error", err);
            })
    }, []);





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
            reorderCards,
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