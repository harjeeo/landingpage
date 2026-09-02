import React from 'react';

export default function SplitText({ text }) {
  if (!text) return null;

  return (
    <span className="text-slide-wrap" style={{ display: 'inline-block', verticalAlign: 'bottom' }}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="single-letter"
          style={{
            display: 'inline-block',
            transitionDelay: `${index * 0.015}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
