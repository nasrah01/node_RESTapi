import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
      </nav>
    </div>
  );
}

export default Home