import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap" ;


function ProfilePage(){

    const [search, setSearch] = useState('')
    
    const cardInfo = [
        { image: "", title: "Girish", text: "Software Engineer"},
        { image: "", title: "Auren", text: "Graphics Designer"},
        { image: "", title: "Miles", text: "Web developer"},
        { image: "", title: "Abdiaziz", text: "Hardware Engineer"},
        { image: "", title: "Will", text: "Software Engineer"},
        { image: "", title: "Jenny", text: "Security Analyst"},
        { image: "", title: "Mark", text: "Hardware Engineer"},
        { image: "", title: "Jacob", text: "Web developer"},
        { image: "", title: "Tom", text: "Software Engineer"},
        { image: "", title: "Laural", text: "Graphics Designer"},
        { image: "", title: "Emma", text: "Hardware Engineer"},
        { image: "", title: "Mia", text: "Web developer"},
        { image: "", title: "Sophia", text: "Graphics Designer"},
        { image: "", title: "Jack", text: "Software Engineer"},
    ];

    const filteredProfiles = cardInfo.filter ( profile => {
       return profile.title.includes( search )
    })

    const renderCard = (card, index) => {
        return(
            <div className="col-md-3" style={{ marginTop: "20px" }}>
                <Card style={{ width: '18rem' }} key={ index }>
                <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/>
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                    <Button variant="primary">View Profile</Button>
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