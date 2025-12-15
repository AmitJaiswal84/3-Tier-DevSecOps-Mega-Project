import { useEffect, useState } from "react";
import api from "../axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;


