import React, { useEffect, useState } from 'react';

const Home = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #23395d 0%, #4f5d75 60%, #a1a6b4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        animation: visible ? 'fadeInHome 1.2s' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInHome {
            from { opacity: 0; transform: scale(0.98) translateY(40px);}
            to { opacity: 1; transform: scale(1) translateY(0);}
          }
          .home-card {
            box-shadow: 0 8px 32px rgba(35,57,93,0.12);
            background: rgba(255,255,255,0.97);
            border-radius: 20px;
            padding: 48px 32px;
            max-width: 600px;
            width: 100%;
            transition: box-shadow 0.3s;
          }
          .home-card:hover {
            box-shadow: 0 12px 40px rgba(79,93,117,0.18);
          }
          .home-title {
            font-size: 2.8rem;
            font-weight: 800;
            color: #23395d;
            margin-bottom: 24px;
            letter-spacing: 1px;
            text-shadow: 0 2px 8px #a1a6b433;
          }
          .home-desc {
            font-size: 1.25rem;
            color: #4f5d75;
            margin-bottom: 18px;
            font-weight: 500;
          }
          .home-sub {
            font-size: 1.1rem;
            color: #7c818c;
            margin-bottom: 8px;
          }
          .home-btn {
            display: inline-block;
            padding: 14px 40px;
            background: linear-gradient(90deg, #23395d 0%, #4f5d75 100%);
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            border-radius: 30px;
            box-shadow: 0 2px 12px #4f5d7533;
            border: none;
            text-decoration: none;
            transition: background 0.2s, box-shadow 0.2s;
          }
          .home-btn:hover {
            background: linear-gradient(90deg, #4f5d75 0%, #23395d 100%);
            box-shadow: 0 4px 20px #23395d33;
          }
        `}
      </style>
      <div className="home-card">
        <h1 className="home-title">
          SmartStock: Modern Inventory Management
        </h1>
        <p className="home-desc">
          Effortlessly track, organize, and optimize your inventory with SmartStock’s intuitive dashboard and real-time insights.
        </p>
        <p className="home-sub">
          Empower your business with seamless control, smart analytics, and a modern experience designed for growth.
        </p>
        <div style={{ marginTop: 32 }}>
          <a href="/browse" className="home-btn">
            Get Started →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
