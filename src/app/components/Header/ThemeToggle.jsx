"use client"
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggle = () => {
  // const [isDark, setIsDark] = useState(() =>
  //   localStorage.getItem('theme') === 'dark'
  // );

  // useEffect(() => {
  //   const root = window.document.documentElement;
  //   root.classList.toggle('dark', isDark);
  //   localStorage.setItem('theme', isDark ? 'dark' : 'light');
  // }, [isDark]);

  return (
    <button
      // onClick={() => setIsDark(!isDark)}
      className="text-xl text-gray-700 dark:text-gray-300"
      aria-label="Toggle Theme"
    >
      {/* {isDark ? <FiSun /> : <FiMoon />} */}
    </button>
  );
};

export default ThemeToggle;
