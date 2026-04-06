import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '6rem', 
        fontWeight: 'bold', 
        color: '#f59e0b',
        margin: '0 0 1rem 0'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '2rem',
        margin: '0 0 2rem 0',
        fontWeight: 'normal'
      }}>
        Page Not Found
      </h2>
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '12px 24px',
          fontSize: '1.1rem',
          backgroundColor: '#f59e0b',
          color: '#0f172a',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
