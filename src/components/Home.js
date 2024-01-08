import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Upload files using cloudinary service</h1>
      <Link to="/">Home</Link> <br />
      <Link to="upload">Upload</Link> <br />
    </div>
  );
};

export default Home;
