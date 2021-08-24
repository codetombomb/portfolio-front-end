import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import Nav from '../components/Nav';
import About from '../components/About';
import Works from '../components/Works';
import worksImages from '../worksImages';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [worksImgs, setWorksImages] = useState(worksImages);

    const getProjects = () => {
        fetch('http://localhost:4000/projects')
            .then(res => res.json())
            .then(json => setProjects({ projects: [...json] }))
    }

    useEffect(() => {
        getProjects();
        console.log(worksImgs.covidChaos)
    }, [])

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
                    <Route exact path="/works">
                        <Works works={worksImages} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Portfolio;