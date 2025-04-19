import { RootState } from '@/stores/store';
import { toggleTheme } from '@/stores/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../Buttons/IconButton/IconButton';
import { DarkIcon, LightIcon } from '@/assets/icons';
import { useEffect } from 'react';
import CONSTANTS from '@/shared/types/constants';
import { AccentColors } from '@/shared/types/enums';
import { useMediaQuery } from 'react-responsive';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const isLargeScreen = useMediaQuery({ minWidth: CONSTANTS.BREAKPOINTS.LG });

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <IconButton
      icon={isDarkMode ? <DarkIcon /> : <LightIcon />}
      onClick={handleToggle}
      title={isDarkMode ? 'switch to dark mode' : 'switch to light mode'}
      color={isLargeScreen ? AccentColors.Primary : AccentColors.Secondary}
    />
  );
};

export default ThemeToggle;
