import React, { useState, useEffect }from 'react';
import FileUpload from "../fileUpload.component"

import { Form, Button } from 'react-bootstrap'

import firebase from "firebase";
import InitFirebase from "../../services/initFirebase";

import authHeader from "../../services/auth-header";
import userService from "../../services/user.service";
import axios from 'axios'

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const UploadPortfolio = () => {
    const [fileUploadStrategy, setFileUploadStrategy] = useState(2);
    const [ProjectTitle, setProjectTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Files, setFiles] = useState([]);
    const [userHandle, setUserHandle] = useState('');

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
    const [isUploading, setIsUploading] = useState(false);
    const updateFiles = (newFiles) =>{
        setFiles(newFiles);
    }

    const uploadStrategy = (fileUploadStrategy) =>{
        if(fileUploadStrategy === 1){
            return "You selected uploading images"
        }
        else if(fileUploadStrategy === 2){
            return "You selected uploading images"
        }
    }
    const onChangeProjectTitle = (e) => {
        setProjectTitle(e.target.value);
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }
    
    const onSubmit = (event) => {
        const projectID = `project${Math.round(Math.random()*100000000)}`
        event.preventDefault();
        const submitToDatabase = (path, newLink, links, numFiles, authenticationHeader) => {
            links.push(newLink);
            if (links.length === numFiles){
                const project = {
                    projectID: projectID,
                    title: ProjectTitle,
                    description: Description,
                    files: links
                }
                axios.post(path, project, authenticationHeader)
                .then( res => {
                    console.log(res.data);
                    // TODO HANDLE RESETTING BETTER
                    setProjectTitle('');
                    setDescription('');
                    setFiles([]);
                    window.location="/uploadPortfolio";
                });
            }
        }
        console.log("Number of Files on submission", Files.length)
        var links = [];
        Files.forEach((file) => {
            firebase.storage().ref(`/${userHandle}/projects/${projectID}/file${Math.round(Math.random()*100000000)}.jpg`).put(file, {contentType:`image/${file.path.split(".")[1]}`})
                .then( snapshot => {
                    console.log("Succefully uploaded file");
                    //console.log(snapshot.ref.getDownloadURL());
                    snapshot.ref.getDownloadURL().then( res => {
                        submitToDatabase(`${API_URL}/projects`, res, links, Files.length, { headers: authHeader() });
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        });   
        
    }
    return(
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
                <>
                    <Button
                        variant="secondary"
                        onClick={() => setFileUploadStrategy(1)}
                        size="lg"
                        >Upload a Folder</Button>{' '}
                    <Button 
                        variant ="secondary"
                        onClick={() => setFileUploadStrategy(2)}
                        size="lg"
                        >Upload Images</Button>{' '}
                    <Button 
                        variant ="secondary"
                        onClick = {() => setFileUploadStrategy(3)}
                        size="lg"
                        >Upload Documents</Button>{' '}
                </>
                <br/>
                <div className="file-upload-container">
                    {(() => {

                        if(fileUploadStrategy === 2){
                            return (<FileUpload refreshFunction={updateFiles}/>)
                        }
                        else if (fileUploadStrategy === 1) {
                            return(
                                <Form.Group>
                                    <Form.File
                                    className="position-relative"
                                    required
                                    name="file"
                                    label="Please upload the folder containing your project here"
                                    id="validationFormik107"
                                    feedbackTooltip
                                    />
                                </Form.Group>
                            )
                            }
                        else if(fileUploadStrategy === 3){
                            return "You selected uploading documents"
                        }
                    })()}
                    {}
                </div>
                <br/>
                <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    onSubmit={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>

    )
}

export default UploadPortfolio