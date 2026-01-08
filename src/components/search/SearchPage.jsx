import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import FavoritesList from '../favorites/FavoritesList';
import { useFavorites } from '../favorites/FavoritesContext';
import TechCard from '../common/TechCard';
import './SearchPage.css';

const SearchPage = ({ properties }) => {
  const [searchResults, setSearchResults] = useState(properties);
  const [isSearching, setIsSearching] = useState(false);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleSearch = (searchCriteria) => {
    console.log('Search criteria:', searchCriteria);
    
    // SECURITY: Sanitize all user inputs to prevent XSS
    const sanitizedCriteria = {
      ...searchCriteria,
      location: searchCriteria.location.replace(/[<>]/g, '') // Remove dangerous characters
    };
    
    let results = [...properties];
    
    // Filter by property type
    if (sanitizedCriteria.type && sanitizedCriteria.type !== 'any') {
      results = results.filter(prop => prop.type === sanitizedCriteria.type);
    }
    
    // Filter by bedrooms
    if (sanitizedCriteria.bedrooms && sanitizedCriteria.bedrooms !== 'any') {
      const bedrooms = parseInt(sanitizedCriteria.bedrooms);
      if (sanitizedCriteria.bedrooms === '5') {
        results = results.filter(prop => prop.bedrooms >= 5);
      } else {
        results = results.filter(prop => prop.bedrooms === bedrooms);
      }
    }
    
    // Filter by min price
    if (sanitizedCriteria.minPrice) {
      results = results.filter(prop => prop.price >= parseInt(sanitizedCriteria.minPrice));
    }
    
    // Filter by max price
    if (sanitizedCriteria.maxPrice) {
      results = results.filter(prop => prop.price <= parseInt(sanitizedCriteria.maxPrice));
    }
    
    // Filter by location/postcode
    if (sanitizedCriteria.location) {
      const locationLower = sanitizedCriteria.location.toLowerCase();
      results = results.filter(prop => 
        prop.location.toLowerCase().includes(locationLower) ||
        prop.postcode.toLowerCase().includes(locationLower)
      );
    }
    
    // Filter by month added
    if (sanitizedCriteria.addedMonth && sanitizedCriteria.addedMonth !== 'any') {
      results = results.filter(prop => prop.added.month === sanitizedCriteria.addedMonth);
    }
    
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleClearSearch = () => {
    setSearchResults(properties);
    setIsSearching(false);
  };

  return (
    <div className="search-page">
      <div className="tech-container">
        <div className="search-layout">
          <aside className="sidebar">
            <TechCard className="search-box" glow>
              <div className="search-box-header">
                <h3 className="tech-text-gradient">🔍 Search Properties</h3>
                {isSearching && (
                  <button 
                    onClick={handleClearSearch} 
                    className="clear-search-btn tech-btn-outline"
                    data-testid="clear-search-btn"
                  >
                    ↺ Clear Search
                  </button>
                )}
              </div>
              <SearchForm onSearch={handleSearch} />
            </TechCard>
            
            <div className="favorites-sidebar">
              <TechCard className="favorites-box" glow>
                <h3 className="tech-text-gradient">⭐ My Favorites ({favorites.length})</h3>
                <FavoritesList 
                  favorites={favorites}
                  onViewProperty={handleViewProperty}
                />
              </TechCard>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="results-area">
            <div className="results-header">
              <h2 className="tech-text-gradient">🏠 Available Properties</h2>
              <div className="results-info">
                <p className="results-count tech-text-muted">
                  {isSearching 
                    ? `Found ${searchResults.length} property${searchResults.length !== 1 ? 's' : ''} matching your criteria`
                    : `Browse our collection of ${properties.length} modern properties`
                  }
                </p>
                {isSearching && searchResults.length > 0 && (
                  <button 
                    onClick={handleClearSearch} 
                    className="show-all-btn tech-btn-outline"
                    data-testid="show-all-btn"
                  >
                    Show All Properties
                  </button>
                )}
              </div>
            </div>
            
            <SearchResults 
              properties={isSearching ? searchResults : properties}
              onViewProperty={handleViewProperty}
            />
            
            {isSearching && searchResults.length === 0 && (
              <TechCard className="no-results-message">
                <div className="no-results-content">
                  <h3 className="tech-text-gradient">🚫 No properties found</h3>
                  <p className="tech-text-muted">
                    Try adjusting your search criteria or{' '}
                    <button 
                      onClick={handleClearSearch} 
                      className="text-link tech-text-accent"
                      data-testid="show-all-properties-link"
                    >
                      show all properties
                    </button>
                  </p>
                </div>
              </TechCard>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;