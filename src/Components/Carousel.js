import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-carousel3'
import logo  from './images/1.png';
import logo2 from './images/2.png';
import logo3 from './images/3.png';
import logo4 from './images/4.png';
import logo5 from './images/5.png';
import logo6 from './images/6.png';
import logo7 from './images/7.png';
import logo8 from './images/8.png';
import logo9 from './images/9.png';
import logo10 from './images/10.png';
import logo11 from './images/11.png';
import logo12 from './images/12.png';
export default function CarouselComponent() {
    const style = {
        width: 297,
        height: 296,
        
      };   
        return (
            <div>
                <p className='CarouselTitle'>Our meals</p>
                
            <Carousel  height={460} width={980} yOrigin={42} yRadius={80} autoPlay={true}>
              <div key={1} style={style}>
                <img alt="" width="200px" height="150px" src={logo} />
              </div>
              <div key={2} style={style}>
                <img alt="" width="200px" height="150px" src={logo2} />
              </div>
              <div key={3} style={style}>
                <img alt="" width="200px" height="150px" src={logo3} />
              </div>
              <div key={4} style={style}>
                <img alt="" width="200px" height="150px" src={logo4} />
              </div>
             
              <div key={5} style={style}>
                <img alt="" width="200px" height="150px" src={logo5} />
              </div>
              <div key={6} style={style}>
                <img alt="" width="200px" height="150px" src={logo6} />
              </div>
              <div key={7} style={style}>
                <img alt="" width="200px" height="150px" src={logo7} />
              </div>
              <div key={8} style={style}>
                <img alt="" width="200px" height="150px" src={logo8} />
              </div>
              <div key={9} style={style}>
                <img alt="" width="200px" height="150px" src={logo9} />
              </div>
              <div key={10} style={style}>
                <img alt="" width="200px" height="150px" src={logo10} />
              </div>
              <div key={11} style={style}>
                <img alt="" width="200px" height="150px" src={logo11} />
              </div>
              <div key={12} style={style}>
                <img alt="" width="200px" height="150px" src={logo12} />
              </div>
                       

            </Carousel>
          </div>
        );
    
};