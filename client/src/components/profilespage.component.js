import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap" ;


function ProfilePage(){

    const [search, setSearch] = useState('')
    
    const cardInfo = [
        { image: "", displayName: "Misko Denasha", handle: "mishtest",description: "Software Engineer"},
    ];

    const filteredProfiles = cardInfo.filter ( profile => {
       return profile.displayName.includes( search )
    })

    const renderCard = (card, index) => {
        return(
            <div className="col-md-3" style={{ marginTop: "20px" }}>
                <Card style={{ width: '18rem' }} key={ index }>
                <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/>
                <Card.Body>
                    <Card.Title>{card.displayName}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Card.Text>{card.handle}</Card.Text>
                    <Button href={`/${card.handle}`} variant="primary">View Profile</Button>
                </Card.Body>
                </Card>
            </div>
        
        );
    }

    return (
        
        <div >
            <input type="text" placeholder= "Search" onChange= { e => setSearch(e.target.value) }/>
            <div className="row">
                {filteredProfiles.map(renderCard)}
            </div>
        </div>
    );
}
export default ProfilePage;