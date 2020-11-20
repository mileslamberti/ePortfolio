import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router } from "react-router-dom";
import AuthService from "../../services/auth.service";


const overlay = {
  style: {
    color: 'white',
    textShadow: 'white 0px 0px 10px',
    borderRadius: '50px',
    padding: '40px 40px 40px 40px',
    position: 'absolute', 
    display:'flex',
    flexDirection: 'column',
    top: '33%',
    left: '18%',
    marginRight: '150px',
    width:'70%',
    alignItems: "center",
    textAlign: "center"
  }
}

export default function AdvertButton() {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (

    <Router>
      {currentUser ? ( // if logged in display sharing profile
        <div style = {overlay.style}>
          <h3 style={{fontSize: '50px',fontFamily: 'Georgia'}}>Take Your ePortfolio to the next level</h3><br/>
          <h5 style={{fontSize: '40px',fontFamily: 'Georgia'}}> Get sharing today</h5>
          <br/>
          <Button variant ="dark" size="lg" href="/profilespage">
              Check out other users profiles!
          </Button>
        </div>
      ) : ( //if not logged in show advert to create profile
        <div style = {overlay.style}>
          <h3>Take Your Portfolio to the next level</h3><br/>
          <h5> Why us? </h5>
          <h5> Because we are the best</h5>
          <br/>
          <Button variant ="dark" size="lg" href="/register">
              Get your profile started today!
          </Button>
        </div>
      )}
    </Router>
  )
}
