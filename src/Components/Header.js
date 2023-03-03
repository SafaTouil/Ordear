import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import "./../App.css"
import AboutUs from "./AboutUsCarousel"
import CarouselComponent from "./Carousel"
import Footer from "./Footer"
export default function Header()
{
    return (
       <div> 
  <div className="header">
  <ul className="List">
  <li><p className="pr">
  <p className="slogan" >Ordear</p></p></li>
   <li><i class="fa fa-home"></i>
   <a className="link" href="">Home</a></li>
   <li><p className="pr">
   <i class="fa fa-info-circle" aria-hidden="true"></i>
   <a className="link" href="">About Us</a></p></li>
   <li><p className="pr">
   <i class="fas fa-hamburger"></i>
   <a className="link" href="">Menus</a></p></li>
   <li><p className="pr">
   <i class="fa fa-user"></i>
    <a className="link" href="/signup">Sign Up</a></p></li>
   <li><p className="pr">
   <i class="fa fa-bell"></i>
   <a className="link" href="">Notifications</a></p></li>
   <li><p className="pr">
   <i class="fa fa-phone"></i>
   <a className="link" href="">Contact Us</a></p></li>   
  </ul>
</div>
<div className="CarouselAboutUs">
    <AboutUs></AboutUs>
</div>
<div className='CarouselTitle'>
<CarouselComponent></CarouselComponent>
</div>

<Footer></Footer>

</div>
        
    )
}