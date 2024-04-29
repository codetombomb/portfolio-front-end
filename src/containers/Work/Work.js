import './Work.css'

function Work({ project }) {
  console.log(project);
  return (
    <a className="Work" href={project.github_link} target="_blank">
      <img src={`./worksImgs/${project.img_name}.png`}></img>
    </a>
  );
}
export default Work;
