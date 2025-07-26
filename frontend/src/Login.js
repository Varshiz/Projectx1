import React, { useState, useEffect } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API endpoint
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.token) {
      onLogin(data.token);
      setMsg('Login successful!');
    } else {
      setMsg('Login failed.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f0ff 0%, #f8faff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: visible ? 'fadeIn 1s' : undefined
    }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
      <form style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(30, 64, 175, 0.10)',
        padding: 32,
        maxWidth: 400,
        width: '100%',
        animation: visible ? 'fadeIn 1s' : undefined
      }} onSubmit={handleSubmit}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: 24,
          color: '#204080',
          letterSpacing: 1
        }}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%' }}>Login</button>
        <div style={{ color: 'red', marginTop: 8 }}>{msg}</div>
      </form>
    </div>
  );
}

export default Login;
