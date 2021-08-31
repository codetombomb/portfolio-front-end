import React, { useRef } from 'react';
import gsap from 'gsap'

function About(props) {
    const creepPic = useRef();
    const overlayBlock = useRef();
    const bdayDiv = useRef();
    const infoDiv = useRef();
    const bdayTitleH1 = useRef();
    const bdayTitleH2 = useRef();


    function animateCreep(e) {
        console.log(e.target)
        e.target.style.display = "block"
        gsap.from(creepPic.current, {
            duration: .8,
            opacity: 0,
            repeat: false,
            x: -75,
        })
        gsap.to(overlayBlock.current, {
            display: "block"
        })
        gsap.to(bdayTitleH1.current, {
            display: "block"
        })
        gsap.to(bdayTitleH2.current, {
            display: "block"
        })
        gsap.from(overlayBlock.current, {
            y: -150,
            opacity: 0,
            duration: .5,
            delay: .5
        })
        gsap.from(bdayTitleH1.current, {
            x: 50,
            opacity: 0,
            duration: .8,
            delay: .2
        })
        gsap.from(bdayTitleH2.current, {
            x: 50,
            opacity: 0,
            duration: .8,
            delay: .4
        })
        gsap.from(infoDiv.current, {
            opacity: 0,
            duration: .8,
            delay: .9,
            x: -20
        })
    }

    return (
        <div id="about">
            <div id="creep-pic-wrapper">
                <div id="info-pic-container">
                    <div ref={bdayDiv} id="bday">
                        <h1 ref={bdayTitleH1}>85</h1>
                        <h2 ref={bdayTitleH2}>0907</h2>
                    </div>
                    <div ref={infoDiv} style={{display: 'block'}} id="info-container">
                        {props.attributes.map((attr) => (<p key={attr}>{attr}</p>))}
                    </div>
                    <img
                        onLoad={animateCreep}
                        ref={creepPic} id="creep-pic"
                        alt="Tom Creep"
                        src="process.env.PUBLIC_URL../../creep.jpg"
                    />
                </div>
                <div ref={overlayBlock} id="creep-overlay-block"></div>
            </div>
        </div>
    );
}

export default About;


