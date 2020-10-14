import React, {useState} from 'react'
import Axios from 'axios'
import FileUpload from "../fileUpload.component"

import { Form, Button } from 'react-bootstrap'
import {Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography} from '@material-ui/core';
import {Favorite, Share, ExpandMore, Edit, Delete, Remove, ZoomOutMap, Folder, PictureAsPdfOutlined, Image} from '@material-ui/icons';
import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Avatar} from '@material-ui/core';

function UploadPortfolio (){
    const [PortfolioName, setPortfolioName] = useState('');
    const [Description, setDescription] = useState('');

    // Files that have been accepted by the DND interface
    const [AccceptedDNDFiles, setAccceptedDNDFiles] = useState([]);
    const [RejectedDNDFiles, setRejectedDNDFiles] = useState([]);

    // Files that will be uploaded to the database on submit
    const [AcceptedFiles, setAcceptedFiles] = useState([]);

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

    const displayAcceptedFiles = AcceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));


    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            name: PortfolioName,
            description: Description,
            files: AcceptedFiles
        }
        console.log("Number of Files on submission", variables.files.length)

        AcceptedFiles.forEach((file) => {
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
  
              Axios.post('http://localhost:9000/projects/uploadFile', formData, config)
                  .then(response =>{
                      if(response.data.success){
                          console.log("Success files");
                      } 
                      else{
                          alert("Failed to save the Image in Server")
                      }
                  })
                  .catch((error) => console.log(error))
              const binaryStr = reader.result
              
             
              console.log(binaryStr)
            }
            reader.readAsArrayBuffer(file)
          })
        
        Axios.post('http://localhost:9000/projects/uploadPortfolio', variables)
            .then(response => {
                console.log(response)
            })
            .catch( (error) => console.log(error))
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

    )
}

export default UploadPortfolio