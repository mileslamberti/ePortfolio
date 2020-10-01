import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from "react-router-dom";


import Carousel from "./carousal.component";
import Titles from "./titles.component";
//import styled from 'styled-components';

const overlay = {
  style: {
    background: 'rgba(600, 600, 600, 0.25)',
    borderRadius: '50px',
    padding: '40px 40px 40px 40px',
    position: 'absolute', 
    marginTop: '-38%', marginLeft: '30%', 
    alignItems: "center",
    textAlign: "center"
  }
}


function Home(){
    return (
        <Router>
            <Carousel/> 
            <div style = {overlay.style}>
              <h2>Take Your Portfolio to the next level</h2><br/>
              <h4> Why us? </h4>
              <h4> Because we are the best</h4>

              <Button variant ="primary" size="lg" href="/register">
                  Get your profile started now
              </Button>
            </div>
        </Router>
    );
}
export default Home;