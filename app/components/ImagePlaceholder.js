import React from 'react';

const ImagePlaceholder = ({ title, theme = "duson" }) => {
  // Create a simple color mapping for different themes
  const colorMap = {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      accent: "bg-emerald-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      accent: "bg-blue-200",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      accent: "bg-amber-200",
    },
    rose: {
      bg: "bg-rose-100",
      text: "text-rose-800",
      accent: "bg-rose-200",
    },
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-800",
      accent: "bg-violet-200",
    },
    duson: {
      bg: "bg-duson-cream/30", 
      text: "text-duson-ebony dark:text-duson-cream",
      accent: "bg-duson-yellow/30",
    },
  };

  // Use the theme or default to duson
  const colors = colorMap[theme] || colorMap.duson;

  // Create a unique pattern based on the title
  const getPatternElements = () => {
    // Use the title to create a semi-random pattern
    const hashCode = title.split('').reduce(
      (acc, char) => char.charCodeAt(0) + acc, 0
    );
    
    // Create different geometric elements based on the hash
    const elements = [];
    
    // Add circles
    for (let i = 0; i < 5; i++) {
      const size = 10 + ((hashCode + i * 13) % 40);
      const top = ((hashCode + i * 27) % 80);
      const left = ((hashCode + i * 19) % 90);
      elements.push(
        <div 
          key={`circle-${i}`}
          className={`absolute rounded-full ${colors.accent} opacity-70`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    }
    
    return elements;
  };

  return (
    <div className={`w-full h-full ${colors.bg} relative overflow-hidden flex items-center justify-center`}>
      {/* Background pattern */}
      {getPatternElements()}
      
      {/* Overlay with text */}
      <div className="relative z-10 px-4 py-2 rounded-lg bg-white bg-opacity-90 text-center">
        <h3 className={`font-medium ${colors.text}`}>{title}</h3>
      </div>
    </div>
  );
};

export default ImagePlaceholder; 