import React from 'react';
import './FloorPlan.css';

const FloorPlan = ({ property }) => {
  const { bedrooms, type, floorPlan, location } = property;

  // Define room sizes based on property type and bedrooms
  const getRoomSizes = () => {
    const sizes = {
      livingRoom: type === 'House' ? ' 5.2m × 4.1m' : ' 4.8m × 3.6m',
      kitchen: type === 'House' ? ' 4.5m × 3.2m' : ' 3.2m × 2.8m',
      bathroom: type === 'House' ? ' 2.8m × 2.2m' : ' 2.5m × 2.0m',
      bedrooms: [],
      totalArea: type === 'House' ? `${90 + (bedrooms * 15)}m²` : `${65 + (bedrooms * 10)}m²`
    };

    for (let i = 0; i < bedrooms; i++) {
      if (i === 0) {
        sizes.bedrooms.push(type === 'House' ? ' 4.5m × 3.8m' : ' 4.0m × 3.5m');
      } else if (i === 1) {
        sizes.bedrooms.push(type === 'House' ? ' 3.8m × 3.2m' : ' 3.5m × 3.0m');
      } else {
        sizes.bedrooms.push(type === 'House' ? ' 3.5m × 3.0m' : ' 3.2m × 2.8m');
      }
    }

    return sizes;
  };

  const roomSizes = getRoomSizes();

  const getFloorLevels = () => {
    if (type === 'House') {
      return bedrooms >= 4 ? 'Ground, First & Second Floor' : 'Ground & First Floor';
    }
    return 'First Floor';
  };

  return (
    <div className="floor-plan-container tech-glass">
      <div className="floor-plan-header">
        <h4 className="tech-text-gradient">📐 Floor Plan - {bedrooms} Bedroom {type}</h4>
        <p className="floor-plan-description tech-text-light">{floorPlan}</p>
      </div>
      
      <div className="floor-plan-content">
        <div className="floor-plan-svg-container">
          <svg 
            viewBox="0 0 800 550" 
            className="floor-plan-svg"
            preserveAspectRatio="xMidYMid meet"
            aria-label={`Floor plan for ${bedrooms} bedroom ${type} in ${location}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          >

            <rect x="40" y="40" width="720" height="460" fill="rgba(17, 34, 64, 0.3)" stroke="var(--tech-accent)" strokeWidth="3" strokeDasharray="5,5" />
            

            <rect x="360" y="480" width="80" height="20" fill="var(--tech-accent)" stroke="var(--tech-accent)" strokeWidth="2" rx="3">
              <title>Main Entrance</title>
            </rect>
            <text x="400" y="495" textAnchor="middle" fill="var(--tech-text)" fontSize="10" fontWeight="500">
              ENTRANCE
            </text>
            

            <rect x="80" y="80" width="220" height="130" fill="rgba(100, 255, 218, 0.2)" stroke="var(--tech-accent)" strokeWidth="2">
              <title>Living Room - {roomSizes.livingRoom}</title>
            </rect>
            <text x="190" y="135" textAnchor="middle" fill="var(--tech-text)" fontSize="14" fontWeight="600">
              Living Room
            </text>
            <text x="190" y="155" textAnchor="middle" fill="var(--tech-accent)" fontSize="10">
              {roomSizes.livingRoom}
            </text>
            
            <rect x="350" y="80" width="180" height="130" fill="rgba(255, 193, 7, 0.2)" stroke="#FFC107" strokeWidth="2">
              <title>Kitchen - {roomSizes.kitchen}</title>
            </rect>
            <text x="440" y="135" textAnchor="middle" fill="var(--tech-text)" fontSize="14" fontWeight="600">
              Kitchen
            </text>
            <text x="440" y="155" textAnchor="middle" fill="#FFC107" fontSize="10">
              {roomSizes.kitchen}
            </text>
            
            {/* Bedrooms - Different colors for master vs others */}
            {Array.from({ length: bedrooms }).map((_, i) => {
              let xPos, yPos;
              if (bedrooms <= 3) {
                xPos = 80 + (i * 160);
                yPos = 250;
              } else {
                const row = Math.floor(i / 2);
                const col = i % 2;
                xPos = 80 + (col * 200);
                yPos = 250 + (row * 140);
              }
              
              const isMaster = i === 0;
              const fillColor = isMaster ? 'rgba(56, 142, 60, 0.2)' : 'rgba(30, 136, 229, 0.2)';
              const strokeColor = isMaster ? '#388E3C' : '#1E88E5';
              
              return (
                <g key={i}>
                  <rect 
                    x={xPos} 
                    y={yPos} 
                    width="140" 
                    height="110" 
                    fill={fillColor}
                    stroke={strokeColor} 
                    strokeWidth="2"
                  >
                    <title>Bedroom {i + 1} - {roomSizes.bedrooms[i]}</title>
                  </rect>
                  <text x={xPos + 70} y={yPos + 45} textAnchor="middle" fill="var(--tech-text)" fontSize="12" fontWeight="600">
                    {isMaster ? 'Master' : `Bed ${i + 1}`}
                  </text>
                  <text x={xPos + 70} y={yPos + 65} textAnchor="middle" fill={strokeColor} fontSize="9">
                    {roomSizes.bedrooms[i]}
                  </text>
                </g>
              );
            })}
            
            <rect x="550" y="250" width="90" height="110" fill="rgba(156, 39, 176, 0.2)" stroke="#9C27B0" strokeWidth="2">
              <title>Bathroom - {roomSizes.bathroom}</title>
            </rect>
            <text x="595" y="300" textAnchor="middle" fill="var(--tech-text)" fontSize="12" fontWeight="600">
              Bathroom
            </text>
            <text x="595" y="320" textAnchor="middle" fill="#9C27B0" fontSize="9">
              {roomSizes.bathroom}
            </text>
            
            <rect x="310" y="210" width="180" height="40" fill="rgba(158, 158, 158, 0.1)" stroke="var(--tech-border)" strokeWidth="1" strokeDasharray="3,3">
              <title>Hallway</title>
            </rect>
            <text x="400" y="230" textAnchor="middle" fill="var(--tech-text-light)" fontSize="9">
              Hallway
            </text>
            
            <line x1="310" y1="210" x2="400" y2="210" stroke="var(--tech-accent)" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="355" cy="210" r="2" fill="var(--tech-accent)" />
            
            <line x1="80" y1="210" x2="80" y2="250" stroke="var(--tech-accent)" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="80" cy="230" r="2" fill="var(--tech-accent)" />
            
            <rect x="75" y="75" width="5" height="140" fill="var(--tech-accent-light)" stroke="var(--tech-border)" strokeWidth="1" />
            <rect x="320" y="75" width="5" height="140" fill="var(--tech-accent-light)" stroke="var(--tech-border)" strokeWidth="1" />
            
            <g>
              <line x1="600" y1="500" x2="700" y2="500" stroke="var(--tech-accent)" strokeWidth="2" />
              <line x1="600" y1="495" x2="600" y2="505" stroke="var(--tech-accent)" strokeWidth="2" />
              <line x1="700" y1="495" x2="700" y2="505" stroke="var(--tech-accent)" strokeWidth="2" />
              <text x="650" y="490" textAnchor="middle" fill="var(--tech-accent)" fontSize="11" fontWeight="500">
                5m Scale
              </text>
            </g>

            <g>
              <path d="M680,60 L680,40 L675,50 L685,50 Z" fill="var(--tech-accent)" />
              <text x="680" y="35" textAnchor="middle" fill="var(--tech-text)" fontSize="9">
                N
              </text>
            </g>
            
            <text x="400" y="25" textAnchor="middle" fill="var(--tech-text)" fontSize="16" fontWeight="700">
              {bedrooms} BEDROOM {type.toUpperCase()}
            </text>
          </svg>
        </div>
        
        <div className="floor-plan-legend tech-glass">
          <h5 className="tech-text">🗺️ Room Legend</h5>
          <ul>
            <li>
              <span className="legend-color" style={{backgroundColor: 'rgba(100, 255, 218, 0.2)', borderColor: 'var(--tech-accent)'}}></span>
              <div>
                <strong className="tech-text">Living Room</strong>
                <span className="tech-text-muted">{roomSizes.livingRoom}</span>
              </div>
            </li>
            <li>
              <span className="legend-color" style={{backgroundColor: 'rgba(255, 193, 7, 0.2)', borderColor: '#FFC107'}}></span>
              <div>
                <strong className="tech-text">Kitchen</strong>
                <span className="tech-text-muted">{roomSizes.kitchen}</span>
              </div>
            </li>
            <li>
              <span className="legend-color" style={{backgroundColor: 'rgba(56, 142, 60, 0.2)', borderColor: '#388E3C'}}></span>
              <div>
                <strong className="tech-text">Master Bedroom</strong>
                <span className="tech-text-muted">{roomSizes.bedrooms[0]}</span>
              </div>
            </li>
            <li>
              <span className="legend-color" style={{backgroundColor: 'rgba(30, 136, 229, 0.2)', borderColor: '#1E88E5'}}></span>
              <div>
                <strong className="tech-text">Bedrooms</strong>
                <span className="tech-text-muted">{bedrooms} total</span>
              </div>
            </li>
            <li>
              <span className="legend-color" style={{backgroundColor: 'rgba(156, 39, 176, 0.2)', borderColor: '#9C27B0'}}></span>
              <div>
                <strong className="tech-text">Bathroom</strong>
                <span className="tech-text-muted">{roomSizes.bathroom}</span>
              </div>
            </li>
          </ul>
          
          <div className="floor-plan-details">
            <h5 className="tech-text">📊 Property Details</h5>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Total Bedrooms:</span>
                <span className="detail-value tech-text">{bedrooms}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Property Type:</span>
                <span className="detail-value tech-text">{type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Total Area:</span>
                <span className="detail-value tech-text">{roomSizes.totalArea}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Floor Levels:</span>
                <span className="detail-value tech-text">{getFloorLevels()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Layout:</span>
                <span className="detail-value tech-text">{type === 'House' ? 'Detached' : 'Apartment'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label tech-text-muted">Orientation:</span>
                <span className="detail-value tech-text">South Facing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;