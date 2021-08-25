import React from 'react';

function Arrow(props) {
    return (
        <div id={`arrow-${props.direction}`} onClick={() => {
            props.handleClick()
        }}>
        </div>
    );
}

export default Arrow;