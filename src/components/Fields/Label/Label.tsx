import React from "react";
import styles from "./Label.module.scss";

interface LabelProps {
  label: string;
  dots?: boolean;
}

const Label: React.FC<LabelProps> = ({ label, dots = true }) => {
  return <label className={styles.label}>{dots ? label + ":" : label}</label>;
};

export default Label;
