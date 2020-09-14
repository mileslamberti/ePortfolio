import React, { Component } from 'react'

export default class uploadProject extends Component {
    render() {
        return (
            <div class="input-group mb-3">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                    <label class="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                </div>
                <div class="input-group-append">
                    <span class="input-group-text" id="inputGroupFileAddon02">Upload</span>
                </div>
            </div>
        )
    }
}
