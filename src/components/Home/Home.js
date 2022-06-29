import React, { useEffect, useRef } from 'react';
import TomLogo from '../tom_logo.svg'
import { gsap } from 'gsap'

function Home({setOnHome}) {
    const tomLogo = useRef();

    useEffect(() => {
        setOnHome(true)
        spinLogo();
        return () => {
            setOnHome(false)
        }
    }, [setOnHome])

    function spinLogo() {
        gsap.from(tomLogo.current, {
            opacity: 0,  
            x: -190, 
            rotation: -90,
            duration: 4,
            repeat: false, 
            ease: "elastic"
        })
    }

    return (
        <div id="home">
            <img id="home-logo" alt="tom-logo-home" src={TomLogo} ref={tomLogo} />
        </div>
    );
}

export default Home;