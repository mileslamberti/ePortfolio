import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import EditAboutMe from "./editAboutMe.component"

export default class AboutMe extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: "",
            inspirations: "",
            jobs:"",
            experiences:""
        };
    }
    componentWillMount(){
        // TODO hard code remove
        axios.get("http://localhost:9000/aboutme/5f5f245a79559420689a8de9")
            .then( res => {
                this.setState({ 
                    displayName: res.data.displayName,
                    inspirations: res.data.inspirations,
                    jobs: res.data.jobs,
                    experiences: res.data.experiences })
            })
            .catch( err => {
                console.log(err);
            })
    }
    render() {
        return (
            <Router>
                <div>
                    <h3>Hi I am {this.state.displayName}</h3>
                    <h3>I would love to {this.state.inspirations}</h3>
                    <h3>I have worked as a {this.state.jobs}</h3>
                    <h3>I have experienced {this.state.experiences}</h3>
                    <Button href="/edit" variant="secondary">Edit about me</Button>
                </div>
                {/* <div className="container"> */}
                    <Route path="/edit" exact component={EditAboutMe}/>
                {/* </div> */}
            </Router>
        )
    }
}
