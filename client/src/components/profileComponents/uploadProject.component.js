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
    const [fileLinks, setFileLinks] = useState([]);

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
        event.preventDefault();
        
        console.log("Number of Files on submission", Files.length)
        Files.forEach((file) => {

            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
                const formData = new FormData();
                const config = {
                      header: {'content-type': 'multipart/form-data'}
                }
                 formData.append("file", file, file.path)

                const binaryStr = reader.result
                var uploadTask = firebase.storage().ref(`/${userHandle}/projects/images/img${Math.round(Math.random()*100000000)}.jpg`).put(binaryStr, {contentType:`image/${file.path.split(".")[1]}`})
                .then( snapshot => {
                    console.log("Succefully uploaded file");
                    //console.log(snapshot.ref.getDownloadURL());
                    snapshot.ref.getDownloadURL().then( res => {
                        console.log(res);
                        setFileLinks( res => fileLinks.concat(res));
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
                 
        })
        const project = {
            projectID: `project${Math.round(Math.random()*100000000)}`,
            title: ProjectTitle,
            description: Description,
            files: fileLinks
        }
        console.log(project);
        axios.post(API_URL+'/projects', project, { headers: authHeader() })
            .then( res => {
                console.log(res.data);
                setFileLinks([]);
                setProjectTitle('');
                setDescription('');
                setFiles([]);
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