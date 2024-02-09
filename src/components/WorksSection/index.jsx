import { v4 as uuidv4 } from "uuid";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import TextAnimationWrapper from "../TextAnimationWrapper";

const WorksSection = ({ worksSectionData }) => {
  const { title, description, worksList } = worksSectionData;
  return (
    <section className={style.worksSection}>
      <TextAnimationWrapper delay={.25} duration={.7}>
        <SectionTitle title={title.text} color={title.color} />
        </TextAnimationWrapper>
        <TextAnimationWrapper delay={.5} duration={.4}>
        <SectionDescription text={description.text} color={description.color} />
      </TextAnimationWrapper>
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
