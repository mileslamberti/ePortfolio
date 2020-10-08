import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import DP from "./profileComponents/dp.component";
import AboutMe from "./profileComponents/aboutMe.component";
import Projects from "./profileComponents/projects.component";

function MyProfile (){

    
    return (
        <div className="container">
            <DP/>
            <div className="row">
                
                <div className="col-xl-">
                    <AboutMe/>
                </div>
            </div>
            <div className="row">
                <Projects/>
            </div>
        </div>
    )
    
  }

export default MyProfile;