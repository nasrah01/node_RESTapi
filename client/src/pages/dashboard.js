import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [error, setError] = useState("");
  const [protectedData, setProtect] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    const getData = async () => {
      const config = {
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.post(
          "http://localhost:5000/auth/private",
          config
        );
        setProtect(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Unauthorized action please login");
      }
    };

    getData();
  }, [navigate]);

  const onLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <h1>Logged In</h1>
      <p>{protectedData}</p>
      {error && <span>{error}</span>}
    </div>
  )
}

export default Dashboard