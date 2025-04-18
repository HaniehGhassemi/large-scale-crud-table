import DatePicker, { DateObject } from 'react-multi-date-picker';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import Label from '../Label/Label';
import styles from './CustomDatePicker.module.scss';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';

interface CustomDatePickerProps {
  value?: DateObject | null;
  onChange: (date: DateObject | null) => void;
  label?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
}) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <div className={styles.field}>
      {label && <Label label={label} />}
      <DatePicker
        className={isDarkMode ? 'bg-dark' : ''}
        value={value}
        onChange={onChange}
        render={<InputIcon />}
      />
    </div>
  );
};

export default CustomDatePicker;
