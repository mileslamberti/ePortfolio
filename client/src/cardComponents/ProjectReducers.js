
export const ACTIONS = {
    UPDATE_PROJECT_INFO: "update-project-info",
    ADD_CARD: "add-card",
    DELETE_CARD: "delete-card",
    UPDATE_CARD: "update-card",
<<<<<<< HEAD
=======
    REORDER_CARD: "reorder-card",
>>>>>>> master
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
<<<<<<< HEAD
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            }
=======
            const deletedCards = state.cards.filter(card => card.id !== action.payload).map((card, index) => {
                return {...card, ...{position:index}}})
            return {
                ...state,
                cards: deletedCards
            }

>>>>>>> master
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
<<<<<<< HEAD
=======
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
            return {
                ...state,
                cards: reorderedCards
            }
>>>>>>> master
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
<<<<<<< HEAD
                    if(file.fname === action.payload.fname){
=======
                    if(file.filename === action.payload.filename){
>>>>>>> master
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
<<<<<<< HEAD
                    if(file.fname === action.payload.fname){
=======
                    if(file.filename === action.payload.filename){
>>>>>>> master
                        return{...file, ...action.payload}
                    }
                    return file;
                })
            }
        default:
            return state;
    }
}