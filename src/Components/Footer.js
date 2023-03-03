import { Button, TextareaAutosize, TextField } from "@mui/material";

import './../App.css'
import MuiPhoneNumber from 'material-ui-phone-number';
import { useState } from "react";
import { faFacebook, faGoogle, faTwitter,faPinterest } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer()
{
    const [value, setValue] = useState()
 return (
    <>
    <div className="footer">
        <div className="Footer_form">
<TextField id="filled-basic" label="FullName" className="textfield" variant="filled"  /><br></br><br></br>
<TextField id="outlined-basic"  className="textfield" label="Email" variant="filled"/><br></br><br></br>
<MuiPhoneNumber defaultCountry={'us'} className="textfield" variant="filled" onChange={setValue}/><br></br><br></br>
<p> <i className="fa fa-phone"></i> Phone : 345 555 0198</p>
<p><i class="fa fa-map-marker" aria-hidden="true"></i>
  Address:Sydney,New South Wales,Australia</p>
  <a href="https://www.facebook.com/learnbuildteach/"
         className="facebook social">
         <FontAwesomeIcon icon={faFacebook} size="3x" />
       </a>
       <a href="https://www.twitter.com/jamesqquick" className="twitter social">
         <FontAwesomeIcon icon={faTwitter} size="3x" />
       </a>
       <a href="https://www.gmail.com/jamesqquick" >
         <FontAwesomeIcon icon={faPinterest} size="3x" color="red"/>
       </a>
<div className="Footer_form_message">
<TextareaAutosize
  maxRows={6}
  aria-label="maximum height"
  placeholder=""
  style={{ width: 500 }}
/>
<Button variant="contained">Send</Button>
</div></div>
    </div>
    </>
 )
}