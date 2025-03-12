import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDebounced, setDebouncedSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch("https://randomuser.me/api/?results=10");
        // if (!response.ok) throw new Error("Failed to fetch users");
        // const data = await response.json();
        const { data } = await axios.get(
          "https://randomuser.me/api/?results=10"
        );
        setUsers(data.results);
      } catch (err) {
        // setError(err.message);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchDebounced.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchDebounced.toLowerCase()) ||
      user.email.toLowerCase().includes(searchDebounced.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>USERS</h1>
      <h2>WELCOME NEW USERS</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        tabIndex={0}
        aria-label="Search users"
      />
      {searchDebounced !== "" && filteredUsers.length === 0 ? (
        <p aria-live="polite">No users found matching "{searchDebounced}".</p>
      ) : (
        filteredUsers.map((user) => (
          <div key={user.login.uuid}>
            <h3>
              {user.name.first} {user.name.last}
            </h3>
            <p>{user.email}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
