import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Axios from "axios";

export default class DP extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            imageSRC: require("./images/defaultDP.png"),
            choosenDP: false
        };

    }

    onSubmit(event){
        console.log(event.target.file)
        Axios.post("http://localhost:5000/eportfolio-4760f/us-central1/api/uploadImage",
        {image: event.target.file[0]}).then(res => { console.log(res.data)}).catch(err=> {console.error(err)})
    }


    render() {
        return (
            //original was temporarily scrapped, need to bring that in again
            <div>
                <form onSubmit={this.onSubmit} enctype="multipart/form-data">
                <input type="file" name="fileToUpload" id="fileToUpload"/>
                <input type="submit" value="Upload Image" name="submit"/>
                </form>
            </div>
        )
    }
}
