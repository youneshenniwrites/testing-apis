import { useState } from "react";
import "./App.css";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { useDeboucedValue } from "./hooks/useDebouncedValue";

function App() {
  const { loading, error, users } = useFetchUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDeboucedValue(searchTerm, 300);

  const filteredUsers = users.filter(
    (user) =>
      user.name.first.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      user.name.last.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedValue.toLowerCase())
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
      {debouncedValue !== "" && filteredUsers.length === 0 ? (
        <p aria-live="polite">No users found matching "{debouncedValue}".</p>
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
