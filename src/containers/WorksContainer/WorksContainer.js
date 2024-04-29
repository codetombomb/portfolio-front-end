import Work from "../Work/Work";
import "./WorksContainer.css";

function WorksContainer({ projectData }) {
  return (
    <div className="works-page">
    <h1 className="page-title">WORKS</h1>
      <div className="WorksContainer">
        {projectData.map((project, index) => (
          <Work key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
export default WorksContainer;
