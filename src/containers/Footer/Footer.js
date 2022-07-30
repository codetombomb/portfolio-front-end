import React from 'react'
import './Footer.css'
import { SocialIcon } from 'react-social-icons';

const iconStyle = {
    width: "2vw",
    height: "2vw",
    border: "1px solid white",
    borderRadius: "50%",
    margin: ".5%",
    padding: "1px"
}

function Footer() {
  return (
    <div className='Footer'>
        <SocialIcon style={iconStyle} bgColor={"black"} fgColor={"white"} className='icon' url="https://github.com/codetombomb" />
        <SocialIcon style={iconStyle} bgColor={"black"} fgColor={"white"} className='icon' url="https://www.linkedin.com/in/tomtobar/" />
        <SocialIcon style={iconStyle} bgColor={"black"} fgColor={"white"} className='icon' url="https://twitter.com/tom_tobar" />
    </div>
  )
}

export default Footer