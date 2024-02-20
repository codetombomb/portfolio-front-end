import { v4 as uuidv4 } from "uuid";
import style from "./styles.module.css";

import SectionTitle from "../SectionTitle";
import SectionDescription from "../SectionDescription";
import TextAnimationWrapper from "../TextAnimationWrapper";

const WorksSection = ({ worksSectionData }) => {
  const { title, description, worksList } = worksSectionData;
  return (
    <section className={`${style.worksSection} main-section`}>
      Works section
    </section>
  );
};

export default WorksSection;
