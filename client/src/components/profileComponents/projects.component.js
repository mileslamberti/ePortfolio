import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import uploadPortfolio from "./uploadPortfolio.component";


export default class Projects extends Component {
    render() {
        return (
            <Router>
                <div>
                    <h1>PROJECTS WILL GO HERE</h1>
                    <Button href="/uploadPortfolio" variant="secondary">Upload Portfolio</Button>
                </div>
                <div className="container">
                    <Route path="/uploadPortfolio" exact component={uploadPortfolio}/>
                </div>
            </Router>
        )
    }
}
