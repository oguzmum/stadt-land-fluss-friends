import React from 'react';
import { T } from '../theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'green' | 'red' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  full?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit';
}

const SIZES: Record<Size, React.CSSProperties> = {
  sm: { padding: '10px 18px', fontSize: 14 },
  md: { padding: '15px 24px', fontSize: 16 },
  lg: { padding: '18px 0', fontSize: 18 },
};

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary:   { background: T.primary, color: '#0e0e1a' },
  secondary: { background: T.secondary, color: '#fff' },
  ghost:     { background: T.surfaceHigh, color: T.text, border: `1px solid ${T.border}` },
  green:     { background: T.green, color: '#0e0e1a' },
  red:       { background: T.red, color: '#fff' },
  outline:   { background: 'transparent', color: T.primary, border: `2px solid ${T.primary}` },
};

export function Btn({ children, onClick, variant = 'primary', size = 'md', full = false, disabled = false, style = {}, type = 'button' }: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: T.head,
        fontWeight: 700,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: full ? '100%' : undefined,
        opacity: disabled ? 0.4 : 1,
        transition: 'opacity 0.2s, transform 0.1s',
        ...SIZES[size],
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
