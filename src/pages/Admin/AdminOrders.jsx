import { useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(database, "orders");
    const unsub = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const all = [];
        Object.keys(data).forEach(uid => {
          Object.keys(data[uid]).forEach(orderId => {
            all.push({ id: orderId, ...data[uid][orderId] });
          });
        });
        setOrders(all);
      } else setOrders([]);
    });
    return () => unsub();
  }, []);

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">...</aside>
      <main className="admin-content">
        <h2>All Orders</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Order ID</th><th>User</th><th>Total</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer?.email || o.userId}</td>
                <td>Rs.{o.total}</td>
                <td>{o.status}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminOrders