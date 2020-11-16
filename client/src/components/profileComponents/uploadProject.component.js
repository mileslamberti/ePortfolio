import React, { useState, useEffect }from 'react';
import FileUpload from "../fileUpload.component"

import { Form, Button } from 'react-bootstrap'

import firebase from "firebase";
import InitFirebase from "../../services/initFirebase";

import authHeader from "../../services/auth-header";
import userService from "../../services/user.service";
import axios from 'axios'

import {IconButton} from '@material-ui/core';
import { Delete, Folder, PictureAsPdfOutlined, Image, ArrowBack} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

function UploadPortfolio (props){
    const [ProjectTitle, setProjectTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [userHandle, setUserHandle] = useState('');
    // Files that have been accepted by the DND interface
    const [AccceptedDNDFiles, setAccceptedDNDFiles] = useState([]);
    const [RejectedDNDFiles, setRejectedDNDFiles] = useState([]);

    // Files that will be uploaded to the database on submit
    const [AcceptedFiles, setAcceptedFiles] = useState([]);
    const profileHandle = props.profileHandle;
    useEffect(() => {
        function getHandle(){
            if (userHandle === ''){
                userService.getMe().then(user =>{
                    setUserHandle(user.handle);
                });
            }
        }
        getHandle()
        InitFirebase();
    },[]);
    const onChangeProjectTitle = (e) => {
        setProjectTitle(e.target.value);
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    const updateAccepted = (acceptedFiles) => {
        setAccceptedDNDFiles(acceptedFiles);
        // Filter removes duplicate files by .name property; sorts by .name
        let combineFiles = AcceptedFiles.concat(acceptedFiles).filter((file, index, self) =>
            self.findIndex(f => f.name === file.name) === index
        ).sort(
            (f1, f2) => {
                return f1.name < f2.name;
            }
        )
        setAcceptedFiles(combineFiles);
    }

    const updateRejected = (rejectedFiles) => {
        setRejectedDNDFiles(rejectedFiles);
    }


    // sumbits to the given path once it has recieved the number of files specified by numFiles
    const submitToDatabase = (path, filename, newLink, links, numFiles, projectID) => {
        links.push({
            file: newLink,
            filename: filename,
            cardID: ""
        })
        if (links.length === numFiles){
            const project = {
                projectID: projectID,
                title: ProjectTitle,
                description: Description,
                files: links
            }
            axios.post(path, project, { headers: authHeader() })
            .then( res => {
                console.log(project);
                console.log(res.data);
                setProjectTitle('');
                setDescription('');
                // TODO HANDLE RESETTING BETTER
                //window.location="/uploadProject";
            });
        }
    }

    const onSubmit = (event) => {
        const projectID = `project${Math.round(Math.random()*100000000)}`
        event.preventDefault();
        
        console.log("Number of Files on submission: ", AcceptedFiles.length);
        const project = {
            projectID : projectID,
            title : ProjectTitle,
            description: Description
        }
        //save project info to database
        axios.post(`${API_URL}/saveproject`, project, { headers: authHeader() })
            .then (res => {
                console.log(res.data);
                if (AcceptedFiles.length === 0)  {
                    window.location=`/${userHandle}/${projectID}`;
                }
            })
        AcceptedFiles.forEach((file) => {
            // upload file to storage
            firebase.storage().ref(`/${userHandle}/projects/${projectID}/${file.name}`).put(file)
                .then( snapshot => {
                    console.log(`Succefully uploaded ${file.name}`);          
                    // add file to project's file collection
                    snapshot.ref.getDownloadURL().then( downloadLink => {
                        const newFile = {
                            file: downloadLink,
                            filename: file.name,
                            associatedWithCard: ""
                        }
                        axios.post(`${API_URL}/files/${projectID}`, newFile, { headers: authHeader() })
                            .then(res =>{
                                console.log(res.data);
                                window.location=`/${userHandle}/${projectID}`;

                            })
                    })

                })
                .catch(err => {
                    console.log(err);
                })
        }); 

        
    }

    function getListItemIcon(fileType){
        switch(fileType){
            case "application/pdf":
                return <PictureAsPdfOutlined />;
            case "image/png" || "image/jpeg":
                return <Image />
            default:
                return <Folder />;
        }
    }

    const backClick = () => {
        window.history.back();
    };

    return(
        <div>
        <IconButton color="secondary"> <ArrowBack onClick={backClick}/> </IconButton>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form id="uploadForm" onSubmit={onSubmit}>
                <Form.Group controlId="ProjectTitle">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control type="text"
                                  name={ProjectTitle}
                                  onChange={onChangeProjectTitle}
                                  placeholder="Enter the name of your portfolio"/>
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea"
                                  rows="6"
                                  placeholder="Give a brief description of your portfolio"
                                  name={Description}
                                  onChange={onChangeDescription}
                    />
                </Form.Group>
                
                <div className="file-upload-container">
                    <FileUpload updateAccepted={updateAccepted} updateRejected={updateRejected}/>
                </div>
                <br/>
                <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    onSubmit={onSubmit}>
                    Submit
                </Button>

                <List>
                    {AcceptedFiles.map((file, index) => 
                    <ListItem key={index}>
                        <ListItemAvatar>
                        <Avatar>
                            {getListItemIcon(file.type)}
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary={file.name}
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete"
                            onClick={() => {
                                const newFiles = [...AcceptedFiles]
                                newFiles.splice(index, 1);
                                setAcceptedFiles(newFiles)
                            }}
                        >
                            <Delete />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>,
                    )}
                </List>
                

            </Form>
        </div>
        </div>
    )
}

export default UploadPortfolio