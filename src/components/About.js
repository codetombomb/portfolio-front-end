import React from 'react';
import Creep from '../creep.jpg'

function About(props) {
    return (
        <div id="about">
            <div id="creep-pic-wrapper">
                <img id="creep-pic" src={Creep} />
                <div id="creep-overlay-block"></div>
            </div>
        </div>
    );
}

export default About;


// Render Tom image
// Render logo in the top left corner