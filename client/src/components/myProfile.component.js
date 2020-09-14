import React from 'react';
//import { Grid, Nav, NavDropdown } from 'react-bootstrap';


import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import UploadProject from "./profileComponents/uploadProject.component";
import Projects from "./profileComponents/projects.component";

const axios=require("axios");

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myfile',this.state.file);
        console.log(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:9000/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
  
    onChange(e) {
        this.setState({file:e.target.files});
    }
  
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <DP/>
                    </div>
                    <div class="col-xl-">
                        <AboutMe/>
                    </div>
                </div>
                <div class="row">
                    <UploadProject/>
                </div>
                <div class="row">
                    <Projects/>
                </div>
            </div>
        )
    }
  }
