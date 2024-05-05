import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setIsVisible(scrollTop > 500); // Show button when scrollTop is greater than 500
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
<button
  onClick={scrollToTop}
  className={`fixed z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md bg-blue-800 hover:bg-blue-700 text-white text-lg font-semibold transition-colors duration-300 ${
    isVisible ? '' : 'hidden'
  }`}
  title="Go To Top"
>
  <div className="flex items-center justify-center "> 
   
     <span> Top</span>
    {/* </svg> */}
  </div>
  <span className="sr-only">Go to top</span>
</button>

  );
}

export default ScrollToTopButton;
