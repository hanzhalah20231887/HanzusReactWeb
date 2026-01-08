import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './components/favorites/FavoritesContext';
import SearchPage from './components/search/SearchPage';
import PropertyPage from './components/property/PropertyPage';
import propertiesData from '../properties.json';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProperties(propertiesData.properties);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>Property Search</h1>
            <p className="subtitle">Find your dream home</p>
          </div>
        </header>
        <main className="main-content">
          <div className="container">
            <div className="loading-state">
              <h2>Loading properties...</h2>
              <div className="loading-spinner"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <FavoritesProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <div className="container">
              <h1>Property Search</h1>
              <p className="subtitle">Find your dream home</p>
            </div>
          </header>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<SearchPage properties={properties} />} />
              <Route path="/property/:id" element={<PropertyPage properties={properties} />} />
            </Routes>
          </main>
          
          <footer className="app-footer">
            <div className="container">
              <p>&copy; 2024 Property Search</p>
              <p className="security-notice">🔒 Secure with CSP protection</p>
            </div>
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;