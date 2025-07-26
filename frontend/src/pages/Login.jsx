import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  // ...existing state and logic...

  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'fadeInLogin 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInLogin {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .login-card {
            box-shadow: 0 8px 32px rgba(40,62,81,0.13);
            background: rgba(255,255,255,0.98);
            border-radius: 18px;
            padding: 44px 32px;
            max-width: 400px;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          .login-card::before {
            content: "";
            position: absolute;
            left: -60px;
            top: -60px;
            width: 160px;
            height: 160px;
            background: radial-gradient(circle, #a1a6b4 0%, transparent 70%);
            opacity: 0.18;
            z-index: 0;
            animation: pulseBg 2.5s infinite alternate;
          }
          @keyframes pulseBg {
            from { transform: scale(1);}
            to { transform: scale(1.12);}
          }
          .login-title {
            font-size: 2rem;
            font-weight: 700;
            color: #283e51;
            margin-bottom: 24px;
            text-align: center;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
          }
          .login-label {
            font-weight: 600;
            color: #485563;
            margin-bottom: 8px;
            display: block;
            position: relative;
            z-index: 1;
          }
          .login-input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 6px;
            border: 1px solid #a1a6b4;
            font-size: 16px;
            background: #f7f9fa;
            margin-bottom: 18px;
            position: relative;
            z-index: 1;
            transition: border 0.2s;
          }
          .login-input:focus {
            border: 1.5px solid #283e51;
            outline: none;
          }
          .login-btn {
            width: 100%;
            padding: 12px 0;
            background: linear-gradient(90deg, #283e51 0%, #485563 100%);
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            border-radius: 6px;
            border: none;
            box-shadow: 0 2px 12px #283e5133;
            cursor: pointer;
            transition: background 0.2s;
            position: relative;
            z-index: 1;
          }
          .login-btn:hover {
            background: linear-gradient(90deg, #485563 0%, #283e51 100%);
          }
        `}
      </style>
      <form className="login-card" onSubmit={/* ...existing handleSubmit... */}>
        <div className="login-title">Login</div>
        <label className="login-label">Username</label>
        <input className="login-input" type="text" /* ...existing props... */ />
        <label className="login-label">Password</label>
        <input className="login-input" type="password" /* ...existing props... */ />
        <button className="login-btn" type="submit">Login</button>
        {/* ...existing message display... */}
      </form>
    </div>
  );
};

export default Login;
