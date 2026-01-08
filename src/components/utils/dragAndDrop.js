
/**
 * Handle drag start event
 * @param {Event} e - Drag event
 * @param {Object} property - Property data
 */
export const handleDragStart = (e, property) => {
  if (!property) return;
  
  // Set multiple data types for compatibility
  e.dataTransfer.setData('application/json', JSON.stringify(property));
  e.dataTransfer.setData('text/plain', property.id);
  e.dataTransfer.setData('text/html', `<strong>${property.type}</strong>: ${property.location}`);
  e.dataTransfer.effectAllowed = 'copyMove';

  // Add visual feedback
  e.currentTarget.classList.add('dragging');
  
  // Optional: Create drag image
  const dragImage = document.createElement('div');
  dragImage.textContent = `📦 ${property.bedrooms} Bed ${property.type}`;
  dragImage.style.padding = '10px';
  dragImage.style.background = 'var(--tech-card-bg)';
  dragImage.style.border = '1px solid var(--tech-accent)';
  dragImage.style.borderRadius = '8px';
  dragImage.style.color = 'var(--tech-text)';
  document.body.appendChild(dragImage);
  e.dataTransfer.setDragImage(dragImage, 75, 25);
  
  // Clean up
  setTimeout(() => document.body.removeChild(dragImage), 0);
};

/**
 * Handle drag end event
 * @param {Event} e - Drag event
 */
export const handleDragEnd = (e) => {
  e.currentTarget.classList.remove('dragging');
};

/**
 * Handle drag over event
 * @param {Event} e - Drag event
 */
export const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('drag-over');
};

/**
 * Handle drag leave event
 * @param {Event} e - Drag event
 */
export const handleDragLeave = (e) => {
  e.currentTarget.classList.remove('drag-over');
};

/**
 * Handle drop event for favorites
 * @param {Event} e - Drop event
 * @param {Function} removeFavorite - Function to remove favorite
 */
export const handleFavoriteDrop = (e, removeFavorite) => {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  const propertyId = e.dataTransfer.getData('text/plain');
  if (propertyId && removeFavorite) {
    removeFavorite(propertyId);
  }
};

/**
 * Handle drop event for adding to favorites
 * @param {Event} e - Drop event
 * @param {Function} addFavorite - Function to add favorite
 */
export const handleAddFavoriteDrop = (e, addFavorite) => {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  try {
    const propertyData = e.dataTransfer.getData('application/json');
    if (propertyData) {
      const property = JSON.parse(propertyData);
      if (property && property.id) {
        addFavorite(property);
      }
    }
  } catch (error) {
    console.error('Error parsing dropped property data:', error);
  }
};