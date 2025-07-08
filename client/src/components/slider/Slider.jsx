import { useState } from "react";
import "./slider.scss";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  // Generate combined images: use uploaded images first, then fill with placeholders
  const getCombinedImages = () => {
    const uploadedImages = images && images.length > 0 ? images : [];
    const totalImages = 4;
    const combined = [...uploadedImages];
    
    // Add placeholders to reach total of 4 images
    while (combined.length < totalImages) {
      combined.push(`https://picsum.photos/800/600?${Math.floor(Math.random() * 1000) + 1}`);
    }
    
    return combined;
  };

  // Use combined images (uploaded + placeholders)
  const displayImages = getCombinedImages();

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(displayImages.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === displayImages.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="" />
          </div>
          <div className="imgContainer">
            <img src={displayImages[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" className="right" alt="" />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={displayImages[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {displayImages.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
