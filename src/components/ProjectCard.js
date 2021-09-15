import React from 'react';

function ProjectCard({ info, source, display }) {
    return (
        <div id="project-card">
            <a href={info.github_link} target="_blank" rel="noreferrer">
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