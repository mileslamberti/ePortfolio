import React, {Component} from 'react';
import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";

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
            <div>
                <DP/>
                <h1>My Profile</h1>
                <AboutMe/>
                <form onSubmit={this.onFormSubmit}>
                    <input type="file" className="btn" name="myImage" onChange= {this.onChange} />
                    {console.log(this.state.file)}
                    <button className="upload-button" type="submit">Upload Project</button>
                </form>
            </div>
        )
    }
  }
