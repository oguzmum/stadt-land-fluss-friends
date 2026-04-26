import React from 'react';
import { T } from '../theme';

interface ScreenProps {
  children: React.ReactNode;
  pad?: boolean;
  style?: React.CSSProperties;
}

export function Screen({ children, pad = true, style = {} }: ScreenProps) {
  return (
    <div
      style={{
        minHeight: '100%',
        background: T.bg,
        color: T.text,
        fontFamily: T.body,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: pad ? '56px 20px 32px' : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
