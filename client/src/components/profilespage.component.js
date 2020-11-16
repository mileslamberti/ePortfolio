import React from "react";
import axios from "../api";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

import { Card } from "react-bootstrap" ;
import Button from '@material-ui/core/Button';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function ProfilesPage(){

    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [Tags, setTags] = useState([]);
    const [Dp, setDp] = useState([]);

    useEffect( () => {
        axios.get("/profiles")
            .then( res => {
                var loadedProfiles=[]
                setProfiles(res.data.users);
                res.data.users.forEach( (user, index) => {
                    const newUser = {
                        handle: user,
                        dp: '',
                        displayName: '',
                        description: ''
                    }
                    loadedProfiles.push(newUser);
                    console.log(user, index);
                    getDpInfo(loadedProfiles, index);
                    getProfileInfo(loadedProfiles, index);
                    getTagsInfo(loadedProfiles, index);                    
                })
            })
            .catch( err => {
                console.log(err);
            })
    }, []);

    const saveProfileCard = (loadedProfiles, index, aboutMe) => {
        var updatedProfile = loadedProfiles[index]
        updatedProfile=loadedProfiles[index];
        updatedProfile.displayName = aboutMe.displayName;
        updatedProfile.description = aboutMe.description;
        setProfiles(profiles => profiles.slice(0,index).concat([updatedProfile]).concat(profiles.slice(index+1)));

        // update the user's about me in array profiles
    }

    const saveTagsCard = (loadedProfiles, index, tags) => {
        var updatedProfile = loadedProfiles[index];
        updatedProfile.tags = tags;
        // update the user's info in profiles
        setProfiles(profiles => profiles.slice(0,index).concat([updatedProfile]).concat(profiles.slice(index+1)));

    }

    const saveDpCard = (loadedProfiles, index, dp) => {
        var updatedProfile = loadedProfiles[index]
        updatedProfile.dp = dp;
        // update the user's info in profiles
        setProfiles(profiles => profiles.slice(0,index).concat([updatedProfile]).concat(profiles.slice(index+1)));

    }

    const getProfileInfo = (loadedProfiles, index) => {
        const userHandle = loadedProfiles[index].handle;
        axios.get(`/${userHandle}/aboutme`).then( res => {
            switch (res.status){
                case 200:
                    // return res.data.aboutMe;
                    saveProfileCard(loadedProfiles, index, res.data.aboutMe);
                    break;
                case 204:
                    // user has no about me 
                    break;
            } 
        }).catch( err => console.log(err))
    }

    const getTagsInfo = (loadedProfiles, index) => {
        const userHandle = loadedProfiles[index].handle;

        axios.get(`/${userHandle}/tags`).then( res => {
            switch (res.status){
                case 200:
                    saveTagsCard(loadedProfiles, index, res.data.tags);
                    // return res.data.tags;
                    break;
                case 204:
                    // user has no tags 
                    break;
            } 
        }).catch( err => console.log(err))
    }

    const getDpInfo = (loadedProfiles, index) => {
        const userHandle = loadedProfiles[index].handle;
        axios.get(`/${userHandle}/dp`).then( res => {
            switch (res.status){
                case 200:
                    saveDpCard(loadedProfiles, index, res.data.profilePic);
                    // return res.data.profilePic;
                    break;
                case 204:
                    // user has no tags 
                    break;
            } 
        }).catch( err => console.log(err))
    }
    const containsTag = (tags, searchedTag) => {
        var found = false;
        
        tags.forEach(tag => {
            console.log(`Comparing:|${tag.toLowerCase()}|, and:|${searchedTag.toLowerCase()}|`)
            if ( tag.toLowerCase().includes(searchedTag.toLowerCase())){
                found = true;
            }

        })
        return found;
    }
    const filteredProfiles = profiles.filter( profile => {
        // only show profiles that have a displayName
        if (profile.hasOwnProperty("displayName")){
            var found = (
                profile.displayName.toLowerCase().includes( search.toLowerCase() )
                    || profile.description && profile.description.toLowerCase().includes( search.toLowerCase() )
                    || profile.handle && profile.handle.toLowerCase().includes( search.toLowerCase() )
                    || profile.tags && containsTag(profile.tags, search)
            );
            return found
        }
    })
    const renderTags = (tags) => {
        if (tags){
            return ( 
                <li style={{
                    display:"inline-flex",
                    flexWrap: "wrap",
                    margin: 0,
                    padding: 0,
                    width: "100%"
                }}>
                    {tags.map((tag, i) => renderTag(tag))}
                </li>
            );
        }
    }
    const renderTag = (tag) => {
        return (
            <>
                <Button size="small" variant="outlined" onClick={() => handleTagClick(tag)}>
                    {tag}
                </Button>

            </>
          );
    }
    const handleTagClick = (tag) => {
        setSearch(tag)
    }
    const renderCard = (profile, index) => {
        return(
            <div className="col-md-3" style={{ marginTop: "20px" }}>
                <Card style={{ width: '18rem' }} key={ index }>
                <Card.Img variant="top" src="holder.js/100px180" src= {profile.dp}/>
                <Card.Body>
                {/* <Card.Img variant="top" src="holder.js/100px180" src= {card.image}/> */}
                    <Card.Title>{profile.displayName}</Card.Title>
                    <Card.Text>{profile.description}</Card.Text>
                    <Card.Text>username: {profile.handle}</Card.Text>
                    <Card>{renderTags(profile.tags)}</Card>
                    <Button href={`/${profile.handle}`} size="large" variant="contained">View user</Button>
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
            </div>
        </div>
    );
}
export default ProfilesPage;