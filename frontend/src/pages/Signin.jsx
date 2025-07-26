import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaLockOpen } from "react-icons/fa";
import { END_POINT } from '../constant';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Signin = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [passtype, setPasstype] = useState('password');
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { setVisible(true); }, []);

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formdata;
    const user = { email, password };

    try {
      setLoader(true);
      const res = await axios.post(`${END_POINT}/login`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      const { user: loggedInUser } = res.data;

      // Save user to Redux & localStorage
      dispatch(setUser(loggedInUser));
      localStorage.setItem('user', JSON.stringify(loggedInUser));

      // Redirect based on role
      if (loggedInUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/browse');
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }

    setFormdata({ email: "", password: "" });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'fadeInSignin 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInSignin {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .signin-card {
            box-shadow: 0 8px 32px rgba(40,62,81,0.13);
            background: rgba(255,255,255,0.98);
            border-radius: 18px;
            padding: 44px 32px;
            max-width: 400px;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          .signin-card::before {
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
          .signin-title {
            font-size: 2rem;
            font-weight: 700;
            color: #283e51;
            margin-bottom: 24px;
            text-align: center;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
          }
          .signin-label {
            font-weight: 600;
            color: #485563;
            margin-bottom: 8px;
            display: block;
            position: relative;
            z-index: 1;
          }
          .signin-input {
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
          .signin-input:focus {
            border: 1.5px solid #283e51;
            outline: none;
          }
          .signin-btn {
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
          .signin-btn:hover {
            background: linear-gradient(90deg, #485563 0%, #283e51 100%);
          }
          .toggle-btn {
            position: absolute;
            top: 110px;
            right: 18px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 2;
            font-size: 1.2rem;
            color: #485563;
          }
        `}
      </style>
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>
        <form className="flex flex-col gap-4 relative" onSubmit={submitHandler}>
          <label className="signin-label" htmlFor="email">Email</label>
          <input
            id='email'
            type="email"
            placeholder='Email here'
            className='signin-input'
            onChange={handlechange}
            value={formdata.email}
          />
          <label className="signin-label" htmlFor="password">Password</label>
          <input
            id='password'
            type={passtype}
            placeholder='******'
            className='signin-input'
            onChange={handlechange}
            value={formdata.password}
          />
          <button
            className="toggle-btn"
            type='button'
            onClick={() => setPasstype(passtype === 'password' ? 'text' : 'password')}
            tabIndex={-1}
          >
            {passtype === 'password' ? <FaLock /> : <FaLockOpen />}
          </button>
          <p style={{ color: '#485563', marginTop: 8 }}>
            New user?
            <Link to="/sign-up" style={{ color: '#283e51', marginLeft: 8, textDecoration: 'underline', fontWeight: 500 }}>Signup</Link>
          </p>
          <button className="signin-btn">
            {loader ? "Loading.." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
