import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center',
        color: 'var(--text-color)'
      }}>
        Word Chain Game
      </h1>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        textAlign: 'center',
        marginBottom: '2.5rem',
        color: 'var(--text-color)'
      }}>
        Word Chain is a fun word game where each word starts with the last letter of the previous one. Test your vocabulary and build the longest chain possible!
      </p>
      <button
        className={`continue-btn${pulse ? ' pulse' : ''}`}
        onClick={() => navigate('/play')}
      >
        Start to play
      </button>
      <hr style={{ width: 300, border: 0, borderTop: '2px solid #bdbdbd', margin: '50px 0 50px 0' }} />
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>
          <span style={{ color: '#c9136b', fontSize: 22, verticalAlign: 'middle', marginRight: 6 }}>🔮</span>
          How to play the Word Chain Game?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Step 1 */}
          <div style={{ background: '#6bc9a3', color: '#222', borderRadius: 8, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            1
          </div>
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Enter a starting word</div>
          <div style={{ color: '#444', fontSize: 17, marginBottom: 0 }}>
            Begin the game by typing a word into the input field and pressing Enter. This will be your starting word.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, margin: '28px 0 28px 0' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
          </div>
          {/* Step 2 */}
          <div style={{ background: '#ffe066', color: '#222', borderRadius: 8, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            2
          </div>
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Build the chain</div>
          <div style={{ color: '#444', fontSize: 17, marginBottom: 0 }}>
            Once the game begins, enter words that start with the last letter of the previous word. Each word must be unique and you have 15 seconds to enter each word. If you don't enter a word in time, the game will end.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, margin: '28px 0 28px 0' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#bbb' }} />
          </div>
          {/* Step 3 */}
          <div style={{ background: '#ff5e5e', color: '#fff', borderRadius: 8, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
            3
          </div>
          <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 8 }}>Winning the game</div>
          <div style={{ color: '#444', fontSize: 17, marginBottom: 0 }}>
            The game continues until you can't find a new word that starts with the last letter of the previous word. Challenge yourself to keep the chain going!
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home; 