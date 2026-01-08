import React from 'react';
import './TechCard.css';

const TechCard = ({ 
  children, 
  className = '', 
  hoverable = true, 
  glow = false,
  onClick 
}) => {
  const cardClasses = [
    'tech-card',
    hoverable && 'tech-card-hoverable',
    glow && 'tech-card-glow',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      data-testid="tech-card"
    >
      {children}
    </div>
  );
};

export default TechCard;