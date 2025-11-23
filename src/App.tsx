import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Stats from "./pages/Stats/Stats";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/code/:code" element={<Stats />} />
    </Routes>
  );
}

export default App;
