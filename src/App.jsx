import { Routes, Route, Navigate } from "react-router-dom";
import DiagnosisPage from "./pages/DiagnosisPage";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      {/* "/"로 들어오면 "/diagnosis"로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/diagnosis" replace />} />

      {/* 진단 페이지 */}
      <Route path="/diagnosis" element={<DiagnosisPage />} />

      {/* 결과 페이지 */}
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
