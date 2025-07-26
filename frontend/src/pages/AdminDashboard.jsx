import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { END_POINT } from '../constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [productForm, setProductForm] = useState({
  name: '', type: '', sku: '',
  description: '', quantity: '', price: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [addMsg, setAddMsg] = useState('');

 
  const [updateId, setUpdateId] = useState('');
  const [newQty, setNewQty] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${END_POINT}/get?page=${page}`, {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => { setVisible(true); }, []);

  const handleAddChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };






  const handleAddSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!imageFile) {
      setAddMsg("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    Object.keys(productForm).forEach(key => {
      formData.append(key, productForm[key]);
    });

    const res = await axios.post(`${END_POINT}/products`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    setAddMsg(`Product added with ID: ${res.data.product_id}`);
    setProductForm({
      name: '', type: '', sku: '',
      description: '', quantity: '', price: ''
    });
    setImageFile(null);
    fetchProducts();
  } catch (err) {
    setAddMsg(err.response?.data?.error || 'Failed to add product');
  }
};



  const handleQtyUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${END_POINT}/products/${updateId}/quantity`, {
        quantity: Number(newQty)
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setUpdateMsg(`Updated ${res.data.name}, New Qty: ${res.data.quantity}`);
      setUpdateId('');
      setNewQty('');
      fetchProducts();
    } catch (err) {
      setUpdateMsg(err.response?.data?.error || 'Update failed');
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate('/sign-in');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #283e51 0%, #485563 100%)',
        padding: '48px 0',
        animation: visible ? 'fadeInAdminDash 1.2s cubic-bezier(.77,0,.175,1)' : undefined
      }}
    >
      <style>
        {`
          @keyframes fadeInAdminDash {
            0% { opacity: 0; transform: translateY(40px) scale(0.98);}
            60% { opacity: 0.7; transform: translateY(10px) scale(1.01);}
            100% { opacity: 1; transform: translateY(0) scale(1);}
          }
          .admindash-title {
            font-size: 2.2rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 32px;
            text-align: center;
            letter-spacing: 1px;
            text-shadow: 0 2px 8px #283e5133;
          }
          .admindash-section {
            background: rgba(255,255,255,0.97);
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(40,62,81,0.10);
            padding: 32px;
            margin-bottom: 32px;
            animation: fadeInAdminDash 0.8s;
          }
          .admindash-form input, .admindash-form button {
            font-size: 1rem;
          }
          .admindash-form input {
            background: #f7f9fa;
            border: 1px solid #a1a6b4;
            border-radius: 6px;
            padding: 10px 12px;
            margin-bottom: 12px;
            transition: border 0.2s;
          }
          .admindash-form input:focus {
            border: 1.5px solid #283e51;
            outline: none;
          }
          .admindash-form button {
            background: linear-gradient(90deg, #388e3c 0%, #283e51 100%);
            color: #fff;
            font-weight: 700;
            border-radius: 6px;
            border: none;
            box-shadow: 0 2px 12px #283e5133;
            cursor: pointer;
            padding: 12px 0;
            margin-top: 8px;
            transition: background 0.2s;
          }
          .admindash-form button:hover {
            background: linear-gradient(90deg, #283e51 0%, #388e3c 100%);
          }
          .admindash-logout {
            background: linear-gradient(90deg, #e53935 0%, #283e51 100%);
            color: #fff;
            font-weight: 700;
            border-radius: 6px;
            border: none;
            box-shadow: 0 2px 12px #283e5133;
            cursor: pointer;
            padding: 10px 24px;
            transition: background 0.2s;
          }
          .admindash-logout:hover {
            background: linear-gradient(90deg, #283e51 0%, #e53935 100%);
          }
          .admindash-product-card {
            background: rgba(255,255,255,0.97);
            border-radius: 12px;
            box-shadow: 0 2px 8px #283e5133;
            padding: 18px;
            transition: box-shadow 0.2s, transform 0.2s;
            animation: fadeInAdminDash 0.8s;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .admindash-product-card:hover {
            box-shadow: 0 8px 32px rgba(40,62,81,0.18);
            transform: translateY(-4px) scale(1.02);
          }
          .admindash-product-img {
            height: 120px;
            width: 100%;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 12px;
            box-shadow: 0 2px 8px #283e5133;
          }
          .admindash-product-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #283e51;
            margin-bottom: 6px;
            text-align: center;
          }
          .admindash-product-desc {
            font-size: 1rem;
            color: #485563;
            margin-bottom: 6px;
            text-align: center;
          }
          .admindash-product-sku {
            font-size: 0.98rem;
            color: #7c818c;
            margin-bottom: 4px;
            text-align: center;
          }
          .admindash-product-qty {
            font-size: 1rem;
            color: #388e3c;
            margin-bottom: 4px;
            text-align: center;
          }
          .admindash-product-price {
            font-size: 1rem;
            color: #e53935;
            margin-bottom: 4px;
            text-align: center;
          }
          .admindash-product-id {
            font-size: 0.95rem;
            color: #a1a6b4;
            text-align: center;
          }
          .admindash-pagination button {
            background: #f7f9fa;
            color: #283e51;
            font-weight: 600;
            border-radius: 6px;
            border: none;
            box-shadow: 0 2px 8px #283e5133;
            cursor: pointer;
            padding: 10px 24px;
            margin: 0 8px;
            transition: background 0.2s;
          }
          .admindash-pagination button:hover {
            background: #a1a6b4;
            color: #fff;
          }
          .admindash-pagination span {
            color: #fff;
            font-weight: 700;
            font-size: 1.1rem;
            margin: 0 8px;
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="admindash-title">Admin Dashboard</h1>
          <button onClick={handleLogout} className="admindash-logout">
            Logout
          </button>
        </div>

        <div className="admindash-section">
          <h2 className="text-xl font-bold mb-4">➕ Add Product</h2>
          <form className="admindash-form grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAddSubmit}>
  {['name', 'type', 'sku', 'description', 'quantity', 'price'].map((field) => (
    <input
      key={field}
      name={field}
      placeholder={field}
      value={productForm[field]}
      onChange={(e) =>
        setProductForm({ ...productForm, [field]: e.target.value })
      }
      type={field === 'quantity' || field === 'price' ? 'number' : 'text'}
      className="p-2 border rounded"
      required
    />
  ))}

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImageFile(e.target.files[0])}
    className="p-2 border rounded col-span-1 md:col-span-2"
    required
  />

  <button className="bg-green-600 text-white py-2 rounded col-span-1 md:col-span-2">
    Add Product
  </button>
</form>

          {addMsg && <p className="mt-3" style={{ color: '#283e51', fontWeight: 600 }}>{addMsg}</p>}
        </div>

        <div className="admindash-section">
          <h2 className="text-xl font-bold mb-4">🔁 Update Product Quantity</h2>
          <form className="admindash-form grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleQtyUpdate}>
            <input
              type="text"
              placeholder="Product ID"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="New Quantity"
              value={newQty}
              onChange={(e) => setNewQty(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <button className="bg-yellow-600 text-white py-2 rounded col-span-1 sm:col-span-2">
              Update Quantity
            </button>
          </form>
          {updateMsg && <p className="mt-3" style={{ color: '#283e51', fontWeight: 600 }}>{updateMsg}</p>}
        </div>

        <div className="admindash-section">
          <h2 className="text-xl font-bold mb-4">📦 Product List</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {products.map((product) => (
              <div key={product._id} className="admindash-product-card">
                <img src={product.image_url} alt={product.name} className="admindash-product-img" />
                <h3 className="admindash-product-name">{product.name}</h3>
                <p className="admindash-product-desc">{product.description}</p>
                <p className="admindash-product-sku">SKU: {product.sku}</p>
                <p className="admindash-product-qty">Qty: {product.quantity}</p>
                <p className="admindash-product-price">Price: ₹{product.price}</p>
                <p className="admindash-product-id">ID: {product._id}</p>
              </div>
            ))}
          </div>
          <div className="admindash-pagination flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
