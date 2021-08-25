import React from 'react';
// import Creep from '../../public/worksImgs/creep.jpg'

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
                        <p>father</p>
                        <p>husband</p>
                        <p>programmer</p>
                        <p>motorbikes</p>
                        <p>creative</p>
                        <p>learner</p>
                        <p>foodie</p>
                        <p>music</p>
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