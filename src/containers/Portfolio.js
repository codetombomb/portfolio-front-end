import React, { useState, useEffect } from 'react';
import Home from '../components/Home';
import Nav from '../components/Nav';
import About from '../components/About';
import Works from '../components/Works';
import Contact from '../components/Contact';
import worksImages from '../worksImages';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [info, setInfo] = useState([]);
    const [works] = useState(worksImages);


    const getProjects = () => {
        fetch('http://localhost:4000/projects')
            .then(res => res.json())
            .then(json => setProjects({ projects: [...json] }))
    }

    const getAbout = async () => {
        await fetch('http://localhost:4000/about')
            .then(res => res.json())
            .then(json => {
                const attrArry = json[0].info
                setInfo({ info: [...attrArry] })
            })
    }

    useEffect(() => {
        getProjects();
        getAbout()
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
                        <About attributes={info.about} />
                    </Route>
                    <Route exact path="/works">
                        <Works ads={works} projects={projects} />
                    </Route>
                    <Route exact path="/contact">
                        <Contact />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Portfolio;