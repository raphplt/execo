import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';

interface TopButtonProps {
  src: string;
  alt: string;
}

const TopButton: React.FC<TopButtonProps> = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={"absolute top-auto right-5 py-5 focus:outline-none opacity-100 hover:opacity-75 transition-opacity duration-300${isVisible ? 'visible' : 'invisible'}"}
      onClick={handleClick}
    >
    <Image src={src} alt={alt} />
    </button>
  );
};

export default TopButton;
