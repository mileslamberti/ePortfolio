
export const ACTIONS = {
    UPDATE_PROJECT_INFO: "update-project-info",
    ADD_CARD: "add-card",
    DELETE_CARD: "delete-card",
    UPDATE_CARD: "update-card",
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
                subtitle: action.payload.subtitle
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
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
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
                    if(file.fname === action.payload.fname){
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