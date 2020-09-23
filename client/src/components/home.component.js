import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";


import Carousel from "./homeComponents/carousal.component";
import Titles from "./homeComponents/titles.component";

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


function Home(){
    return (
        <Router>
            <Carousel/> 
            <div style = {overlay.style}>
              <h3>Take Your Portfolio to the next level</h3><br/>
              <h5> Why us? </h5>
              <h5> Because we are the best</h5>

              <Button variant ="dark" size="lg" href="/register">
                  Get your profile started now
              </Button>
            </div>
        </Router>
    );
}
export default Home;