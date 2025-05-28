import { Routes, Route } from "react-router-dom";
import Diagnosis from "./pages/DiagnosisPage";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Diagnosis />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
