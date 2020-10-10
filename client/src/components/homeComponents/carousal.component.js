import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Slide1 from "./images/slide1.jpg";
import Slide2 from "./images/slide2.jpg";
import Slide3 from "./images/slide3.jpg";
import Slide4 from "./images/slide4.jpg";
import Slide5 from "./images/slide5.jpg";
import "./carousal.component.css";


// const header = {
//   heading: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: '-1000px', 
//     marginLeft: '100px', 
//     color: '#00FFFF',
//     position: 'absolute',
//     width: '100%',
//     top: '22rem',
//     zIndex: '1',
//     textAlign: 'center',
//   }
// }
function MyCarousal(){
  return (
    <div id="home" style = {{height:"100vh"}}>
      <Carousel controls={false} indicators interval={3000} pauseOnHover={false}>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={Slide1} alt="First slide" />
          {/* <Carousel.Caption style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3 style = {header.heading}>Second slide label</h3>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={Slide2} alt="Third slide" />
          {/* <Carousel.Caption style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3 style = {header.heading}>Second slide label</h3>
            </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={Slide3} alt="Third slide" />
          {/* <Carousel.Caption style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3 style = {header.heading}>Second slide label</h3>
            </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={Slide4} alt="Forth slide" />
          {/* <Carousel.Caption style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3 style = {header.heading}>Second slide label</h3>
            </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 custom-img" src={Slide5} alt="Fifth slide" />
          {/* <Carousel.Caption style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h3 style = {header.heading}>slide label</h3>
            </Carousel.Caption> */}
        </Carousel.Item>
        
      </Carousel>
      
    </div>
  );
};

export default MyCarousal;