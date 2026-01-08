
/**
 * Sanitize user input by removing dangerous HTML characters
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/[<>]/g, ''); // Additional safety for < and >
};

/**
 * Validate and sanitize form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Sanitized form data
 */
export const sanitizeFormData = (formData) => {
  const sanitized = { ...formData };
  
  // Sanitize all string fields
  Object.keys(sanitized).forEach(key => {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]);
    }
  });
  
  return sanitized;
};

/**
 * Escape HTML special characters
 * @param {string} html - HTML string to escape
 * @returns {string} - Escaped HTML
 */
export const escapeHTML = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Validate property data before rendering
 * @param {Object} property - Property data to validate
 * @returns {boolean} - Whether property data is safe
 */
export const validatePropertyData = (property) => {
  if (!property || typeof property !== 'object') return false;
  
  const requiredFields = ['id', 'type', 'bedrooms', 'price', 'location', 'description'];
  return requiredFields.every(field => 
    property[field] !== undefined && 
    property[field] !== null && 
    String(property[field]).trim() !== ''
  );
};