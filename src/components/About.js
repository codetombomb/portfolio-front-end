import React from 'react';

function About(props) {

    return (
        <div id="about">
            <div id="creep-pic-wrapper">
                <div id="info-pic-container">
                    <div id="bday">
                        <h1>85</h1>
                        <h2>0907</h2>
                    </div>
                    <div id="info-container">
                    </div>
                    <img id="creep-pic" alt="Tom Creep" src="process.env.PUBLIC_URL../../creep.jpg" />
                </div>
                <div id="creep-overlay-block"></div>
            </div>
        </div>
    );
}

export default About;


// Render Tom image
// Render logo in the top left corner