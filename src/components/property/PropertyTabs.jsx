import React, { useState } from 'react';
import './PropertyTabs.css';
import FloorPlan from './FloorPlan'; 

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: '📝' },
    { id: 'floorplan', label: 'Floor Plan', icon: '📐' },
    { id: 'map', label: 'Map & Location', icon: '📍' }
  ];

  const getStaticMapImage = (propertyId) => {
    const mapImages = {
      'prop1': 'https://maps.googleapis.com/maps/api/staticmap?center=51.5074,-0.1278&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.5074,-0.1278&scale=2',
      'prop2': 'https://maps.googleapis.com/maps/api/staticmap?center=51.5054,-0.0235&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.5054,-0.0235&scale=2',
      'prop3': 'https://maps.googleapis.com/maps/api/staticmap?center=51.4988,-0.1749&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.4988,-0.1749&scale=2',
      'prop4': 'https://maps.googleapis.com/maps/api/staticmap?center=51.5250,-0.0846&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.5250,-0.0846&scale=2',
      'prop5': 'https://maps.googleapis.com/maps/api/staticmap?center=51.4613,-0.3030&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.4613,-0.3030&scale=2',
      'prop6': 'https://maps.googleapis.com/maps/api/staticmap?center=51.5133,-0.0890&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.5133,-0.0890&scale=2',
      'prop7': 'https://maps.googleapis.com/maps/api/staticmap?center=51.4831,-0.0041&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7C51.4831,-0.0041&scale=2'
    };
    
    // Fallback to Unsplash images if Google Maps is blocked
    const fallbackImages = {
      'prop1': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
      'prop2': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
      'prop3': 'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=600&h=400&fit=crop',
      'prop4': 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=600&h=400&fit=crop',
      'prop5': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
      'prop6': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      'prop7': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop'
    };
    
    return mapImages[propertyId] || fallbackImages[propertyId] || fallbackImages['prop1'];
  };

  const renderDescriptionContent = () => {
    return (
      <div className="description-content">
        <h3>Property Description</h3>
        <div className="description-text">
          {property.description.split('. ').map((sentence, index) => (
            <p key={index} className="description-paragraph">
              {sentence.trim()}.
            </p>
          ))}
        </div>
        
        <div className="key-features">
          <h4>Key Features</h4>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🛏️</span>
              <div>
                <strong>Bedrooms</strong>
                <p>{property.bedrooms}</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏠</span>
              <div>
                <strong>Property Type</strong>
                <p>{property.type}</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📜</span>
              <div>
                <strong>Tenure</strong>
                <p>{property.tenure}</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <div>
                <strong>Added</strong>
                <p>{property.added.day} {property.added.month} {property.added.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFloorPlanContent = () => {
    return (
      <div className="floorplan-content">
        <h3>Floor Plan Details</h3>
        <div className="floorplan-info">
          <div className="floorplan-overview">
            <h4>Layout Overview</h4>
            <p>{property.floorPlan}</p>
          </div>
          
          <div className="floorplan-visualization">
            <h4>Visual Representation</h4>
            {/* Use the proper FloorPlan component */}
            <FloorPlan property={property} />
          </div>
        </div>
      </div>
    );
  };

  const renderMapContent = () => {
    const mapImage = getStaticMapImage(property.id);
    
    return (
      <div className="map-content">
        <h3>📍 Location & Map</h3>
        <div className="map-container">
          <div className="map-section">
            <div className="map-wrapper">
              <div className="static-map-container">
                <img 
                  src={mapImage}
                  alt={`Map showing location of ${property.location}`}
                  className="static-map"
                  onError={(e) => {
                    // Fallback to Unsplash image if Google Maps is blocked
                    const fallbackImages = [
                      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=600&h=400&fit=crop'
                    ];
                    e.target.src = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
                    e.target.alt = 'Location map';
                  }}
                />
                <div className="map-overlay tech-glass">
                  <span className="map-note">📍 Property Location: {property.location}</span>
                </div>
              </div>
            </div>
            
            <div className="map-details">
              <p className="tech-text-muted" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                <strong>Note:</strong> This is a static map showing the approximate location. 
                For interactive maps, please contact us for viewing appointments.
              </p>
            </div>
          </div>
          
          <div className="location-details">
            <div className="address-section">
              <h4>🏠 Property Address</h4>
              <div className="address-card tech-glass">
                <p className="address-line tech-text">{property.location}</p>
                <p className="postcode tech-text-muted">Postcode: {property.postcode}</p>
                <div className="coordinates tech-glass">
                  <span className="tech-text-muted">Coordinates: </span>
                  <code className="tech-text-accent">
                    {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="transport-section">
              <h4>🚆 Transport Links</h4>
              <div className="transport-grid">
                <div className="transport-item tech-glass">
                  <span className="transport-icon">🚆</span>
                  <div>
                    <strong className="tech-text-muted">Nearest Station</strong>
                    <p className="tech-text">Petts Wood Station (0.5 miles)</p>
                  </div>
                </div>
                <div className="transport-item tech-glass">
                  <span className="transport-icon">🚌</span>
                  <div>
                    <strong className="tech-text-muted">Bus Routes</strong>
                    <p className="tech-text">Multiple routes within 0.2 miles</p>
                  </div>
                </div>
                <div className="transport-item tech-glass">
                  <span className="transport-icon">🛣️</span>
                  <div>
                    <strong className="tech-text-muted">Motorway Access</strong>
                    <p className="tech-text">M25 access: 3 miles</p>
                  </div>
                </div>
                <div className="transport-item tech-glass">
                  <span className="transport-icon">🛒</span>
                  <div>
                    <strong className="tech-text-muted">Local Amenities</strong>
                    <p className="tech-text">Shops, schools within walking distance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="area-info tech-glass">
              <h4>🏙️ Area Information</h4>
              <ul className="area-list">
                <li className="tech-text">✓ Excellent schools in catchment area</li>
                <li className="tech-text">✓ Low crime rate neighborhood</li>
                <li className="tech-text">✓ Green spaces and parks nearby</li>
                <li className="tech-text">✓ Supermarkets within 1 mile</li>
                <li className="tech-text">✓ Good Ofsted rated schools</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return renderDescriptionContent();
      case 'floorplan':
        return renderFloorPlanContent();
      case 'map':
        return renderMapContent();
      default:
        return renderDescriptionContent();
    }
  };

  return (
    <div className="property-tabs">
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            data-testid={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="tabs-content-container">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PropertyTabs;