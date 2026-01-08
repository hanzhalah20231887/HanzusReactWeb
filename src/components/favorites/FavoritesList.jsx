import React from 'react';
import { useFavorites } from './FavoritesContext';
import './FavoritesList.css';

const FavoritesList = ({ favorites, onViewProperty }) => {
  const { removeFavorite, clearFavorites } = useFavorites();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('favorites-dropzone')) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const propertyId = e.dataTransfer.getData('text/plain');
    if (propertyId) {
      removeFavorite(propertyId);
    }
  };

  const handleFavoriteDragStart = (e, favorite) => {
    e.dataTransfer.setData('application/json', JSON.stringify(favorite));
    e.dataTransfer.setData('text/plain', favorite.id);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragging');
  };

  const handleFavoriteDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  if (favorites.length === 0) {
    return (
      <div 
        className="favorites-container empty"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="empty-state">
          <div className="empty-icon">☆</div>
          <p>No favorites yet</p>
          <p className="drag-hint">
            <span role="img" aria-label="drag">↕️</span> 
            Drag properties here to remove from favorites
          </p>
          <p className="instruction">
            Click the star button ☆ on any property to add it here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="favorites-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="favorites-header">
        <h4>Favorites ({favorites.length})</h4>
        <button 
          onClick={clearFavorites}
          className="btn-clear-favorites"
          aria-label="Clear all favorites"
          data-testid="clear-favorites-btn"
        >
          Clear All
        </button>
      </div>
      
      <div className="favorites-list favorites-dropzone">
        {favorites.map(favorite => (
          <div 
            key={favorite.id}
            className="favorite-item"
            draggable="true"
            onDragStart={(e) => handleFavoriteDragStart(e, favorite)}
            onDragEnd={handleFavoriteDragEnd}
          >
            <div 
              className="favorite-content"
              onClick={() => onViewProperty(favorite.id)}
            >
              <div className="favorite-image">
                <img 
                  src={favorite.images[0]} 
                  alt={favorite.type}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100x80/cccccc/666666?text=Image';
                  }}
                />
              </div>
              <div className="favorite-details">
                <h5>{favorite.bedrooms} Bed {favorite.type}</h5>
                <p className="favorite-price">{formatPrice(favorite.price)}</p>
                <p className="favorite-location">{favorite.location.substring(0, 25)}...</p>
              </div>
            </div>
            <button 
              className="btn-remove-favorite"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(favorite.id);
              }}
              aria-label={`Remove ${favorite.type} from favorites`}
              data-testid={`remove-favorite-${favorite.id}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <div className="favorites-instructions">
        <p className="drag-instructions">
          <small>
            <span role="img" aria-label="info">ℹ️</span> 
            Drag items here to remove, or click the × button
          </small>
        </p>
      </div>
    </div>
  );
};

export default FavoritesList;