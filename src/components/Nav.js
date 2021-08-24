import React from 'react';
import TomLogo from '../tom_logo.svg'

function Nav(props) {
    return (
        <div id="nav">
                <div id="nav-logo-wrapper">
                    <a href="/" ><img id="logo-home" alt="tom-logo" src={TomLogo}/></a>
                </div>
            <div id="logo-link-wrapper">
                <ul>
                    <li><a href="contact">contact</a></li>
                    <li><a href="works">works</a></li>
                    <li><a href="about">about</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;