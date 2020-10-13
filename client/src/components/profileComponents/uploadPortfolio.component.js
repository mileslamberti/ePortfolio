import React, {useState} from 'react'
import Axios from 'axios'
import FileUpload from "../fileUpload.component"

import { Form, Button } from 'react-bootstrap'


function UploadPortfolio (){
    const [PortfolioName, setPortfolioName] = useState('');
    const [Description, setDescription] = useState('');
    const [Files, setFiles] = useState([])

    const updateFiles = (newFiles) =>{
        setFiles(newFiles);
        
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
                    <FileUpload refreshFunction={updateFiles}/>
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