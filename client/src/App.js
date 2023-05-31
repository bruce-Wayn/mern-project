import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FormA from "./components/Form";
import DisplayPage from "./components/DisplayPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Form</Link>
            </li>
            <li>
              <Link to="/display">Display Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<FormA />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
