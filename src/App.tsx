import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App flex">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data" element={<Charts />} />
      </Routes>
    </div>
  );
}

export default App;
