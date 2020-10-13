import React, { useState, useEffect }from 'react';
import Axios from 'axios'
import FileUpload from "../fileUpload.component"

import { Form, Button } from 'react-bootstrap'

import firebase from "firebase";
import InitFirebase from "../../services/initFirebase";

import userService from "../../services/user.service";

const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

const UploadPortfolio = () => {
    const [fileUploadStrategy, setFileUploadStrategy] = useState(2);
    const [PortfolioName, setPortfolioName] = useState('');
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
    },[]);
    const [isUploading, setIsUploading] = useState(false);
    // TODO HANDLE THE INIT BETTER
    InitFirebase();

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

    const onSubmit = (event) => {
        event.preventDefault();
        
        const variables = {
            name: PortfolioName,
            description: Description,
            files: Files
        }
        console.log("Number of Files on submission", variables.files.length)
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
                firebase.storage().ref(`/${userHandle}/projects/images/img${Math.round(Math.random()*100000000)}.jpg`).put(binaryStr, {contentType:`image/${file.path.split(".")[1]}`})
                    .then(res => {
                        console.log("Succefully uploaded file");
                    })
                    .catch(err => {
                        console.log(err);
                    })
                     
            }
            reader.readAsArrayBuffer(file);
          //})
        })
    }
    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form id="uploadForm" onSubmit={onSubmit}>
                <Form.Group controlId="PortfolioName">
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control type="text"
                                  name={PortfolioName}
                                  placeholder="Enter the name of your portfolio"/>
                </Form.Group>

                <Form.Group controlId="PortfolioDescription">
                    <Form.Label>Portfolio Description</Form.Label>
                    <Form.Control as="textarea"
                                  rows="6"
                                  placeholder="Give a brief description of your portfolio"
                                  name={Description}/>
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