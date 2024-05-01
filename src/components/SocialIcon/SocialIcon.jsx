import React from "react";
import styles from "./styles.module.css";

function SocialIcon({ handleIconClick, icon, iconName }) {
  return (
    <span
      onClick={() => handleIconClick(iconName)}
      className={`${styles.socialWrapper} flex-align-center`}
      name={iconName}
    >
      <img name={iconName} src={icon} alt={`${iconName} social media icon`} />
    </span>
  );
}

export default SocialIcon;
