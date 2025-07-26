import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { END_POINT } from '../constant';



const Signup = () => {
  const [formdata,setFormdata]=useState({});
  const [open,setOpen]=useState(false);
  const [visible, setVisible] = useState(false);
  const {user}=useSelector(state=>state.appuser);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handlechange=(e)=>{
    setFormdata({
      ...formdata,
      [e.target.id]:e.target.value
    })
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const res=await fetch(`${END_POINT}/update/${user._id}`,{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formdata),
        credentials:'include'
      })
      const data=await res.json();
      window.location.reload();
      
      dispatch(setUser(data));
      
    } catch (error) {
      console.log(error);
    }
  }

  const logoutHandler=async()=>{
      try {
        const res=axios.get(`${END_POINT}/logout`);
        console.log(res);
        dispatch(setUser(null));
        navigate('/');
      } catch (error) {
        console.log(error);
      }
  }
  const deleteHandler=async()=>{
    try {
      const res=await fetch(`${END_POINT}/delete/${user._id}`,{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        credentials:'include'
      })
      await res.json();
      dispatch(setUser(null));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    
  }
  useEffect(() => { setVisible(true); }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'fadeInProfile 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInProfile {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .profile-card {
            box-shadow: 0 8px 32px rgba(40,62,81,0.13);
            background: rgba(255,255,255,0.98);
            border-radius: 18px;
            padding: 44px 32px;
            max-width: 500px;
            width: 100%;
            position: relative;
            overflow: hidden;
          }
          .profile-title {
            font-size: 2rem;
            font-weight: 700;
            color: #283e51;
            margin-bottom: 24px;
            text-align: center;
            letter-spacing: 1px;
            position: relative;
            z-index: 1;
          }
          .profile-label {
            font-weight: 600;
            color: #485563;
            margin-bottom: 8px;
            display: block;
            position: relative;
            z-index: 1;
          }
          .profile-input {
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
          .profile-input:focus {
            border: 1.5px solid #283e51;
            outline: none;
          }
          .profile-btn {
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
            margin-bottom: 12px;
          }
          .profile-btn:hover {
            background: linear-gradient(90deg, #485563 0%, #283e51 100%);
          }
          .profile-actions {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin-top: 8px;
          }
          .logout-btn, .delete-btn {
            height: 40px;
            width: 100px;
            border-radius: 6px;
            color: #fff;
            font-weight: 600;
            border: none;
            cursor: pointer;
            box-shadow: 0 2px 8px #283e5133;
            transition: background 0.2s;
          }
          .logout-btn {
            background: linear-gradient(90deg, #e53935 0%, #283e51 100%);
          }
          .logout-btn:hover {
            background: linear-gradient(90deg, #283e51 0%, #e53935 100%);
          }
          .delete-btn {
            background: linear-gradient(90deg, #f9d423 0%, #e53935 100%);
          }
          .delete-btn:hover {
            background: linear-gradient(90deg, #e53935 0%, #f9d423 100%);
          }
          .confirm-card {
            background: #f7f9fa;
            border-radius: 12px;
            box-shadow: 0 2px 8px #283e5133;
            padding: 24px;
            text-align: center;
            margin-top: 24px;
            animation: fadeInProfile 0.6s;
          }
          .confirm-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 32px;
          }
          .confirm-cancel {
            font-weight: bold;
            color: #388e3c;
            cursor: pointer;
            text-decoration: underline;
            transition: color 0.2s;
          }
          .confirm-cancel:hover {
            color: #283e51;
          }
          .confirm-delete {
            font-weight: bold;
            color: #e53935;
            cursor: pointer;
            text-decoration: underline;
            transition: color 0.2s;
          }
          .confirm-delete:hover {
            color: #283e51;
          }
        `}
      </style>
      <div className="profile-card">
        <div className="profile-title">Profile</div>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <label className="profile-label" htmlFor="fullname">Full Name</label>
          <input defaultValue={user.fullname} type="text" id='fullname' placeholder='Your name' className='profile-input' onChange={handlechange} />
          <label className="profile-label" htmlFor="email">Email</label>
          <input defaultValue={user.email} type="email" id='email' placeholder='Email here' className='profile-input' onChange={handlechange} />
          <label className="profile-label" htmlFor="password">Password</label>
          <input type="password" id='password' placeholder='******' className='profile-input' onChange={handlechange} />
          <button className="profile-btn">Update</button>
        </form>
        <div className="profile-actions">
          <button onClick={logoutHandler} className="logout-btn">Logout</button>
          <button onClick={() => setOpen(true)} className="delete-btn">Delete</button>
        </div>
        {open &&
          <div className="confirm-card">
            <p>Are you sure you want to delete your account?</p>
            <div className="confirm-actions">
              <span onClick={() => setOpen(false)} className="confirm-cancel">Cancel</span>
              <span onClick={deleteHandler} className="confirm-delete">Delete</span>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Signup