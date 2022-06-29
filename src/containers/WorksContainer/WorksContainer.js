import React from 'react';
import Works from './Works'

function WorksContainer(props) {
    return (
        <div style={{height: '100%', width: '100%'}}>
               <Works projects={props.projects}/>  
        </div>
    );
}

export default WorksContainer;