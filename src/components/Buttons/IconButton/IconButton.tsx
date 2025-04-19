import { AccentColors } from '@/shared/types/enums';
import styles from './IconButton.module.scss';

interface IconButton {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
  color?: AccentColors;
}

const IconButton: React.FC<IconButton> = ({
  onClick,
  icon,
  title,
  color = AccentColors.Primary,
}) => {
  return (
    <button
      className={`${styles.btn} ${color && styles[color.toLowerCase()]}`}
      onClick={onClick}
      title={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
