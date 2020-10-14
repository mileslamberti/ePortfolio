import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


export default class Projects extends Component {
    render() {
        return (
            <div>
                <h1>PROJECTS WILL GO HERE</h1>
                <Button href="/uploadProject" variant="secondary">Upload Project</Button>
            </div>
        )
    }
}
