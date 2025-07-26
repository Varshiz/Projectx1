import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { END_POINT } from '../constant';

const Browse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${END_POINT}/get`, {
        withCredentials: true,
      });
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    setVisible(true);
  }, []);

  if (loading) return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'fadeInBrowse 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInBrowse {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
      <p style={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>Loading products...</p>
    </div>
  );
  if (error) return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: visible ? 'fadeInBrowse 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInBrowse {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
      <p style={{ color: '#e53935', fontSize: 22, fontWeight: 600 }}>{error}</p>
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        padding: '48px 0',
        animation: visible ? 'fadeInBrowse 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInBrowse {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .browse-title {
            font-size: 2.2rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 32px;
            text-align: center;
            letter-spacing: 1px;
            text-shadow: 0 2px 8px #283e5133;
          }
          .browse-card {
            background: rgba(255,255,255,0.97);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(40,62,81,0.10);
            padding: 24px;
            transition: box-shadow 0.2s, transform 0.2s;
            animation: fadeInBrowse 0.8s;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .browse-card:hover {
            box-shadow: 0 8px 32px rgba(40,62,81,0.18);
            transform: translateY(-4px) scale(1.02);
          }
          .browse-img {
            height: 160px;
            width: 100%;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 18px;
            box-shadow: 0 2px 8px #283e5133;
          }
          .browse-name {
            font-size: 1.2rem;
            font-weight: 700;
            color: #283e51;
            margin-bottom: 8px;
            text-align: center;
          }
          .browse-desc {
            font-size: 1rem;
            color: #485563;
            margin-bottom: 8px;
            text-align: center;
          }
          .browse-price {
            font-size: 1.1rem;
            font-weight: 600;
            color: #388e3c;
            margin-bottom: 4px;
            text-align: center;
          }
          .browse-qty {
            font-size: 0.98rem;
            color: #7c818c;
            text-align: center;
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="browse-title">Browse Products</h1>
        {products.length === 0 ? (
          <p style={{ color: '#fff', textAlign: 'center', fontSize: 18 }}>No products available</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            {products.map(product => (
              <div key={product._id} className="browse-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="browse-img"
                />
                <h2 className="browse-name">{product.name}</h2>
                <p className="browse-desc">{product.description}</p>
                <p className="browse-price">Price: ₹{product.price}</p>
                <p className="browse-qty">In stock: {product.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
