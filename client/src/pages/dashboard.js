import {useEffect} from 'react'
import { Navigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = Navigate();

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>Logged In</div>
  )
}

export default Dashboard