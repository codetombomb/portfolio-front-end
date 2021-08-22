import React, { useState, useEffect } from 'react';
import Home from '../components/Home';

function Portfolio() {
    const [projects, setProjects] = useState([]);

    const getProjects = () => {
        fetch('http://localhost:4000/projects')
            .then(res => res.json())
            .then(json => setProjects({ projects: [...json] }))
    }

    useEffect(() => {
        getProjects();
    })

    return (
        <div>
            <Home {...projects} />
        </div>
    );
}

export default Portfolio;