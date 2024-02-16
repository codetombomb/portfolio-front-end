import styles from "./styles.module.css";
const SectionDescription = ({ text, color, style={} }) => {
  
  return (
    <p
      className={styles.sectionDescription}
      style={{
        ...style,
        color: color ? `var(${color})` : null,
      }}
    >
      {text}
    </p>
  );
};

export default SectionDescription;
