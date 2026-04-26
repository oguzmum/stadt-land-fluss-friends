import React from 'react';
import { T } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ children, style = {} }: CardProps) {
  return (
    <div
      style={{
        background: T.surface,
        borderRadius: 20,
        padding: 20,
        border: `1px solid ${T.border}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
