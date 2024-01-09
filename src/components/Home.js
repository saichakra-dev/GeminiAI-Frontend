import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const Home = () => {

  const [videos,setVideos] = useState([]);

  useEffect(()=>{
    //fetching data from db
    axios.get("http://localhost:5000/api/videos")
    .then(response=>{
      setVideos(response.data);
    })
    .catch(error =>{
      console.error('Error fetching data: ',error);
    });
  },[]);

  const formatDate = (timestamp) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Upload files using cloudinary service</h1>
      <Link to="upload">Upload</Link> <br />
      {/* data from db */}
      <div className="data-from-db">
        {videos.map((video) => (
          <div key={video._id}>
            <img style={{ width: "100px" }} src={video.imageUrl} alt="" />
            <p>
              {" "}
              <b> Created At: </b> {formatDate(video.createdAt)}
            </p>
            <p>
              {" "}
              <b> Services: </b>
              {video.Services}
            </p>
            <p>
              {" "}
              <b> Result: </b>
              {video.Result}
            </p>
            <p>
              {" "}
              <b> Type: </b>
              {video.Type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
