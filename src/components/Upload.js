import React, { useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
const Upload = () => {

  const [image, setImage] = useState(null);
  // const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      type === "image" ? "images" : "videos"
    );
    try {
      let cloudName = "dscmtg4tx";
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      // console.log(res);
      const { secure_url } = res.data;
      // console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //upload image
      const imageUrl = await uploadFile("image");

      //upload video
      // const videoUrl = await uploadFile("video");

      //sending backend api request
      await axios.post('http://localhost:5000/api/videos',{imageUrl});

      //reset states
      setImage(null);
      // setVideo(null);

      console.log("File uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <br />

        <div>
          <label>image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImage((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit">Upload</button>
      </form>

      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </div>
  );
};

export default Upload;
