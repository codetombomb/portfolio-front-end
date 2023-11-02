import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";

const WorksSection = ({ worksSectionData }) => {
  const { title, description, callToAction } = worksSectionData;
  return (
    <section className={style.worksSection}>
      <SectionTitle title={title.text} color={title.color} />
      <SectionDescription text={description.text} color={description.color} />
    </section>
  );
};

export default WorksSection;
