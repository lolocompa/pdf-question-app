import React, { useState, useRef } from "react";
import logo from "./planetai.svg";
import "./App.css";
import uploadicon from "./upload.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("File uploaded successfully");
        // You can add code here to handle success
      } else {
        console.error("Failed to upload file");
        // You can add code here to handle failure
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // You can add code here to handle errors
    }
  };

  const handleUploadDivClick = () => {
    fileInputRef.current.click();
  };

  if (selectedFile) {
    handleUpload();
  }

  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <div className="upload" onClick={handleUploadDivClick}>
          <img className="add-icon" src={uploadicon} alt="" />
          <h4>Upload PDF</h4>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="content"></div>
      <div className="input_container">
        <input
          placeholder="Send a message..."
          className="question"
          type="text"
        />
        <i className="bi bi-send"></i>
      </div>
    </div>
  );
}

export default App;
