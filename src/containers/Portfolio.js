import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import Nav from '../components/Nav';
import About from '../components/About';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

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
        <div id="portfolio">
            <Nav />
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Portfolio;