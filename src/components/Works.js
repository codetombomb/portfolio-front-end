import React from 'react';

function Works(props) {
    return (
        <div id="works">
            <div id="works-container">
                <img alt="Works Ad" src={props.works.covidChaos} />
            </div>
        </div>
    );
}

export default Works;