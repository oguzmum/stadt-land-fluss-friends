import React, { useEffect } from 'react';
import { T } from '../theme';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      background: T.red,
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 14,
      fontFamily: T.body,
      fontWeight: 600,
      fontSize: 14,
      zIndex: 9999,
      maxWidth: 320,
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      animation: 'fadeIn 0.2s ease',
    }}>
      {message}
    </div>
  );
}
