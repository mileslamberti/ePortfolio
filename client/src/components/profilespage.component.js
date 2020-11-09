import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap" ;
import { get } from 'jquery';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function ProfilesPage(){

    const [search, setSearch] = useState('');
    const [profiles, setProfiles, setTags] = useState([]);

    useEffect( () => {
        axios.get(API_URL + "/profiles")
            .then( res => {
                res.data.users.forEach(user => {
                    getProfileInfo(user);
                    getTagsInfo(user);
                })
            })
            .catch( err => {
                console.log(err);
            })
    }, []);

    // const renderProfileCard = (handle, aboutMe, index, imageUrl) => {
    //     return(
    //         <div className="col-md-3" style={{ marginTop: "20px" }}>
    //             <Card style={{ width: '18rem' }} key={ index }>
    //             <Card.Img variant="top" src="holder.js/100px180" src= {imageUrl}/>
    //             <Card.Body>
    //                 <Card.Img variant="top" src="holder.js/100px180" src= {imageUrl}/>
    //                 <Card.Title>{aboutMe.displayName}</Card.Title>
    //                 <Card.Text>{aboutMe.description}</Card.Text>
    //                 <Card.Text>{handle}</Card.Text>
    //                 <Button href={`/${handle}`} variant="primary">View Profile</Button>
    //             </Card.Body>
    //             </Card>
    //         </div>
    //     );
    // }
    const saveProfileCard = (handle, aboutMe, tags) => {
        const newProfile = {
            image: '', 
            displayName: aboutMe.displayName, 
            handle: handle,
            description: aboutMe.description,
        }
        console.log(newProfile);
        setProfiles(profiles => profiles.concat([newProfile]));
    }

    const saveTagsCard = (tags) => {
        const newProfile = {
           tags: tags
        }
        console.log(newProfile);
        setTags(profiles => profiles.concat([newProfile]));
    }

    const getProfileInfo = (handle) => {
        axios.get(API_URL+`/${handle}/aboutme`).then( res => {
            switch (res.status){
                case 200:
                    saveProfileCard(handle, res.data.aboutMe);
                    break;
                case 204:
                    // user has no about me 
                    break;
            } 
        }).catch( err => console.log(err))
    }

    const getTagsInfo = (handle) => {
        axios.get(API_URL+`/${handle}/tags`).then( res => {
            switch (res.status){
                case 200:
                    saveTagsCard(res.data.tags);
                    break;
                case 204:
                    // user has no about me 
                    break;
            } 
        }).catch( err => console.log(err))
    }
    const filteredProfiles = profiles.filter ( profile => {
       return profile.displayName.includes( search )
    })

    const renderCard = (card, index) => {
        return(
            <div className="col-md-3" style={{ marginTop: "20px" }}>
                <Card style={{ width: '18rem' }} key={ index }>
                <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/>
                <Card.Body>
                <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/>
                    <Card.Title>{card.displayName}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Card.Text>{card.tag}</Card.Text>
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
export default ProfilesPage;