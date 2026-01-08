import React from 'react';
import { useFavorites } from '../favorites/FavoritesContext';
import TechCard from '../common/TechCard';
import { formatPrice } from '../utils/formatters';
import { handleDragStart, handleDragEnd } from '../utils/dragAndDrop';
import './SearchResults.css';

const SearchResults = ({ properties, onViewProperty }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleFavoriteClick = (e, property) => {
    e.stopPropagation();
    
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  return (
    <div className="search-results">
      {properties.map(property => (
        <TechCard 
          key={property.id}
          hoverable
          glow
          className="property-card"
          onClick={() => onViewProperty(property.id)}
          data-testid={`property-card-${property.id}`}
        >
          <div 
            className="property-card-inner"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, property)}
            onDragEnd={handleDragEnd}
          >
            <div className="property-image">
              <img 
                src={property.images[0]} 
                alt={`${property.bedrooms} bedroom ${property.type} in ${property.location}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x300/112240/64ffda?text=Property+Image';
                  e.target.alt = 'Property image not available';
                }}
              />
              <button 
                className={`favorite-btn ${isFavorite(property.id) ? 'active' : ''}`}
                onClick={(e) => handleFavoriteClick(e, property)}
                aria-label={isFavorite(property.id) ? `Remove ${property.type} from favorites` : `Add ${property.type} to favorites`}
                data-testid={`favorite-btn-${property.id}`}
              >
                {isFavorite(property.id) ? '★' : '☆'}
              </button>
              <span className="property-badge tech-badge-primary">
                {property.type}
              </span>
            </div>
            
            <div className="property-details">
              <div className="property-header">
                <h3>{property.bedrooms} Bedroom {property.type}</h3>
                <span className="property-price tech-text-gradient">
                  {formatPrice(property.price)}
                </span>
              </div>
              
              <div className="property-meta">
                <span className="property-location tech-text-muted">
                  <span role="img" aria-label="location" className="location-icon">📍</span> 
                  {property.location}
                </span>
                <span className="property-tenure tech-badge-secondary">
                  {property.tenure}
                </span>
              </div>
              
              <p className="property-description tech-text-light">
                {property.description.substring(0, 100)}...
              </p>
              
              <div className="property-footer">
                <span className="property-added tech-text-muted">
                  📅 Added: {property.added.day} {property.added.month} {property.added.year}
                </span>
                <button 
                  className="btn-view-details tech-btn-outline"
                  onClick={() => onViewProperty(property.id)}
                  data-testid={`view-details-${property.id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </TechCard>
      ))}
    </div>
  );
};

export default SearchResults;