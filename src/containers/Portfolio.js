import Home from '../components/Home';
import Nav from '../components/Nav';
import About from '../components/About';
import WorksContainer from '../containers/WorksContainer';
import Contact from '../components/Contact';
import aboutData from '../aboutData'
import projectData from '../projectData'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { Component } from 'react';

class Portfolio extends Component {
    constructor(props) {
        super()
        this.state = {
            projects: [...projectData],
            onHome: false,
            info: [...aboutData]
        }
    }

    updateProjects = data => {
        this.setProjects([...data])
    }

    setOnHome = (current) => {
        this.setState({
            onHome: current
        })
    }

    setProjects(projects) {
        this.setState({
            projects: [...projects]
        })
    }

    setInfo(info) {
        this.setState({
            info: [...info]
        })
    }

    render() {
        return (
            <div id="portfolio">
                <Nav onHome={this.state.onHome} />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home onHome={this.state.onHome} setOnHome={this.setOnHome} />
                        </Route>
                        <Route exact path="/about">
                            <About attributes={this.state.info} />
                        </Route>
                        <Route exact path="/works">
                            <WorksContainer projects={this.state.projects} />
                        </Route>
                        <Route exact path="/contact">
                            <Contact />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}
export default Portfolio;