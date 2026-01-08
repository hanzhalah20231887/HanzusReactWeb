
/**
 * Format price as currency
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Format date from property added object
 * @param {Object} added - Added date object {day, month, year}
 * @returns {string} - Formatted date string
 */
export const formatDate = (added) => {
  if (!added || !added.day || !added.month || !added.year) {
    return 'Date not available';
  }
  return `${added.day} ${added.month} ${added.year}`;
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} length 
 * @returns {string} - Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Get bedroom display text
 * @param {number} bedrooms - Number of bedrooms
 * @returns {string} - Bedroom display text
 */
export const getBedroomText = (bedrooms) => {
  if (bedrooms >= 5) return '5+ Bedrooms';
  return `${bedrooms} Bedroom${bedrooms !== 1 ? 's' : ''}`;
};