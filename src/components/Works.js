import React, { useState, useEffect } from 'react';
import Arrow from './Arrow'

function Works(props) {
    const [count, setCount] = useState(0)
    // const [displayed, setDisplayed] = useState("")
    const [project, setProject] = useState({})
    // const img = `process.env.PUBLIC_URL../../worksImgs/${project.imgName}.png`

    const handleSetProject = () => {
        let currentProject = props.projects[count]
        setProject({...currentProject})
    }
    
    const handleRightClick = (e) => {
        console.log("moving right")
        if (count < props.projects.length - 1) {
            setCount(count + 1)
        } else {
            setCount(0)
        }
    }
    
    const handleLeftClick = (e) => {
        console.log("moving left")
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(props.projects.length - 1)
        }
    }

    useEffect(() => {
        // console.log("from Works useEffect", props.projects)
        handleSetProject();
    }, [])
    
    return (
        <div id="works">
            <div id="works-container">
                <Arrow direction="left" handleClick={handleLeftClick} />
                {/* <a href={project.title}>{project.title}</a> */}
                <img alt={project.imgName} src={`process.env.PUBLIC_URL../../worksImgs/${project.imgName}.png`} />
                <Arrow direction="right" handleClick={handleRightClick} />
            </div>
        </div>
    );
}

export default Works;