import React, { Component } from 'react';
import axios from 'axios';

export default class EditAboutMe extends Component {
    constructor(props){
        super(props);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangeInspirations = this.onChangeInspirations.bind(this);
        this.onChangeJobs = this.onChangeJobs.bind(this);
        this.onChangeExperiences = this.onChangeExperiences.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            displayName: '',
            inspirations: '',
            jobs: [],
            experiences: [],
        }
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
    onChangeDisplayName(e){
        this.setState({
            displayName: e.target.value
        })
    }
    onChangeInspirations(e){
        this.setState({
            inspirations: e.target.value
        })
    }
    onChangeJobs(e){
        this.setState({
            jobs: e.target.value
        })
    }
    onChangeExperiences(e){
        this.setState({
            experiences: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault(); // allows us override the default html stuff

        const aboutMe = {
            displayName: this.state.displayName,
            inspirations: this.state.inspirations,
            jobs: this.state.jobs,
            experiences: this.state.experiences,
        }
        // TODO remove
        console.log("check this!!!!!")
        console.log(aboutMe);

        // TODO remove hard code!!
        axios.post('http://localhost:9000/aboutme/edit/5f5f245a79559420689a8de9', aboutMe)
            .then( res => console.log(res.data));
        window.location = '/myprofile';
    }
    render() {
        return (
            <div>
                <h3>Edit profile</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Display name: eg "Shakira Brimstone"</label>
                        <input type="text"
                            required
                            className ="form-control"
                            value={ this.state.displayName}
                            onChange={this.onChangeDisplayName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Inspirations: eg "to be a viking, to dance on mars"</label>
                        <input type="text"
                            required
                            className ="form-control"
                            value={ this.state.inspirations}
                            onChange={this.onChangeInspirations}
                        />
                    </div>
                    <div className="form-group">
                        <label>Jobs: eg "chef, car salesman"</label>
                        <input type="text"
                            required
                            className ="form-control"
                            value={ this.state.jobs}
                            onChange={this.onChangeJobs}
                        />
                    </div>
                    <div className="form-group">
                        <label>Experiences: eg "diving with dolfins, flying with bees"</label>
                        <input type="text"
                            required
                            className ="form-control"
                            value={ this.state.experiences}
                            onChange={this.onChangeExperiences}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Update profile"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
