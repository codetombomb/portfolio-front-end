import React, { useRef } from 'react';
import gsap from 'gsap'

function Contact(props) {
    const contactFlyer = useRef();
    const animateFlyer = (e) => {
        gsap.to(contactFlyer.current, {
            display: "block"
        })
        gsap.from(contactFlyer.current,{
            opacity: 0,
            duration: 1,
            rotation: 1080,
            height: 20,
            x: 100,
            y: -100
        })
    }

    return (
        <div id="contact">
            <img
                ref={contactFlyer}
                onLoad={animateFlyer}
                alt="Tom Tobar Contact Poster Beetlejuice"
                src='process.env.PUBLIC_URL../../contact.png'
            />
        </div>
    );
}

export default Contact;