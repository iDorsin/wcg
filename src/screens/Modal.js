import React from 'react';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.35)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        color: 'var(--text-color)',
        borderRadius: 12,
        padding: '32px 28px',
        minWidth: 320,
        boxShadow: '0 4px 24px #0003',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: 10,
          right: 16,
          background: 'none',
          border: 'none',
          color: 'var(--text-color)',
          fontSize: 22,
          cursor: 'pointer'
        }}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 