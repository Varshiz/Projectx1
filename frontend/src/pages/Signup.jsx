import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import axios from 'axios';
import { END_POINT } from '../constant';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const Signup = () => {
  const [formdata, setFormdata] = useState({
    fullname: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [passtype, setPasstype] = useState('password');
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { fullname, email, password, role } = formdata;
    try {
      setLoader(true);
      const res = await axios.post(
        `${END_POINT}/register`,
        { fullname, email, password, role },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      console.log(res.data);
      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
    setFormdata({ fullname: '', email: '', password: '', role: 'user' });
  };

  const GoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${END_POINT}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(setUser(data));
      navigate('/browse');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #4f46e5 0%, #7c3aed 60%, #a78bfa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeInSignup 1.2s'
      }}
    >
      <style>
        {`
          @keyframes fadeInSignup {
            from { opacity: 0; transform: scale(0.98) translateY(40px);}
            to { opacity: 1; transform: scale(1) translateY(0);}
          }
          .signup-card {
            box-shadow: 0 8px 32px rgba(79,70,229,0.12);
            background: rgba(255,255,255,0.97);
            border-radius: 20px;
            padding: 40px 32px;
            max-width: 400px;
            width: 100%;
          }
          .signup-title {
            font-size: 2rem;
            font-weight: 700;
            color: #4f46e5;
            margin-bottom: 24px;
            text-align: center;
          }
          .signup-label {
            font-weight: 600;
            color: #312e81;
            margin-bottom: 8px;
            display: block;
          }
          .signup-input {
            width: 100%;
            padding: 10px 12px;
            border-radius: 6px;
            border: 1px solid #bcd0ee;
            font-size: 16px;
            background: #f4f8ff;
            margin-bottom: 18px;
          }
          .signup-btn {
            width: 100%;
            padding: 12px 0;
            background: linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%);
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            border-radius: 6px;
            border: none;
            box-shadow: 0 2px 12px #7c3aed33;
            cursor: pointer;
            transition: background 0.2s;
          }
          .signup-btn:hover {
            background: linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%);
          }
        `}
      </style>
      <div className='flex flex-col'>
        <form className="signup-card flex flex-col gap-4 relative" onSubmit={submitHandler}>
          <div className="signup-title">Register Here</div>
          <input
            type="text"
            id="fullname"
            placeholder="Your name"
            className="signup-input"
            onChange={handlechange}
            value={formdata.fullname}
          />
          <input
            type="email"
            id="email"
            placeholder="Email here"
            className="signup-input"
            onChange={handlechange}
            value={formdata.email}
          />
          <input
            type={passtype}
            id="password"
            placeholder="******"
            className="signup-input"
            onChange={handlechange}
            value={formdata.password}
          />
          <button
            type="button"
            className="absolute mt-[145px] ml-[350px]"
            onClick={() => setPasstype(passtype === 'password' ? 'text' : 'password')}
          >
            {passtype === 'password' ? <FaLock /> : <FaLockOpen />}
          </button>

          <select
            id="role"
            value={formdata.role}
            onChange={handlechange}
            className="signup-input"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <p className='dark:text-white'>
            Already have an account?
            <Link to="/sign-in" className="text-blue-500 ml-3 underline">Login</Link>
          </p>

          <button className='signup-btn'>
            {loader ? 'Loading...' : 'Submit'}
          </button>
        </form>

        <p className='dark:text-white font-semibold text-center'>or</p>
        <button
          onClick={GoogleHandler}
          className='p-3 bg-gradient-to-bl from-yellow-700 to-[#be185d] rounded-lg border text-white font-semibold'
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Signup;
