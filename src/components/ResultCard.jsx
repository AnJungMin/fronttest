export default function ResultCard({ severity, heatmapUrl }) {
  const severityStyle = {
    양호: "bg-green-100 text-green-800",
    경증: "bg-yellow-100 text-yellow-800",
    중등도: "bg-orange-100 text-orange-800",
    중증: "bg-red-100 text-red-800",
  };
  console.log("[ResultCard] heatmapUrl:", heatmapUrl);
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          모낭홍반(농포)
        </h4>
        <span
          className={`text-sm px-3 py-1 rounded-full font-medium ${severityStyle[severity]}`}
        >
          {severity}
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
        두피 상태는 <strong>{severity}</strong> 수준입니다.
      </p>

      {heatmapUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">진단 히트맵</p>
          <img
            src={`https://scalp-api-latest.onrender.com${
              heatmapUrl.startsWith("/") ? "" : "/"
            }${heatmapUrl}`}
            alt="히트맵 이미지"
            className="rounded-lg w-full max-w-md mx-auto"
          />
        </div>
      )}
    </div>
  );
}
