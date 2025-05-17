import React from 'react';

const Contact = () => {
  return (
    <div className="content">
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#fff'
      }}>
        İletişim
      </h1>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <form>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#fff'
            }}>
              İsim:
            </label>
            <input 
              type="text" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: '#fff'
              }} 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#fff'
            }}>
              Email:
            </label>
            <input 
              type="email" 
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: '#fff'
              }} 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              color: '#fff'
            }}>
              Mesaj:
            </label>
            <textarea 
              style={{ 
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-color)',
                color: '#fff',
                minHeight: '100px'
              }} 
            />
          </div>
          <button 
            type="submit"
            style={{ 
              padding: '10px 20px', 
              backgroundColor: 'var(--nav-bg)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Mesaj Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 