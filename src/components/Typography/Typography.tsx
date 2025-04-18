import { AccentColors, FontSize, Variant } from '@/shared/types/enums';
import styles from './Typography.module.scss';

interface TypographyProps {
  color?: AccentColors;
  variant: Variant;
  text: string | string[];
  fontSize?: FontSize;
  fontWeight?: number;
}

const Typography: React.FC<TypographyProps> = ({
  color,
  variant,
  text,
  fontSize,
  fontWeight,
}) => {
  return variant === Variant.P ? (
    <p
      className={`${
        color
          ? styles[`${color.toLowerCase()}`]
          : styles[`${AccentColors.Primary}`]
      }`}
      style={{ fontSize: fontSize, fontWeight: `${fontWeight}` }}
    >
      {text}
    </p>
  ) : variant === Variant.Span ? (
    <span
      className={`${
        color
          ? styles[`${color.toLowerCase()}`]
          : styles[`${AccentColors.Primary}`]
      }`}
      style={{ fontSize: fontSize, fontWeight: `${fontWeight}` }}
    >
      {text}
    </span>
  ) : variant === Variant.H1 ? (
    <h1
      className={`${
        color
          ? styles[`${color.toLowerCase()}`]
          : styles[`${AccentColors.Primary}`]
      }`}
      style={{ fontSize: fontSize, fontWeight: `${fontWeight}` }}
    >
      {text}
    </h1>
  ) : (
    <h2
      className={`${
        color
          ? styles[`${color.toLowerCase()}`]
          : styles[`${AccentColors.Primary}`]
      }`}
      style={{ fontSize: fontSize, fontWeight: `${fontWeight}` }}
    >
      {text}
    </h2>
  );
};

export default Typography;
