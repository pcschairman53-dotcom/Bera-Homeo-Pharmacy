import React from 'react';

interface ShopLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customWidth?: number | string;
  customHeight?: number | string;
  glow?: boolean;
  animated?: boolean;
}

export default function ShopLogo({
  className = '',
  size = 'md',
  customWidth,
  customHeight,
  glow = false,
  animated = false,
}: ShopLogoProps) {
  // Dimensions mapping
  const sizeMap = {
    xs: { w: 'w-8', h: 'h-8' },
    sm: { w: 'w-10', h: 'h-10' },
    md: { w: 'w-14', h: 'h-14' },
    lg: { w: 'w-24', h: 'h-24' },
    xl: { w: 'w-36', h: 'h-36' },
    custom: { w: '', h: '' }
  };

  const selectedSize = sizeMap[size];
  const widthClass = selectedSize.w || '';
  const heightClass = selectedSize.h || '';

  const styleOverrides = size === 'custom' ? {
    width: customWidth,
    height: customHeight
  } : {};

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${widthClass} ${heightClass} ${className} ${
        animated ? 'hover:scale-105 active:scale-95 transition-all duration-300' : ''
      }`}
      style={styleOverrides}
    >
      {/* SaaS Ambient Cyan Glow Layer */}
      {glow && (
        <div className="absolute inset-0 bg-cyan-400/25 rounded-full filter blur-md scale-110 pointer-events-none animate-pulse" />
      )}

      {/* High-Fidelity Vector-Perfect SVG Replica of Bera Homeo Pharmacy Logo */}
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full select-none ${animated ? 'animate-smooth-float' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradients for Premium Look */}
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" /> {/* Rich Orange-600 */}
            <stop offset="50%" stopColor="#DF4D14" /> {/* Standard Coral-Orange */}
            <stop offset="100%" stopColor="#C2410C" /> {/* Dark Orange-700 */}
          </linearGradient>

          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B132B" /> {/* Deepest Midnight Navy */}
            <stop offset="100%" stopColor="#1C2541" /> {/* Rich Slate Navy */}
          </linearGradient>

          {/* SVG Curved Text Paths */}
          {/* Top text path - clockwise arc starting at 180 degrees down to 0 degrees */}
          <path
            id="topTextPath"
            d="M 24,100 A 76,76 0 0,1 176,100"
            fill="none"
          />

          {/* Bottom text path - counter-clockwise arc starting at 176 down to 24 to keep text upright */}
          <path
            id="bottomTextPath"
            d="M 176,100 A 76,76 0 0,1 24,100"
            fill="none"
          />
          
          {/* Drop shadow filter for professional 3D depth */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Circular frame */}
        <circle cx="100" cy="100" r="98" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />

        {/* Outer Orange Band Circle with Premium Gradient */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="url(#orangeGrad)" 
          stroke="#FFFFFF" 
          strokeWidth="1.75" 
          filter="url(#logoShadow)"
        />

        {/* Inner Navy Council Circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="65" 
          fill="url(#navyGrad)" 
          stroke="#FFFFFF" 
          strokeWidth="1.75" 
        />

        {/* Curved Branding Text inside Orange Ring */}
        <text className="font-sans font-extrabold" fill="#FFFFFF" fontSize="12.5px" letterSpacing="1.8px" dy="-1">
          <textPath xlinkHref="#topTextPath" startOffset="50%" textAnchor="middle">
            BERA HOMOEO PHARMACY
          </textPath>
        </text>

        <text className="font-sans font-extrabold" fill="#FFFFFF" fontSize="12.5px" letterSpacing="2.5px" dy="1.5">
          <textPath xlinkHref="#bottomTextPath" startOffset="50%" textAnchor="middle">
            ESTD - 2017
          </textPath>
        </text>

        {/* Dots (left and right divider nodes) */}
        <circle cx="21" cy="100" r="3.75" fill="#FFFFFF" stroke="#0B132B" strokeWidth="0.5" />
        <circle cx="179" cy="100" r="3.75" fill="#FFFFFF" stroke="#0B132B" strokeWidth="0.5" />

        {/* Central High-Contrast Serif Wordmark "BHP" */}
        <g transform="translate(100, 100)">
          {/* Styled grouped lettering to mimic the customized brand typography in the image */}
          <text 
            textAnchor="middle" 
            fill="#FFFFFF" 
            fontFamily="Georgia, 'Times New Roman', serif" 
            fontWeight="bold"
            x="0"
            y="15"
          >
            {/* Custom sizing & kerning for original logo replica */}
            <tspan fontSize="58px" letterSpacing="-1.5px">B</tspan>
            <tspan fontSize="42px" letterSpacing="-1px" dy="-5">H</tspan>
            <tspan fontSize="42px" letterSpacing="-0.5px" dy="0">P</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
}
