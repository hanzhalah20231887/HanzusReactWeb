import React, { createContext, useState, useEffect, useContext } from 'react';
import { validatePropertyData } from '../utils/security';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('techPropertyFavorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Validate loaded data
        if (Array.isArray(parsedFavorites)) {
          const validFavorites = parsedFavorites.filter(validatePropertyData);
          setFavorites(validFavorites);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        localStorage.removeItem('techPropertyFavorites');
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techPropertyFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  // Add property to favorites with duplicate prevention
  const addFavorite = (property) => {
    if (!validatePropertyData(property)) {
      console.error('Invalid property data');
      return false;
    }
    
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites(prev => [...prev, property]);
      return true;
    }
    return false;
  };

  // Remove property from favorites
  const removeFavorite = (propertyId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  const isFavorite = (propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};