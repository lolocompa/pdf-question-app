import React, { useState, useRef } from "react";
import logo from "./planetai.svg";
import "./App.css";
import uploadicon from "./upload.png";
import ai_logo from "./ai-logo.jpeg";
import user_icon from "./person-circle.svg";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  class message {
    constructor(name, content) {
      this.name = name;
      this.content = content;
    }
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const fileInputRef = useRef(null);

  console.log(conversation);

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    await handleUpload(event.target.files[0]);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

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

  const submitQuestion = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    if (question.length < 1) {
      return;
    }

    const payload = {
      filename: selectedFile.name,
      question: question,
    };
    const my_question = new message("me", question);
    setConversation((prevConversation) => [...prevConversation, my_question]);

    setQuestion("");

    try {
      const response = await fetch("/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Answer received:", data.answer);
        const new_message = new message("ai", data.answer);
        setConversation((prevConversation) => [
          ...prevConversation,
          new_message,
        ]);
      } else {
        console.error("Failed to get answer");
        // You can add code here to handle failure
      }
    } catch (error) {
      console.error("Error getting answer:", error);
      // You can add code here to handle errors
    }
  };

  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <div className="right-header">
          {selectedFile && (
            <div className="uploaded-file">
              <div className="icon-container">
                <i className="bi bi-file-earmark"></i>
              </div>
              <h4>
                {selectedFile.name.length > 30
                  ? `${selectedFile.name.slice(0, 30)}...`
                  : selectedFile.name}
              </h4>
            </div>
          )}
          <div className="upload" onClick={handleUploadDivClick}>
            <img className="add-icon" src={uploadicon} alt="" />
            <h4>Upload PDF</h4>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="content">
        {conversation.map((msg, index) =>
          msg.name === "ai" ? (
            <div key={index} className="ai-message-container">
              <div className="message ai-message">
                <div className="ai_icon">
                  <img src={ai_logo} alt="" />
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="me-message-container">
              <div className="message me-message">
                <div className="my_icon">
                  <i class="bi bi-person-circle"></i>
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="input_container">
        <input
          placeholder="Send a message..."
          className="question"
          value={question}
          type="text"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <i onClick={submitQuestion} className="bi bi-send"></i>
      </div>
    </div>
  );
}

export default App;
