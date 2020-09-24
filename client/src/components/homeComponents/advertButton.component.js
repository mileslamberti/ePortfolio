import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthService from "../../services/auth.service";


const overlay = {
  style: {
    background: 'rgba(600, 600, 600, 0.25)',
    borderRadius: '50px',
    padding: '40px 40px 40px 40px',
    position: 'absolute', 
    marginTop: '-600px', marginLeft: '20%',
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
          <h3>Take Your ePortfolio to the next level</h3><br/>
          <h5> Get sahring today</h5>

          <Button variant ="dark" size="lg" href="/sharing">
              Share your ePortfolio today!
          </Button>
        </div>
      ) : ( //if not logged in show advert to create profile
        <div style = {overlay.style}>
          <h3>Take Your Portfolio to the next level</h3><br/>
          <h5> Why us? </h5>
          <h5> Because we are the best</h5>

          <Button variant ="dark" size="lg" href="/register">
              Get your profile started today!
          </Button>
        </div>
      )}
    </Router>
  )
}
