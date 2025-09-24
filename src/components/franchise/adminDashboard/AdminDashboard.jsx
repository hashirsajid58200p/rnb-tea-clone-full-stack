import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase.from("transactions").select("*");
        if (error) throw error;
        setTransactions(data || []);
      } catch (err) {
        setError("Failed to load transaction history.");
      }
    };

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        const productList = data.map((product) => ({
          firestoreId: product.id,
          ...product,
        }));
        setProducts(productList);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchTransactions();
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: file }));
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      let imageUrl = "";
      if (newProduct.image) {
        const fileExt = newProduct.image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const fullPath = `public/${fileName}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("drinksMenu")
          .upload(fullPath, newProduct.image, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) {
          throw uploadError;
        }
        imageUrl = uploadData
          ? `https://fruqkfhrcdzymomvokhh.supabase.co/storage/v1/object/public/drinksMenu/${fullPath}`
          : "";
      }

      const newProductData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        image: imageUrl,
      };

      const { data, error } = await supabase
        .from("products")
        .insert([newProductData]);
      if (error) throw error;
      if (data && data.length > 0) {
        setProducts((prev) => [
          ...prev,
          { firestoreId: data[0].id, ...newProductData },
        ]);
        setSuccess("Product added successfully!");
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          image: null,
        });
        setImagePreview(null);
      } else {
        throw new Error("No data returned from insert");
      }
    } catch (err) {
      setError(`Failed to add product. ${err.message}`);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setError("");
    setSuccess("");
    setImagePreview(product.image || null);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !editProduct.name ||
      !editProduct.description ||
      !editProduct.price ||
      !editProduct.category
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      let imageUrl = editProduct.image;
      if (editProduct.image && typeof editProduct.image !== "string") {
        const fileExt = editProduct.image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const fullPath = `public/${fileName}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from("drinksMenu")
          .upload(fullPath, editProduct.image, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) throw uploadError;
        imageUrl = uploadData
          ? `https://fruqkfhrcdzymomvokhh.supabase.co/storage/v1/object/public/drinksMenu/${fullPath}`
          : editProduct.image;
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: editProduct.name,
          description: editProduct.description,
          price: parseFloat(editProduct.price),
          category: editProduct.category,
          image: imageUrl,
        })
        .eq("id", editProduct.firestoreId);

      if (error) throw error;
      setProducts((prev) =>
        prev.map((p) =>
          p.firestoreId === editProduct.firestoreId
            ? {
                ...editProduct,
                image: imageUrl,
                firestoreId: editProduct.firestoreId,
              }
            : p
        )
      );
      setSuccess("Product updated successfully!");
      setEditProduct(null);
      setImagePreview(null);
    } catch (err) {
      setError(`Failed to update product. ${err.message}`);
    }
  };

  const handleDeleteProduct = async (firestoreId) => {
    setError("");
    setSuccess("");

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", firestoreId);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.firestoreId !== firestoreId));
      setSuccess("Product deleted successfully!");
      setEditProduct(null);
    } catch (err) {
      setError("Failed to delete product. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setError("");
    setSuccess("");
    setImagePreview(null);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate("/franchise")}>
        Back to Franchise Page
      </button>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.orderId}</td>
                  <td>{tx.customerEmail}</td>
                  <td>${tx.totalPrice}</td>
                  <td>{tx.status === "completed" ? "purchased" : tx.status}</td>
                  <td>
                    {tx.timestamp
                      ? new Date(tx.timestamp).toLocaleString()
                      : "N/A"}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

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
                {products.map((product) => (
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
          <h3>{editProduct ? "Edit Product" : "Add New Product"}</h3>
          <form onSubmit={editProduct ? handleUpdateProduct : handleAddProduct}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editProduct ? editProduct.name : newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={
                  editProduct ? editProduct.description : newProduct.description
                }
                onChange={handleInputChange}
                required
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
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={editProduct ? editProduct.category : newProduct.category}
                onChange={handleInputChange}
                required
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
            <div>
              <label>Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              )}
            </div>
            <div className="form-buttons">
              <button type="submit">
                {editProduct ? "Update Product" : "Add Product"}
              </button>
              {editProduct && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={cancelEdit}
                >
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
