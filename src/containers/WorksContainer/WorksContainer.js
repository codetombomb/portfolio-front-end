import Work from "../Work/Work";
import './WorksContainer.css'

function WorksContainer({ projectData }) {
  return (
    <div className="WorksContainer">
      {projectData.map((project, index) => (
        <Work key={index} project={project} />
      ))}
    </div>
  );
}
export default WorksContainer;
