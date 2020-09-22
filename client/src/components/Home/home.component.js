import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "./carousal.component";
import styled from 'styled-components';

const Button = {
    newcolor: {
        backgroundColor: 'blue',
        color: 'white'
    }
}


function Home(){
    return (
        <div>
            <Carousel/> 

            <div style = {{color: '#00FFFF',position: 'absolute', marginTop: '-500px', marginLeft: '700px', alignItems: "center"}}>
            <h2>Take Your Portfolio to the next level</h2>
            <h3> Why us? </h3>
            <h3> Because we are the best</h3>

            <button style = {Button.newcolor}>
                Get your profile started now
            </button>
            </div>
            {/* <Titles/> */}
        </div>
    );
}
export default Home;