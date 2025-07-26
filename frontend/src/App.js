import React, { useState, useEffect } from 'react';
import Login from './Login';
import AddItem from './AddItem';
import UpdateQuantity from './UpdateQuantity';

function App() {
  const [page, setPage] = useState('login');
  const [token, setToken] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f0ff 0%, #f8faff 100%)',
        animation: visible ? 'fadeIn 1s' : undefined,
      }}
    >
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
      <div
        style={{
          maxWidth: 400,
          margin: '40px auto',
          fontFamily: 'Arial',
        }}
      >
        <h2>Projectx1 Inventory</h2>
        <nav>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('add')} disabled={!token}>
            Add Item
          </button>
          <button onClick={() => setPage('update')} disabled={!token}>
            Update Quantity
          </button>
        </nav>
        <hr />
        {page === 'login' && <Login onLogin={setToken} />}
        {page === 'add' && token && <AddItem token={token} />}
        {page === 'update' && token && <UpdateQuantity token={token} />}
        {!token && page !== 'login' && <p>Please login first.</p>}
      </div>
    </div>
  );
}

export default App;
