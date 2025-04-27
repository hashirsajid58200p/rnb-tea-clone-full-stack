import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../menu/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import "./AdminDashboard.css"

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        const transactionList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionList);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transaction history.');
      }
    };
    fetchTransactions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const newProductData = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        image: '', // Placeholder for image; can be updated manually later
      };

      await addDoc(collection(db, 'products'), newProductData);

      setSuccess('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '' });
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/franchise')} style={{ marginBottom: '20px' }}>
        Back to Franchise Page
      </button>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {transactions.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.orderId}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.customerEmail}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>${tx.totalPrice}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{tx.status}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </section>

      <section className="add-product">
        <h2>Add New Product</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleAddProduct}>
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Description:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              step="0.01"
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Category:</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            >
              <option value="">Select Category</option>
              <option value="MilkTea">MilkTea</option>
              <option value="Coffee">Coffee</option>
              <option value="Blended">Blended</option>
              <option value="Stormy">Stormy</option>
              <option value="Yakult">Yakult</option>
              <option value="Cheese Cream">Cheese Cream</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '10px 20px' }}>
            Add Product
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;