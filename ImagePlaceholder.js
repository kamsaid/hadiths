import * as React from 'react';

export function generatePlaceholderImage(text, width = 800, height = 400, bgColor = '#10b981', textColor = '#ffffff') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add some decorative elements
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.2, width * 0.2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.8, width * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  // Text
  ctx.fillStyle = textColor;
  ctx.font = `bold ${Math.floor(width / 20)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle multi-line text
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > width * 0.8) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  
  // Draw each line
  const lineHeight = Math.floor(width / 15);
  const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
  
  lines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });
  
  return canvas.toDataURL('image/png');
}

export function ImagePlaceholder({ text, width = 800, height = 400, className = '' }) {
  const [imageSrc, setImageSrc] = React.useState('');
  
  React.useEffect(() => {
    setImageSrc(generatePlaceholderImage(text, width, height));
  }, [text, width, height]);
  
  return (
    <img 
      src={imageSrc} 
      alt={text} 
      width={width} 
      height={height}
      className={className}
    />
  );
}
