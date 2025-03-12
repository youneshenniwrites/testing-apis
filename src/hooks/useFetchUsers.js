import { useCallback, useEffect, useState } from "react";
// import axios from "axios";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      // const { data } = await axios.get("https://randomuser.me/api/?results=10");
      setUsers(data.results);
    } catch (err) {
      setError(err.message);
      // setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { loading, error, users };
};
