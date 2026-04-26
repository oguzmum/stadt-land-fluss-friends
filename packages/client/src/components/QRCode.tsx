import React from 'react';

interface QRCodeProps {
  size?: number;
  value?: string;
}

export function QRCode({ size = 148 }: QRCodeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 148 148"
      style={{ borderRadius: 12, background: '#fff', display: 'block' }}
    >
      {/* TL finder */}
      <rect x="8" y="8" width="40" height="40" rx="4" fill="#111" />
      <rect x="14" y="14" width="28" height="28" rx="2" fill="#fff" />
      <rect x="20" y="20" width="16" height="16" rx="1" fill="#111" />
      {/* TR finder */}
      <rect x="100" y="8" width="40" height="40" rx="4" fill="#111" />
      <rect x="106" y="14" width="28" height="28" rx="2" fill="#fff" />
      <rect x="112" y="20" width="16" height="16" rx="1" fill="#111" />
      {/* BL finder */}
      <rect x="8" y="100" width="40" height="40" rx="4" fill="#111" />
      <rect x="14" y="106" width="28" height="28" rx="2" fill="#fff" />
      <rect x="20" y="112" width="16" height="16" rx="1" fill="#111" />
      {/* data dots */}
      {[0,1,2,3,4,5,6,7].map(r => [0,1,2,3,4,5,6,7].map(c => {
        const x = 56 + c * 11, y = 8 + r * 11;
        return ((r + c * 2 + r * c) % 3 !== 1) && (
          <rect key={`${r}-${c}`} x={x} y={y} width="7" height="7" rx="1" fill="#111" />
        );
      }))}
      {[0,1,2,3,4,5].map(r => [0,1,2,3,4,5].map(c => {
        const x = 8 + c * 11, y = 56 + r * 11;
        return ((r * 3 + c + r + c * r) % 4 !== 2) && (
          <rect key={`bl-${r}-${c}`} x={x} y={y} width="7" height="7" rx="1" fill="#111" />
        );
      }))}
      {[0,1,2,3,4,5].map(r => [0,1,2,3,4,5].map(c => {
        const x = 100 + c * 8, y = 56 + r * 9;
        return ((r + c * r + c) % 3 === 0) && (
          <rect key={`br-${r}-${c}`} x={x} y={y} width="5" height="5" rx="1" fill="#111" />
        );
      }))}
    </svg>
  );
}
