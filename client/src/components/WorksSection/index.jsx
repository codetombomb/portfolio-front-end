import { v4 as uuidv4 } from "uuid";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";

const WorksSection = ({ worksSectionData }) => {
  const { title, description, worksList } = worksSectionData;
  return (
    <section className={style.worksSection}>
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
      <section className={`${style.worksList} flex flex-column flex-center`}>
        {worksList.map((work) => (
          <a
            key={uuidv4()}
            className={style.workLink}
            href={work.githubLink}
            target="blank"
          >
            {work.title}
          </a>
        ))}
      </section>
    </section>
  );
};

export default WorksSection;
