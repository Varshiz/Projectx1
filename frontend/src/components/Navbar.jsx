import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleTheme } from '../redux/themeSlice';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.appuser);
  const themes = useSelector(state => state.apptheme.theme);
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <nav
      style={{
        background: 'linear-gradient(90deg, #283e51 0%, #485563 100%)',
        boxShadow: '0 4px 24px rgba(40,62,81,0.10)',
        padding: '16px 32px',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        animation: visible ? 'fadeInNavbar 1s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInNavbar {
            0% { opacity: 0; transform: translateY(-30px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .navbar-title {
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(90deg, #a1a6b4 0%, #388e3c 100%);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            letter-spacing: 1px;
            text-shadow: 0 2px 8px #283e5133;
            transition: background 0.3s;
          }
          .navbar-btn {
            font-size: 1.3rem;
            color: #a1a6b4;
            background: none;
            border: none;
            cursor: pointer;
            margin-right: 12px;
            transition: color 0.2s, transform 0.2s;
          }
          .navbar-btn:hover {
            color: #388e3c;
            transform: scale(1.15);
          }
          .navbar-login {
            padding: 8px 24px;
            background: linear-gradient(90deg, #388e3c 0%, #283e51 100%);
            color: #fff;
            font-weight: 700;
            border-radius: 20px;
            box-shadow: 0 2px 12px #283e5133;
            border: none;
            text-decoration: none;
            transition: background 0.2s, box-shadow 0.2s;
          }
          .navbar-login:hover {
            background: linear-gradient(90deg, #283e51 0%, #388e3c 100%);
            box-shadow: 0 4px 20px #283e5133;
          }
          .navbar-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #388e3c;
            object-fit: cover;
            transition: transform 0.2s, border 0.2s;
          }
          .navbar-avatar:hover {
            transform: scale(1.08);
            border-color: #283e51;
          }
        `}
      </style>
      <Link to="/" className="navbar-title">
        SmartStock
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* <button
          onClick={() => dispatch(toggleTheme())}
          className="navbar-btn"
          title="Toggle Theme"
        >
          {themes === 'dark' ? <FaSun /> : <FaMoon />}
        </button> */}
        {user ? (
          <Link to="/profile" title="Profile">
            <img
              src={user.avatar}
              alt="avatar"
              className="navbar-avatar"
            />
          </Link>
        ) : (
          <Link
            to="/sign-in"
            className="navbar-login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
