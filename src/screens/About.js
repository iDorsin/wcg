import React from 'react';

const About = () => {
  return (
    <div className="content">
      <h1 style={{ 
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#fff'
      }}>
        About
      </h1>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <p style={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          This game is a fun word chain game where each word must start with the last letter of the previous word. <br />
          The goal is to improve your English vocabulary and have fun!
        </p>
      </div>
      <div style={{
        backgroundColor: 'var(--card-bg)',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ marginTop: 0, color: '#fff' }}>Contact</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          For feedback, suggestions or bug reports, please contact:<br />
          <b>Email:</b> <a href="mailto:info@wordchaingame.com" style={{ color: '#ffe066' }}>dorsin1918@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default About; 