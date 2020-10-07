import React, {useState, useCallback} from 'react'
import PortfolioCard from "./portfolioCard.component";
import PortfolioTitleCard from "./portfolioTitleCard.component";
import { Grid, Container } from "@material-ui/core";

function EditPortfolio(){

    const [PortfolioName, setPortfolioName] = useState('');
    const [Description, setDescription] = useState('');
    const [cards, setCards] = useState([
        {
            id: 1,
            title: "Title of Portfolio 1",
            description: "Description of Portfolio"
        },
        {
            id: 2,
            title: "Title of Portfolio 2",
            description: "Description of Portfolio"
        },
        {
            id: 3,
            title: "Title of Portfolio 3",
            description: "Description of Portfolio"
        },
        {
            id: 4,
            title: "Title of Portfolio 4",
            description: "Description of Portfolio"
        }
    ])



    return (
    <div>
    <Container>
        <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
                <PortfolioTitleCard 
                    title={"Title of Portfolio"}
                    description={"Description of Portfolio"}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <PortfolioCard title="Assignment 1" description="This is a test description that the user is going to write. We will pull it from the database and it will go here."/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <PortfolioCard title="Assignment 2"/>
            </Grid>
            
            <Grid item xs={12} lg={6}>
                <PortfolioCard title="Assignment 3"/>
            </Grid>
            <Grid item xs={12} lg={6}>
                <PortfolioCard />
            </Grid>
            <Grid item xs={12} lg={6}>
                <PortfolioCard />
            </Grid>
        </Grid>

    </Container>
    </div>
    )
}

export default EditPortfolio;