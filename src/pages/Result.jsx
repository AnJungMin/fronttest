import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("scalpcare_result");

      // ❗ 값이 없거나 비정상일 경우 진단 페이지로 이동
      if (!stored || stored === "undefined") {
        alert("예측 결과가 없습니다. 다시 진단해주세요.");
        navigate("/diagnosis");
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed) || parsed.length === 0) {
        alert("예측 결과가 없습니다. 다시 진단해주세요.");
        navigate("/diagnosis");
        return;
      }

      setResult(parsed);
    } catch (err) {
      console.error("결과 파싱 오류:", err);
      alert("결과를 불러올 수 없습니다.");
      navigate("/diagnosis");
    }
  }, [navigate]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        진단 결과
      </h3>

      <div className="space-y-4">
        {result.map((item, idx) => (
          <ResultCard
            key={idx}
            severity={item.severity}
          />
        ))}
      </div>
    </section>
  );
}
