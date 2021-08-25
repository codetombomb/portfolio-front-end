import React, { useState, useEffect } from 'react';

function Works(props) {
    const [count, setCount] = useState(0)
    const [displayed, setDisplayed] = useState("")
    const img = `process.env.PUBLIC_URL../../worksImgs/${displayed}.png`

    useEffect(() => {
        setDisplayed(props.ads[count])
    })

    const handleClick = (e) => {
        if (count < props.ads.length - 1){
            setCount(count + 1)
        } else {
            setCount(0)
        }
    }

    return (
        <div id="works">
            <div id="works-container">
                <img key={count} id={displayed} alt="Works Ad" onClick={handleClick} src={img} />
            </div>
        </div>
    );
}

export default Works;