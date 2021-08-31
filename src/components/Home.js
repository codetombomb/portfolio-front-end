import React, { useEffect} from 'react';
import TomLogo from '../tom_logo.svg'

function Home(props) {

    useEffect(() => {
        props.setOnHome(true)

        return () => {
            props.setOnHome(false)
        }
    }, [])
    
    return (
        <div id="home">
            <img id="home-logo" alt="tom-logo-home" src={TomLogo} />
        </div>
    );
}

export default Home;

//Diplay the tom logo