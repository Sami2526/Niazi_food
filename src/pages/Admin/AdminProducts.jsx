import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { database } from "../../firebase/firebase";
import { ref, set, push, remove } from "firebase/database";

const AdminProducts = () => {
  const { foodList } = useContext(StoreContext);
  const [products, setProducts] = useState(foodList);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", image: "", category: ""
  });

  useEffect(() => {
    setProducts(foodList);
  }, [foodList]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      // update existing
      await set(ref(database, `products/${editing}`), form);
    } else {
      // add new
      const newRef = push(ref(database, "products"));
      await set(newRef, { ...form, _id: newRef.key });
    }
    setForm({ name: "", description: "", price: "", image: "", category: "" });
    setEditing(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await remove(ref(database, `products/${id}`));
    }
  };

  const handleEdit = (product) => {
    setEditing(product._id);
    setForm(product);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">...</aside>
      <main className="admin-content">
        <h2>Manage Products</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <button type="submit">{editing ? "Update" : "Add"} Product</button>
          {editing && <button onClick={() => { setEditing(null); setForm({ name:"", description:"", price:"", image:"", category:"" }); }}>Cancel</button>}
        </form>

        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Price</th><th>Category</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>Rs.{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminProducts;