import React, { useState } from 'react';
import TechCard from '../common/TechCard';
import { sanitizeInput } from '../utils/security';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    type: 'any',
    bedrooms: 'any',
    minPrice: '',
    maxPrice: '',
    location: '',
    addedMonth: 'any'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const sanitizedValue = name === 'location' ? sanitizeInput(value) : value;
    setFormData(prev => ({ 
      ...prev, 
      [name]: sanitizedValue 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
 
    const sanitizedData = {
      ...formData,
      location: sanitizeInput(formData.location)
    };
    
    onSearch(sanitizedData);
  };

  const handleReset = () => {
    setFormData({
      type: 'any',
      bedrooms: 'any',
      minPrice: '',
      maxPrice: '',
      location: '',
      addedMonth: 'any'
    });
  };

  const priceOptions = [
    { value: '', label: 'Any' },
    { value: '100000', label: '£100,000' },
    { value: '200000', label: '£200,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '600000', label: '£600,000' },
    { value: '700000', label: '£700,000' },
    { value: '800000', label: '£800,000' },
    { value: '900000', label: '£900,000' },
    { value: '1000000', label: '£1,000,000' }
  ];

  const monthOptions = [
    { value: 'any', label: 'Any month' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
  ];

  return (
    <form onSubmit={handleSubmit} className="search-form" data-testid="search-form">
      <div className="form-group">
        <label htmlFor="type" className="form-label tech-text-muted">🏠 Property Type</label>
        <select 
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-select tech-input"
          data-testid="property-type-select"
        >
          <option value="any">Any Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="bedrooms" className="form-label tech-text-muted">🛏️ Bedrooms</label>
        <select 
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          className="form-select tech-input"
          data-testid="bedrooms-select"
        >
          <option value="any">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="minPrice" className="form-label tech-text-muted">💰 Min Price</label>
          <select 
            id="minPrice"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            className="form-select tech-input"
            data-testid="min-price-select"
          >
            {priceOptions.map(option => (
              <option key={`min-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maxPrice" className="form-label tech-text-muted">💰 Max Price</label>
          <select 
            id="maxPrice"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className="form-select tech-input"
            data-testid="max-price-select"
          >
            {priceOptions.map(option => (
              <option key={`max-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label tech-text-muted">📍 Location/Postcode</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., London or E14"
          className="form-input tech-input"
          data-testid="location-input"
          maxLength="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="addedMonth" className="form-label tech-text-muted">📅 Added in Month</label>
        <select 
          id="addedMonth"
          name="addedMonth"
          value={formData.addedMonth}
          onChange={handleChange}
          className="form-select tech-input"
          data-testid="month-select"
        >
          {monthOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="search-btn tech-btn-primary" data-testid="search-btn">
          🔍 Search Properties
        </button>
        <button 
          type="button" 
          onClick={handleReset}
          className="reset-btn tech-btn-outline"
          data-testid="reset-btn"
        >
          ↺ Reset Form
        </button>
      </div>
    </form>
  );
};

export default SearchForm;