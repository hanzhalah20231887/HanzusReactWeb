import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, propertyId, propertyTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="image-gallery" data-testid="image-gallery">
      <div className="main-image-container">
        <button 
          className="nav-btn prev-btn tech-glass"
          onClick={handlePrev}
          aria-label="Previous image"
          data-testid="prev-image-btn"
        >
          ‹
        </button>
        
        <div className="main-image" onClick={handleMainImageClick}>
          <img 
            src={images[currentIndex]} 
            alt={`${propertyTitle} - Image ${currentIndex + 1}`}
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://placehold.co/800x500/112240/64ffda?text=Property+Image';
              e.target.alt = 'Image not available';
            }}
          />
          <div className="image-overlay tech-glass">
            <span className="image-counter">
              {currentIndex + 1} / {images.length}
            </span>
            <span className="zoom-hint">Click to zoom</span>
          </div>
        </div>
        
        <button 
          className="nav-btn next-btn tech-glass"
          onClick={handleNext}
          aria-label="Next image"
          data-testid="next-image-btn"
        >
          ›
        </button>
      </div>
      
      <div className="thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail-btn tech-glass ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            data-testid={`thumbnail-${index}`}
          >
            <img 
              src={image} 
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://placehold.co/100x80/112240/64ffda?text=Thumb';
              }}
            />
            <div className="thumbnail-overlay"></div>
          </button>
        ))}
      </div>
      
      {/* Modal for enlarged view */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close tech-glass"
              onClick={handleCloseModal}
              aria-label="Close image viewer"
            >
              ×
            </button>
            <img 
              src={images[currentIndex]} 
              alt={`${propertyTitle} - Full view`}
              className="modal-image"
              onError={(e) => {
                e.target.src = 'https://placehold.co/1200x800/112240/64ffda?text=Image+Not+Available';
              }}
            />
            <div className="modal-nav">
              <button onClick={handlePrev} className="modal-nav-btn tech-glass">‹</button>
              <span className="modal-counter tech-glass">
                {currentIndex + 1} / {images.length}
              </span>
              <button onClick={handleNext} className="modal-nav-btn tech-glass">›</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;