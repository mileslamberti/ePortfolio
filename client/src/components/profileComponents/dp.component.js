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
                {!this.state.choosenDP && <form onSubmit={this.onFormSubmit}>
                    <input type="file" className="btn" name="dpImage" />
                    <button className="upload-button" type="submit">Upload new DP</button>
                </form>}
            </div>
        )
    }
}
