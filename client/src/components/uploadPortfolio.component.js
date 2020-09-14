import React, {useState} from 'react'
import Axios from 'axios'

import { Form, Button, ButtonGroup, ToggleButton} from 'react-bootstrap'


function UploadPortfolio (){
    const [fileUploadStrategy, setFileUploadStrategy] = useState(true);

    const uploadStrategy = (fileUploadStrategy) =>{
        if(fileUploadStrategy === 1){
            return "You selected uploading images"
        }
        else if(fileUploadStrategy === 2){
            return "You selected uploading images"
        }
    }
    return(
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <Form>
                <Form.Group controlId="PortfolioName">
                    <Form.Label>Portfolio Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name of your portfolio"/>
                </Form.Group>

                <Form.Group controlId="PortfolioDescription">
                    <Form.Label>Portfolio Description</Form.Label>
                    <Form.Control as="textarea" rows="6" placeholder="Give a brief description of your portfolio"/>
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
                        if (fileUploadStrategy === 1) {
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
                        else if(fileUploadStrategy === 2){
                            return "You selected uploading images"
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
                    size="lg">
                    Submit
                </Button>
                

            </Form>

        </div>

    )
}

export default UploadPortfolio