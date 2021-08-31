import React, { useEffect } from 'react';
import TomLogo from '../tom_logo.svg'

function Nav(props) {
    
    const moveDown = (e) => {
        e.target.style.transform = "translateX(5px)";
        e.target.style.color = "red"
    }

    const moveUp = (e) => {
        e.target.style.color = "black"
        e.target.style.transform = "translateX(0px)";
    }
    

    return (
        <div id="nav">
            <div id="nav-logo-wrapper">
                {!props.onHome ?
                    <a href="/" ><img id="logo-home" alt="tom-logo" src={TomLogo} /></a>
                    : null}
            </div>
            <div id="logo-link-wrapper">
                <ul>
                    <li><a onMouseEnter={moveDown} onMouseLeave={moveUp} href="contact">contact</a></li>
                    <li><a onMouseEnter={moveDown} onMouseLeave={moveUp} href="works">works</a></li>
                    <li><a onMouseEnter={moveDown} onMouseLeave={moveUp} href="about">about</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;