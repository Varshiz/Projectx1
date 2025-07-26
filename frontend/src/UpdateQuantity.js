import React, { useState, useEffect } from 'react';

function UpdateQuantity({ token }) {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API endpoint
    const res = await fetch(`/api/items/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: Number(quantity) })
    });
    if (res.ok) {
      setMsg('Quantity updated!');
      setItemId('');
      setQuantity('');
    } else {
      setMsg('Failed to update.');
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
        }}>Update Quantity</h2>
        <input
          type="text"
          placeholder="Item ID"
          value={itemId}
          onChange={e => setItemId(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <input
          type="number"
          placeholder="New Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
          style={{ width: '100%', marginBottom: 8 }}
        />
        <button type="submit" style={{ width: '100%' }}>Update</button>
        <div style={{ color: 'blue', marginTop: 8 }}>{msg}</div>
      </form>
    </div>
  );
}

export default UpdateQuantity;
