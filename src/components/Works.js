import React, { useState, useEffect } from 'react';
import Arrow from './Arrow'

function Works(props) {
    const [count, setCount] = useState(0)
    const [displayed, setDisplayed] = useState("")
    const img = `process.env.PUBLIC_URL../../worksImgs/${displayed}.png`
    const [project, setProject] = useState({})

    useEffect(() => {
        setDisplayed(props.ads[count])
        setProject({...props.projects[count]})
    }, [])

    const handleRightClick = (e) => {
        if (count < props.ads.length - 1) {
            setCount(count + 1)
        } else {
            setCount(0)
        }
    }

    const handleLeftClick = (e) => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(props.ads.length - 1)
        }
    }

    return (
        <div id="works">
            <div id="works-container">
                <Arrow direction="left" handleClick={handleLeftClick}/>
                <a href={project.title}>{project.title}</a>
                <img key={count} id={displayed} alt="Works Ad" src={img} />
                <Arrow direction="right" handleClick={handleRightClick} />
            </div>
        </div>
    );
}

export default Works;