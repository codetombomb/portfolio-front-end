import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";

const WorksSection = () => {
  return (
    <section className={style.worksSection}>
      <SectionTitle title="works" color="--primary-lighter" />
      <SectionDescription
        text="Here are some of my projects and blogs. More to come in the near future!"
        color="--secondary-light"
      />
    </section>
  );
};

export default WorksSection;
