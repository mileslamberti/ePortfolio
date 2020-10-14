import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import Carousel from "./homeComponents/carousal.component";
import AdvertButton from './homeComponents/advertButton.component';


const Home = () => {
  return (
      <div>
          <Carousel/> 
          <div className="container">
            <AdvertButton/>
          </div>
      </div>
  );
}
export default Home;