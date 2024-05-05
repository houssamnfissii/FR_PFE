import React, { useState, useEffect } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentDate = new Date();
      const createdAt = new Date(timestamp);
      const timeDiff = currentDate - createdAt;

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);

      let timeAgoString = '';

      if (years > 0) {
        timeAgoString = `${years} year${years > 1 ? 's' : ''} ago`;
      } else if (months > 0) {
        timeAgoString = `${months} month${months > 1 ? 's' : ''} ago`;
      } else if (days > 0) {
        timeAgoString = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        timeAgoString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        timeAgoString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        timeAgoString = 'Just now';
      }

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();

    // Refresh the time ago string every minute
    const intervalId = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
