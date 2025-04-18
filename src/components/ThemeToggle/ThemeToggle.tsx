import { RootState } from '@/stores/store';
import { toggleTheme } from '@/stores/themeSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../IconButton/IconButton';
import { DarkIcon, LightIcon } from '@/assets/icons';
import { useEffect } from 'react';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

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
    />
  );
};

export default ThemeToggle;
