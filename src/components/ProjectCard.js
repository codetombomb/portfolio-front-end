import React from 'react';

function ProjectCard({ info, source, display }) {
    return (
        <div id="project-card">
            <a href={info.gitHub} target="_blank">
                <img
                    alt={info.name}
                    src={source}
                    style={display}
                />
            </a>
        </div>
    );
}

export default ProjectCard;