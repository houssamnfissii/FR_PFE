import React, { useState } from 'react';

const SlideClient = () => {
  const [selectedImage, setSelectedImage] = useState("https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg");

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="grid gap-4">
      <div>
        <img
          className="h-auto max-w-full rounded-lg cursor-pointer transition duration-300 transform hover:scale-105"
          src={selectedImage}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <img
              className="h-auto max-w-full rounded-lg cursor-pointer transition duration-300 transform hover:scale-105"
              src={`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index + 1}.jpg`}
              alt=""
              onClick={() => handleImageClick(`https://flowbite.s3.amazonaws.com/docs/gallery/square/image-${index + 1}.jpg`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideClient;
