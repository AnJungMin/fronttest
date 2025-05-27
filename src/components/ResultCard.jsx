import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ResultCard({ item, recommendationsJson }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const severityMapping = {
    정상: "양호",
    경증: "경증",
    중등증: "중등도",
    중증: "중증",
  };

  const severityStyle = {
    양호: "bg-green-100 text-green-800",
    경증: "bg-yellow-100 text-yellow-800",
    중등도: "bg-orange-100 text-orange-800",
    중증: "bg-red-100 text-red-800",
  };

  const severityBarColor = {
    양호: "bg-green-400",
    경증: "bg-yellow-400",
    중등도: "bg-orange-400",
    중증: "bg-red-400",
  };

  const handleClick = () => setOpen(!open);

  const cleanKey = item.disease?.trim();
  const recsFromJson = recommendationsJson?.[cleanKey] || [];

  const rawConfidence = item.confidence || "0";
  const numericConfidence = parseFloat(
    typeof rawConfidence === "string" ? rawConfidence.replace("%", "") : rawConfidence
  );

  const originalSeverity = item.severity || "정상";
  const severity = severityMapping[originalSeverity] || "양호";

  const baseFill = {
    양호: 0,
    경증: 25,
    중등도: 50,
    중증: 75,
  }[severity] || 0;

  const remainingFill = 25;
  const confidenceRate = Math.min(1, numericConfidence / 100);
  const additionalFill = remainingFill * confidenceRate;

  const totalFillPercent = Math.min(100, baseFill + additionalFill);

  return (
    <div
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-5 shadow hover:shadow-md transition cursor-pointer"
    >
      {/* 제목 + 상태 배지 */}
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{cleanKey}</h4>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[severity]}`}>
          {severity}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 ${severityBarColor[severity]}`}
          style={{ width: `${totalFillPercent}%` }}
        />
      </div>

      {/* 상세 내용 */}
      {open && (
        <div className="text-sm mt-4 space-y-4">
          {severity === "양호" && (
            <p className="text-green-600">
              {item.comment || "정상 범위입니다. 두피 상태가 양호합니다."}
            </p>
          )}

          {(severity === "경증" || severity === "중등도") && recsFromJson.length > 0 && (
            <div className="space-y-2">
              <strong className="block font-semibold text-gray-800 dark:text-gray-200">
                추천 제품
              </strong>
              <div className="grid gap-3">
                {recsFromJson.map((rec, idx) => {
                  const similarity = (rec.similarity * 100).toFixed(2);
                  const similarityBarColor = similarity >= 90 ? "bg-green-400" : "bg-blue-400";

                  return (
                    <Link
                      to="/products/1"
                      key={idx}
                      className="block p-4 border rounded-xl shadow-sm hover:shadow-md bg-gray-50 dark:bg-gray-700 transition"
                      onClick={(e) => e.stopPropagation()} // 카드 전체 열림 방지
                    >
                      <div className="font-medium text-gray-800 dark:text-white">{rec.product_name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{rec.category}</div>

                      <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                        <div
                          className={`h-2 ${similarityBarColor} rounded-full`}
                          style={{ width: `${similarity}%` }}
                        />
                      </div>

                      <div className="text-xs text-gray-400">
                        유사도 {similarity}%
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {severity === "중증" && (
            <div className="space-y-3">
              <p className="text-red-600 font-semibold">
                {item.hospital_recommendation || "증상이 심각할 수 있어 피부과 방문을 권장합니다."}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/map");
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
              >
                주변 피부과 지도 보기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
