import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../favorites/FavoritesContext';
import ImageGallery from './ImageGallery';
import PropertyTabs from './PropertyTabs';
import './PropertyPage.css';

const PropertyPage = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/');
    }
    setLoading(false);
  }, [id, properties, navigate]);

  const handleFavoriteToggle = () => {
    if (!property) return;
    
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  const handleDragStart = (e) => {
    if (!property) return;
    e.dataTransfer.setData('application/json', JSON.stringify(property));
    e.dataTransfer.setData('text/plain', property.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="property-page">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-page">
        <div className="container">
          <div className="property-not-found">
            <h2>Property Not Found</h2>
            <p>The property you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/')} className="btn-back">
              ← Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="property-page">
      <div className="container">
        <div className="property-navigation">
          <button onClick={() => navigate('/')} className="btn-back">
            ← Back to Search
          </button>
          <div className="property-id">Property ID: {property.id}</div>
        </div>
        
        <div 
          className="property-header"
          draggable="true"
          onDragStart={handleDragStart}
        >
          <div className="property-title-section">
            <h1>{property.bedrooms} Bedroom {property.type}</h1>
            <div className="property-location-info">
              <span className="location-icon">📍</span>
              <p className="property-address">{property.location}</p>
              <span className="property-postcode">{property.postcode}</span>
            </div>
          </div>
          
          <div className="property-actions">
            <div className="property-price-section">
              <span className="property-price">{formatPrice(property.price)}</span>
              <span className="property-tenure">{property.tenure}</span>
            </div>
            
            <button 
              className={`btn-favorite ${isFavorite(property.id) ? 'active' : ''}`}
              onClick={handleFavoriteToggle}
              data-testid="property-favorite-btn"
            >
              {isFavorite(property.id) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
            </button>
            
            <span className="drag-hint">
              <span role="img" aria-label="drag">↕️</span> Drag this header to add/remove from favorites
            </span>
          </div>
        </div>
        
        <div className="property-meta-bar">
          <div className="meta-item">
            <span className="meta-label">Added:</span>
            <span className="meta-value">
              {property.added.day} {property.added.month} {property.added.year}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Bedrooms:</span>
            <span className="meta-value">{property.bedrooms}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Type:</span>
            <span className="meta-value">{property.type}</span>
          </div>
        </div>
        
        <div className="property-content">
          <div className="property-gallery-section">
            <h2 className="section-title">Property Images</h2>
            <ImageGallery images={property.images} propertyId={property.id} />
          </div>
          
          <div className="property-details-section">
            <PropertyTabs property={property} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;