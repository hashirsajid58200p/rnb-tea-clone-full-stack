import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../menu/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'transactions'));
        console.log('Fetched transactions:', querySnapshot.docs.map(doc => doc.data()));
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

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map(doc => ({
          firestoreId: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      }
    };

    fetchTransactions();
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct(prev => ({ ...prev, [name]: value }));
    } else {
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
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
        image: '',
      };

      const docRef = await addDoc(collection(db, 'products'), newProductData);
      setProducts(prev => [...prev, { firestoreId: docRef.id, ...newProductData }]);
      setSuccess('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '' });
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setError('');
    setSuccess('');
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editProduct.name || !editProduct.description || !editProduct.price || !editProduct.category) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const productRef = doc(db, 'products', editProduct.firestoreId);
      const updatedProductData = {
        name: editProduct.name,
        description: editProduct.description,
        price: parseFloat(editProduct.price),
        category: editProduct.category,
        image: editProduct.image || '',
        id: editProduct.id,
      };

      await updateDoc(productRef, updatedProductData);
      setProducts(prev =>
        prev.map(p => (p.firestoreId === editProduct.firestoreId ? { ...updatedProductData, firestoreId: editProduct.firestoreId } : p))
      );
      setSuccess('Product updated successfully!');
      setEditProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Failed to update product. Please try again.');
    }
  };

  const handleDeleteProduct = async (firestoreId) => {
    setError('');
    setSuccess('');

    try {
      await deleteDoc(doc(db, 'products', firestoreId));
      setProducts(prev => prev.filter(p => p.firestoreId !== firestoreId));
      setSuccess('Product deleted successfully!');
      setEditProduct(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setError('');
    setSuccess('');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate('/franchise')}>
        Back to Franchise Page
      </button>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.orderId}</td>
                  <td>{tx.customerEmail}</td>
                  <td>${tx.totalPrice}</td>
                  <td>{tx.status}</td>
                  <td>
                    {tx.timestamp ? new Date(tx.timestamp.toDate()).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </section>

      <section className="product-management">
        <h2>Manage Products</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div className="product-list">
          <h3>Product List</h3>
          {products.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.firestoreId}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product.firestoreId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
        </div>

        <div className={editProduct ? "edit-product" : "add-product"}>
          <h3>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editProduct ? editProduct.name : newProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={editProduct ? editProduct.description : newProduct.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={editProduct ? editProduct.price : newProduct.price}
                onChange={handleInputChange}
                step="0.01"
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={editProduct ? editProduct.category : newProduct.category}
                onChange={handleInputChange}
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
            <div className="form-buttons">
              <button type="submit">
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editProduct && (
                <button type="button" className="cancel-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;