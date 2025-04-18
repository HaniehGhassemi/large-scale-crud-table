import { AccentColors } from '@/shared/types/enums';
import classes from './Loader.module.scss';
import { LoaderProps, LoaderSizes } from './Loader.types';

const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <div className={classes.loader}>
      <div
        className={`${classes.spinner} ${
          color
            ? classes[color.toLocaleLowerCase()]
            : classes[AccentColors.Primary.toLocaleLowerCase()]
        }
          ${
            classes[size ? `${size.toLowerCase()}` : `${LoaderSizes.LARGE}`]
          }  `}
      ></div>
    </div>
  );
};

export default Loader;
