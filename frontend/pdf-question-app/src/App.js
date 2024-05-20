import logo from "./planetai.svg";
import "./App.css";
import uploadicon from "./upload.png";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div>
      <div className="header">
        <img className="logo" src={logo} alt="logo" />
        <div className="upload">
          <img className="add-icon" src={uploadicon} alt="" />
          <h4>Upload PDF</h4>
        </div>
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
