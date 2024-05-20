import logo from "./planetai.svg";
import "./App.css";
import uploadicon from "./upload.png";

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
    </div>
  );
}

export default App;
