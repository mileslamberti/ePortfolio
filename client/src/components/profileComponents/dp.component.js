import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Axios from "axios";

export default class DP extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            imageSRC: require("./images/defaultDP.png"),
            choosenDP: false,
            image: ""
        };

    }

    onChange(event) {
        event.preventDefault();
        console.log(event.target.files);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("file", image, image.name);
    
        Axios.post(
          "http://localhost:5000/eportfolio-4760f/us-central1/api/user/image",
          formData
        )
          .then((res) => {
            this.setState({ image: res.data.image });
          })
          .catch((err) => {
            console.error(err);
          });
      }

      handleChange() {
        const fileInput = document.getElementById("Image");
        fileInput.click();
      }

    onSubmit(event){
        console.log(event.target.file)
        Axios.post("http://localhost:5000/eportfolio-4760f/us-central1/api/uploadImage",
        {image: event.target.file[0]}).then(res => { console.log(res.data)}).catch(err=> {console.error(err)})
    }


    render() {
        return (
            <div>
                <Image src={this.state.image} fluid/>
                {!this.state.choosenDP && <div class="input-group mb-3">
                    <div class="custom-file">
                    <input type="file" id="Image" name="file" hidden="hidden" onChange={this.onChange}/>
                        <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file...</label>
                    </div>
                    <div class="input-group-append">
                        <button onClick={this.handleChange}></button>
                    </div>
                </div>}
            </div>
        )
    }
}
