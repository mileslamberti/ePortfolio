
import axios from 'axios';
import authHeader from "../services/auth-header";
const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

export const ACTIONS = {
    UPDATE_PROJECT_INFO: "update-project-info",
    ADD_CARD: "add-card",
    DELETE_CARD: "delete-card",
    UPDATE_CARD: "update-card",
    REORDER_CARD: "reorder-card",
    ADD_FILE: "add-file",
    ASSOCIATE_CARD: "associate-card",
    UNASSOCIATE_CARD: "unassociate-card"
}

export function projectInfoReducer(state, action){
    switch(action.type){
        case ACTIONS.UPDATE_PROJECT_INFO:
            return{
                ...state,
                title: action.payload.title,
                description: action.payload.description,
                projectID: action.payload.projectID,
                files: action.payload.files
            }
        default:
            console.log("in default");
            return state
    }
}

export function cardReducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_CARD:
            return{
                ...state,
                cards: [...state.cards, action.payload]

            }
        case ACTIONS.DELETE_CARD:
            const deletedCards = state.cards.filter(card => card.id !== action.payload).map((card, index) => {
                return {...card, ...{position:index}}})
            return {
                ...state,
                cards: deletedCards
            }

        case ACTIONS.UPDATE_CARD:
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
        case ACTIONS.REORDER_CARD:
            // Swaps the source and destination index
            const result = Array.from(state.cards);
            const [removed] = result.splice(action.payload.sourceIndex, 1);
            result.splice(action.payload.destIndex, 0, removed);
            const fixed = result.map((card, index) => {
                return{...card, ...{position: index}}
            })
            const reorderedCards = state.cards.map((card, index) => {
                return{...card, ...fixed[index]}
            })
            reorderedCards.forEach(card => {
                axios.post(`${API_URL}/projectcards/`, card, { headers: authHeader() })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => console.log(err));
            })

            return {
                ...state.cards,
                cards: reorderedCards
            }
        default:
            return state;
    }
}

export function fileReducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_FILE:
            return{
                ...state,
                files: [...state.files, action.payload]
            }
        case ACTIONS.ASSOCIATE_CARD:
            return {
                ...state,
                files: state.files.map(file => {
                    if(file.filename === action.payload.filename){
                        return{...file, ...action.payload}
                    }
                    return file;
                })
            }
        case ACTIONS.UNASSOCIATE_CARD:
            return{
                ...state,
                files: state.files.map(file => {
                    if(file.associatedWithCard === ""){
                        console.log("File not associated with any card")
                    }
                    if(file.filename === action.payload.filename){
                        return{...file, ...action.payload}
                    }
                    return file;
                })
            }
        default:
            return state;
    }
}