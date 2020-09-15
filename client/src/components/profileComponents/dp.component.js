import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';

export default class DP extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSRC: require("./images/defaultDP.png"),
            choosenDP: false
        };

    }


    render() {
        return (
            <div>
                <Image src={this.state.imageSRC} fluid/>
                {!this.state.choosenDP && <div class="input-group mb-3">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                        <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file...</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="inputGroupFileAddon02">Upload</span>
                    </div>
                </div>}
            </div>
        )
    }
}
