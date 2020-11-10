import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap" ;
import { get } from 'jquery';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function ProfilesPage(){

    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [Tags, setTags] = useState([]);
    const [Dp, setDp] = useState([]);

    useEffect( () => {
        axios.get(API_URL + "/profiles")
            .then( res => {
                res.data.users.forEach(user => {
                    getProfileInfo(user);
                    getTagsInfo(user);
                    getDpInfo(user);
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
    const saveProfileCard = (handle, aboutMe) => {
        const newProfile = {
            image: '', 
            displayName: aboutMe.displayName, 
            handle: handle,
            description: aboutMe.description,
        }
        //console.log(newProfile);
        setProfiles(profiles => profiles.concat([newProfile]));
    }

    const saveTagsCard = (handle, tags) => {
        const newtags = {
            handle:handle,
            tags: tags
        }
        //console.log(newtags);
        setTags(Tags => Tags.concat([newtags]));
    }

    const saveDpCard = (handle, dp) => {
        const newDp = {
            handle:handle,
            dp: dp
        }
        console.log(newDp);
        setDp(Dp => Dp.concat([newDp]));
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
                    saveTagsCard(handle, res.data.tags);
                    break;
                case 204:
                    // user has no tags 
                    break;
            } 
        }).catch( err => console.log(err))
    }

    const getDpInfo = (handle) => {
        axios.get(API_URL+`/${handle}/dp`).then( res => {
            switch (res.status){
                case 200:
                    saveDpCard(handle, res.data.profilePic);
                    break;
                case 204:
                    // user has no tags 
                    break;
            } 
        }).catch( err => console.log(err))
    }

    const filteredProfiles = profiles.filter ( profile => {
       return profile.displayName.toLowerCase().includes( search.toLowerCase() )
    })

    const displayTags = Tags.filter( tag =>{
        return tag.tags.includes( search.toLowerCase() )
    })

    const displayDp = Dp.filter( dp =>{
        return dp.dp
    })
    // const filteredTags = Tags.filter ( profile => {
    //     return profile.tags.includes( search )
    //  })

    const renderCard = (card, index) => {
        return(
            <div className="col-md-3" style={{ marginTop: "20px" }}>
                <Card style={{ width: '18rem' }} key={ index }>
                <Card.Img variant="top" src="holder.js/100px180" src= {card.dp}/>
                <Card.Body>
                {/* <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/> */}
                    <Card.Title>{card.displayName}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Card>{card.tags}</Card>
                    <Button href={`/${card.handle}`} variant="primary">View Profile</Button>
                </Card.Body>
                </Card>
            </div>
        
        );
    }

    return (
        <div >
            <input type="text" placeholder= "Search by Name or Skill" onChange= { e => setSearch(e.target.value) }/>
            <div className="row">
                {filteredProfiles.map(renderCard)}
                {displayTags.map(renderCard)}
                {displayDp.map(renderCard)}
            </div>
        </div>
    );
}
export default ProfilesPage;