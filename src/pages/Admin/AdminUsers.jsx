import { useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { ref, onValue, set } from "firebase/database";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(database, "users");
    const unsub = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(uid => ({
          uid,
          ...data[uid].profile,
          role: data[uid].role || "user"
        }));
        setUsers(list);
      } else setUsers([]);
    });
    return () => unsub();
  }, []);

  const toggleRole = async (uid, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await set(ref(database, `users/${uid}/role`), newRole);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">...</aside>
      <main className="admin-content">
        <h2>Manage Users</h2>
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.uid}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => toggleRole(u.uid, u.role)}>
                    Make {u.role === "admin" ? "User" : "Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminUsers;