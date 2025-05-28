export default function ResultCard({ disease, severity, confidence }) {
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

  const percent = Math.min(
    100,
    parseFloat(
      typeof confidence === "string"
        ? confidence.replace("%", "")
        : confidence || 0
    )
  );

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          모낭홍반(농포)
        </h4>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[severity]}`}>
          {severity}
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 ${severityBarColor[severity]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
        두피 상태는 <strong>{severity}</strong> 수준입니다. <br />
        예측 신뢰도는 <strong>{percent}%</strong>입니다.
      </p>
    </div>
  );
}
