'use client';
import React, { useState, useEffect } from 'react';

export const HomeBtn = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className=" rounded-full flex justify-center items-center homeBtn">
      <span>
        <svg
          width={windowSize.height * 0.85 * (45 / 932)}
          height={windowSize.width * 0.85 * (47 / 932)}
          viewBox="0 0 42 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 18.625L21 2L1.99998 18.625V42.375H13.875V32.875C13.875 30.9855 14.6257 29.1731 15.9619 27.8369C17.2981 26.5007 19.1104 25.75 21 25.75C22.8898 25.75 24.7019 26.5007 26.0381 27.8369C27.3743 29.1731 28.125 30.9852 28.125 32.875V42.375H40L40 18.625Z"
            stroke="#32a08d"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};
