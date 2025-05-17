import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import words from 'an-array-of-english-words'; // Kelime listesi
import Confetti from 'react-confetti'; // Konfeti Efekti
import Modal from './Modal'; 

const Play = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [wordsList, setWordsList] = useState([]); // Girilen kelimeler
  const [usedWords, setUsedWords] = useState([]); // Tekrar kontrolü için
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  const [message, setMessage] = useState('Enter a word to start the game');
  const [messageColor, setMessageColor] = useState('#217a3a');
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('bestScore') || 0));
  const [history, setHistory] = useState(() => {
    const h = localStorage.getItem('wcg_history');
    return h ? JSON.parse(h) : [];
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const timerRef = useRef();
  const inputRef = useRef();

  // Timer effect
  useEffect(() => {
    if (gameActive && time > 0) {
      timerRef.current = setTimeout(() => setTime(t => t - 1), 1000);
    } else if (gameActive && time === 0) {
      handleGameOver();
    }
    return () => clearTimeout(timerRef.current);
  }, [gameActive, time]);

  // Oyun bittiğinde input'u disable et
  useEffect(() => {
    if (gameOver && inputRef.current) inputRef.current.blur();
  }, [gameOver]);

  // Oyun başlat
  const startGame = (firstWord) => {
    setWordsList([firstWord]);
    setUsedWords([firstWord.toLowerCase()]);
    setScore(firstWord.length);
    setTime(15);
    setGameActive(true);
    setGameOver(false);
    setMessage(`'${firstWord[firstWord.length-1]}' harfi ile kelime bulun`);
    setMessageColor('#217a3a');
  };

  // Oyun bitişi
  const handleGameOver = () => {
    setGameActive(false);
    setGameOver(true);
    if (score > bestScore) {
      setIsNewRecord(true);
      setBestScore(score);
      localStorage.setItem('bestScore', score);
      setShowResultModal(true);
      setTimeout(() => {
        setMessage('Congratulations! New High Score!');
        setMessageColor('#ffe066');
      }, 1200);
    } else {
      setIsNewRecord(false);
      setMessage('Game Over!');
      setMessageColor('#c90000');
    }
    // Maçı geçmişe ekle (Local Storage'a kaydet)
    if (wordsList.length > 0) {
      const newHistory = [
        {
          date: new Date().toLocaleString(),
          words: wordsList,
          score,
        },
        ...history.slice(0, 9)
      ];
      setHistory(newHistory);
      localStorage.setItem('wcg_history', JSON.stringify(newHistory));
    }
  };

  // Yeni kelime doğrulama fonksiyonu
  const validateWord = (word) => {
    if (!word) return { valid: false, reason: 'empty' };
    if (word.length < 3) return { valid: false, reason: 'too-short' };
    if (!words.includes(word.toLowerCase())) return { valid: false, reason: 'not-in-dictionary' };
    if (usedWords.includes(word.toLowerCase())) return { valid: false, reason: 'already-used' };
    if (wordsList.length > 0) {
      const last = wordsList[wordsList.length - 1];
      if (word[0].toLowerCase() !== last[last.length - 1].toLowerCase()) return { valid: false, reason: 'wrong-letter' };
    }
    return { valid: true };
  };

  // Input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameOver) return;
    const word = input.trim();
    // Gizli reset kodu (Local Storage'ı temizle)
    if (word === '/resetall') {
      localStorage.removeItem('bestScore');
      localStorage.removeItem('wcg_history');
      setBestScore(0);
      setHistory([]);
      setMessage('All scores and history have been reset!');
      setMessageColor('#c90000');
      setInput('');
      return;
    }
    const validation = validateWord(word);
    if (!gameActive && validation.valid) {
      startGame(word);
      setInput('');
      return;
    }
    if (!validation.valid) {
      if (validation.reason === 'empty') {
        setMessage('Please enter a word.');
        setMessageColor('#c90000');
      } else if (validation.reason === 'too-short') {
        setMessage('Word must be at least 3 letters.');
        setMessageColor('#c90000');
      } else if (validation.reason === 'not-in-dictionary') {
        setMessage('Word not in dictionary!');
        setMessageColor('#c90000');
      } else if (validation.reason === 'already-used') {
        setMessage('Word already used!');
        setMessageColor('#ff9900');
      } else if (validation.reason === 'wrong-letter') {
        setMessage('Word must start with last letter!');
        setMessageColor('#c90000');
      }
      setInput('');
      return;
    }
    // Doğru kelime
    setWordsList([...wordsList, word]);
    setUsedWords([...usedWords, word.toLowerCase()]);
    setScore(score + word.length);
    setTime(15);
    setMessage(`'${word[word.length-1]}' harfi ile kelime bulun`);
    setMessageColor('#217a3a');
    setInput('');
  };

  // Tekrar oyna
  const handleRestart = () => {
    setInput('');
    setWordsList([]);
    setUsedWords([]);
    setScore(0);
    setTime(15);
    setGameActive(false);
    setGameOver(false);
    setMessage('Enter a word to start the game');
    setMessageColor('#217a3a');
    setIsNewRecord(false);
  };

  useEffect(() => {
    if (showResultModal && isNewRecord) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
    }
    // eslint-disable-next-line
  }, [showResultModal, isNewRecord]);

  return (
    <div className="play-bg">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={['#6bc913', '#ffe066', '#ff5e5e', '#217a3a']}
          gravity={0.3}
          tweenDuration={4000}
          initialVelocityY={15}
          wind={0.05}
        />
      )}
      <div className="play-container">
        <div className="play-header">
          <button className="play-btn play-btn--yellow" onClick={() => navigate('/')}>← Back</button>
          <button className="play-btn play-btn--red" onClick={() => setShowModal(true)}>🐞 Report a bug</button>
        </div>
        <div className="play-card">
          <div className="play-stats">
            <div>
              <div className="play-stats-label">WORD COUNT</div>
              <div className="play-stats-value">{wordsList.length}</div>
            </div>
            <div>
              <div className="play-stats-label">TIME</div>
              <div className={`play-stats-time${gameActive && !gameOver && time <= 5 ? ' pulse' : ''}`} style={{
                color: !gameActive
                  ? '#fff'
                  : gameOver
                    ? messageColor
                    : time > 10
                      ? '#6bc913'
                      : time > 5
                        ? '#ffe066'
                        : '#ff5e5e'
              }}>
                {time}<span className="play-stats-time-s">s</span>
              </div>
            </div>
            <div>
              <div className="play-stats-label">SCORE</div>
              <div className="play-stats-value">{score}</div>
            </div>
          </div>
          <hr className="play-divider" />
          <div className="play-start-msg" style={{
            background: gameOver
              ? (messageColor === '#ffe066' ? '#fffbe6' : '#ffeaea')
              : time > 10
                ? '#e6faee'
                : time > 5
                  ? '#fffbe6'
                  : '#ffeaea',
            color: gameOver
              ? messageColor
              : time > 10
                ? '#217a3a'
                : time > 5
                  ? '#bba100'
                  : '#c90000'
          }}>
            {message}
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              className="play-input"
              placeholder="Enter your word here"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={gameOver}
              ref={inputRef}
            />
          </form>
          <div style={{ margin: '18px 0 0 0', minHeight: 40 }}>
            {wordsList.length > 0 && (
              <div style={{ textAlign: 'left', fontSize: 15, color: 'var(--text-color)' }}>
                <b>Words:</b>
                <ul style={{ margin: '8px 0 0 0', padding: 0, listStyle: 'none' }}>
                  {wordsList.map((w, i) => {
                    const isLast = i === wordsList.length - 1;
                    const isNewRecord = isLast && score > bestScore;
                    return (
                      <li key={i} style={{
                        display: 'inline-block',
                        marginRight: 8,
                        marginBottom: 4,
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: isLast ? '#6bc913' : '#f0f0f0',
                        color: isLast ? '#fff' : '#444',
                        fontWeight: isLast ? 600 : 500,
                        border: isLast ? '2px solid #6bc913' : '1px solid #eee',
                        position: 'relative',
                        textAlign: 'center',
                        verticalAlign: 'bottom'
                      }}>
                        {isNewRecord && (
                          <span style={{
                            position: 'absolute',
                            left: '50%',
                            top: '-32px',
                            transform: 'translateX(-50%)',
                            fontSize: 22,
                            lineHeight: 1,
                            zIndex: 2,
                            marginBottom: '10px'
                          }}>👑</span>
                        )}
                        {w}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          {gameOver && (
            <button className="play-btn play-btn--yellow" style={{ marginTop: 18 }} onClick={handleRestart}>Restart</button>
          )}
          <div style={{ marginTop: 18, fontSize: 14, color: '#888' }}>
            Best Score: <b>{bestScore}</b>
          </div>
        </div>
        {/* Oyun geçmişi kartı */}
        {history.length > 0 && (
          <div className="play-card play-history-card" style={{ marginTop: 32 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Previous Games</div>
            <div className="play-history-list">
              {history.map((h, i) => (
                <div key={i} className="play-history-item">
                  <div style={{ fontSize: 14, color: '#888', marginBottom: 2 }}>{h.date}</div>
                  <div style={{ fontSize: 15, marginBottom: 2 }}>
                    <b>Score:</b> {h.score} &nbsp; <b>Words:</b> {h.words.length}
                  </div>
                  <div style={{ fontSize: 14, color: '#217a3a', wordBreak: 'break-all' }}>
                    {h.words.map((w, wi) => (
                      <span key={wi} style={{
                        display: 'inline-block',
                        marginRight: 6,
                        marginBottom: 2,
                        padding: '3px 8px',
                        borderRadius: 5,
                        background: wi === h.words.length - 1 ? '#6bc913' : '#f0f0f0',
                        color: wi === h.words.length - 1 ? '#fff' : '#444',
                        fontWeight: wi === h.words.length - 1 ? 600 : 500,
                        border: wi === h.words.length - 1 ? '2px solid #6bc913' : '1px solid #eee'
                      }}>{w}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h2 style={{ marginTop: 0, color: '#ffe066' }}>Contact</h2>
        <p style={{ fontSize: 17, marginBottom: 0 }}>
          For feedback, suggestions or bug reports:<br />
          <b>Email:</b> <a href="mailto:dorsin1918@gmail.com" style={{ color: '#ffe066' }}>dorsin1918@gmail.com</a>
        </p>
      </Modal>
      <Modal open={showResultModal} onClose={() => setShowResultModal(false)}>
        <h2 style={{ marginTop: 0, color: '#ffe066' }}>Game Over</h2>
        <div style={{ fontSize: 18, margin: '10px 0' }}><b>Score:</b> {score}</div>
        <div style={{ fontSize: 16, margin: '10px 0' }}><b>Best Score:</b> {bestScore}</div>
        <div style={{ fontSize: 16, margin: '10px 0' }}><b>Word Count:</b> {wordsList.length}</div>
        <div style={{ fontSize: 15, color: '#217a3a', margin: '10px 0' }}>
          <b>Words:</b> {wordsList.join(', ')}
        </div>
        <button className="play-btn play-btn--yellow" style={{ marginTop: 18 }} onClick={() => { setShowResultModal(false); handleRestart(); }}>Restart</button>
      </Modal>
    </div>
  );
};

export default Play; 