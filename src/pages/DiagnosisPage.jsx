import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import ResultCard from "../components/ResultCard";

export default function DiagnosisPage() {
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🌟 추가된 상태
  const [severity, setSeverity] = useState("");
  const [heatmapUrl, setHeatmapUrl] = useState("");

  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "capture.jpg", { type: mimeString });

      setImage(file);
      setPreviewUrl(imageSrc);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("이미지를 선택하거나 촬영해주세요.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(
        "https://scalp-api-latest.onrender.com/api/predict",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("✅ 백엔드 응답:", data);

      setSeverity(data.class);
      setHeatmapUrl(data.heatmap_url ?? "");

      if (!data.class || !data.confidence) {
        alert("예측 결과를 불러올 수 없습니다. 다시 시도해주세요.");
        return;
      }

      // (필요하다면 localStorage 저장, navigate 생략 가능)
       localStorage.setItem("scalpcare_result", JSON.stringify([...]));
      navigate("/result");
    } catch (err) {
      alert("예측 요청에 실패했습니다.");
      console.error("❌ 예측 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e293b] text-gray-900 dark:text-white p-6">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-4">
          두피 질환 AI 진단
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          사진을 업로드하거나, 카메라로 촬영해 주세요!
        </p>

        {/* 모드 선택 */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setUseCamera(false)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              !useCamera
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            파일 업로드
          </button>
          <button
            onClick={() => setUseCamera(true)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              useCamera
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            카메라 촬영
          </button>
        </div>

        {/* 업로드 또는 카메라 */}
        {!useCamera ? (
          <>
            <label
              htmlFor="file-upload"
              className="block text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition"
            >
              파일 업로드
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 mb-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }}
              className="rounded-xl shadow max-w-full"
            />
            <button
              onClick={handleCapture}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              촬영하기
            </button>
          </div>
        )}

        {/* 미리보기 */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 rounded-xl max-h-64 shadow"
          />
        )}

        {/* 진단 버튼 */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "진단 중..." : "진단 시작"}
        </button>

        {loading && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            AI가 열심히 분석하고 있어요. 잠시만 기다려주세요...
          </p>
        )}
      </div>

      {/* 🌟 예측이 완료되면 바로 ResultCard 렌더링 */}
      {severity && (
        <div className="mt-8 w-full max-w-md">
          <ResultCard
            severity={severity}
            heatmapUrl={heatmapUrl}
            originalImageUrl={previewUrl}
          />
        </div>
      )}

      <footer className="mt-10 text-xs text-gray-400">
        © 2025 ScalpCare. All rights reserved.
      </footer>
    </div>
  );
}
