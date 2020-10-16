import React, {useState, useEffect, createContext} from 'react';

export const PortfolioCardContext = createContext();

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
    const [cards, setCards] = useState([]);
    // TODO get files associated with wihtr
    const [files, setFiles] = useState([])
    useEffect( () => {
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
    }, []);
    return(
        <PortfolioCardContext.Provider value={[files, setFiles]}>
            {props.children}
        </PortfolioCardContext.Provider>
    )
}