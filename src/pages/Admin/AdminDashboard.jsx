import { Link } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/admin/products">Products</Link></li>
          <li><Link to="/admin/orders">Orders</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
        </ul>
      </aside>
      <main className="admin-content">
        <h1>Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
        {/* Summary stats can be added here */}
      </main>
    </div>
  );
};

export default AdminDashboard;