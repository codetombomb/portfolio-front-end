import React from 'react';

function Works(props) {
    const handleClick = (e) => {
        console.log("moving img")
    }

    return (
        <div id="works">
            <div id="works-container">
                {props.works.map(pic => {
                    const img = `process.env.PUBLIC_URL../../worksImgs/${pic}.png`
                    return <img key={pic} alt="Works Ad" onClick={handleClick} src={img} />
                })}
            </div>
        </div>
    );
}

export default Works;