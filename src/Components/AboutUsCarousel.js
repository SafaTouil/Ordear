import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import logo from './images/A.jpg'
import logo2 from './images/B.jpg'
import logo3 from './images/C.jpg'
export default function AboutUs()
{
    return(
        <Carousel>
                <div><img src={logo} />qdsdqqdq
                    
                                      
                            <p className="centered">We are a Restaurant specialized in Grilling Located in sydney  New South Wales Australia
                                founded in August 2011 now we have 50 locations across north america europe the middle east
                                and new zealand         </p>
                    
                </div>
                <div className="CarouselAboutUs"><img src={logo3} />
                    
                 
                            <p className="centered">Everything here is digitalized you can create an account in few seconds
                     order your favorite meal and pay in a few clicks
                     it' s a lot  better this way!                            </p>
                    
                </div>
                <div className="CarouselAboutUs"><img src={logo2} />
                    
                  
                            <p className="centered">I hope you find our meals delicious and please spread the word and recommend us!                            </p>
                        
                </div>
               
             
            </Carousel>
    )
}