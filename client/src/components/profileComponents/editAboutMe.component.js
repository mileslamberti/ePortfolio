import React, { useState, useEffect }from 'react';
import axios from 'axios';
import authHeader from "../../services/auth-header";


const API_URL = "http://localhost:5000/eportfolio-4760f/us-central1/api";

export default function EditAboutMe() {

    const [displayName, setDisplayName] = useState("");
    const [inspirations, setInspirations] = useState("");
    const [jobs, setJobs] = useState("");
    const [experiences, setExperiences] = useState("");

    useEffect( () => {
        axios.get(API_URL + "/aboutme", { headers: authHeader() })
            .then( res => {
                console.log(res);
                setDisplayName(res.data.aboutMe.displayName);
                setInspirations(res.data.aboutMe.inspirations);
                setJobs(res.data.aboutMe.jobs);
                setExperiences(res.data.aboutMe.experiences);
            })
            .catch( err => {
                console.log(err);
            })
    }, []);

    const onChangeDisplayName = (e) => {
        setDisplayName(e.target.value);
    }
    const onChangeInspirations = (e) => {
        setInspirations(e.target.value);
    }
    const onChangeJobs = (e) => {
        setJobs(e.target.value);
    }
    const onChangeExperiences= (e) =>{
        setExperiences(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); // allows us override the default html stuff

        const aboutMe = {
            displayName: displayName,
            inspirations: inspirations,
            jobs: jobs,
            experiences: experiences,
        }

        axios.post(API_URL+'/aboutme', aboutMe, { headers: authHeader() })
            .then( res => {
                console.log(res.data);
                window.location = '/profile';
            });
    }
    return (
        <div>
            <h3>Edit profile</h3>
            <form onSubmit={ onSubmit }>
                <div className="form-group">
                    <label>Display name: eg "Shakira Brimstone"</label>
                    <input type="text"
                        required
                        className ="form-control"
                        value={displayName}
                        onChange={onChangeDisplayName}
                    />
                </div>
                <div className="form-group">
                    <label>Inspirations: eg "to be a viking, to dance on mars"</label>
                    <input type="text"
                        required
                        className ="form-control"
                        value= {inspirations }
                        onChange={ onChangeInspirations }
                    />
                </div>
                <div className="form-group">
                    <label>Jobs: eg "chef, car salesman"</label>
                    <input type="text"
                        required
                        className ="form-control"
                        value={ jobs }
                        onChange={ onChangeJobs }
                    />
                </div>
                <div className="form-group">
                    <label>Experiences: eg "diving with dolfins, flying with bees"</label>
                    <input type="text"
                        required
                        className ="form-control"
                        value={ experiences }
                        onChange={ onChangeExperiences }
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

