export default function ResultCard({ severity }) {
  const severityStyle = {
    양호: "bg-green-100 text-green-800",
    경증: "bg-yellow-100 text-yellow-800",
    중등도: "bg-orange-100 text-orange-800",
    중증: "bg-red-100 text-red-800",
  };

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
    </div>
  );
}
