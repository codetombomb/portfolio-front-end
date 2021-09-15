import React, { useState } from 'react';
import Arrow from '../components/Arrow'
import ProjectCard from '../components/ProjectCard';

function Works(props) {
    const [count, setCount] = useState(0)

    const handleRightClick = (e) => {
        if (count < props.projects.length - 1) {
            setCount(count + 1)
        } else {
            setCount(0)
        }
    }

    const handleLeftClick = (e) => {
        if (count > 0) {
            setCount(count - 1)
        } else {
            setCount(props.projects.length - 1)
        }
    }

    return (
        <div id="works">
            <div id="works-container">
                <Arrow direction="left" handleClick={handleLeftClick} />
                {props.projects.map((project, index) => {
                    let display = index === count ? "block" : "none";
                    return (<ProjectCard
                        key={project.id}
                        info={project}
                        source={`process.env.PUBLIC_URL../../worksImgs/${project.img_name}.png`}
                        display={{display: `${display}`}}
                    />)
                })}
                <Arrow direction="right" handleClick={handleRightClick} />
            </div>
        </div>
    );
}

export default Works;