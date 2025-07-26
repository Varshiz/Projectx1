import React, { useState, useEffect } from 'react';

function AddItem({ token }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [msg, setMsg] = useState('');

  // Fade-in animation
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API endpoint
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, quantity: Number(quantity) })
    });
    if (res.ok) {
      setMsg('Item added!');
      setName('');
      setQuantity('');
    } else {
      setMsg('Failed to add item.');
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
      <div style={{
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(30, 64, 175, 0.10)',
        padding: 32,
        maxWidth: 400,
        width: '100%',
        animation: visible ? 'fadeIn 1s' : undefined
      }}>
        <form onSubmit={handleSubmit}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: 24,
            color: '#204080',
            letterSpacing: 1
          }}>Add New Item</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: 600,
              color: '#204080'
            }}>Item Name</label>
            <input
              type="text"
              placeholder="Enter item name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #bcd0ee',
                fontSize: 16,
                background: '#f4f8ff',
                transition: 'border 0.2s'
              }}
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontWeight: 600,
              color: '#204080'
            }}>Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #bcd0ee',
                fontSize: 16,
                background: '#f4f8ff',
                transition: 'border 0.2s'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 0',
              background: 'linear-gradient(90deg, #204080 0%, #3a7bd5 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(30,64,175,0.08)',
              transition: 'background 0.2s'
            }}
          >
            Add Item
          </button>
          <div style={{
            color: 'green',
            marginTop: 18,
            textAlign: 'center',
            minHeight: 24,
            fontWeight: 500
          }}>{msg}</div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
