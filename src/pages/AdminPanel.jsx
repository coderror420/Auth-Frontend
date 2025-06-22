import { useState } from "react";
import api from "../utils/api";
import { clearTokens } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [shareLink, setShareLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateLink = async () => {
    try {
      const res = await api.post("/share"); 
      const token = res.data?.token || res.data?.shareToken;
      setShareLink(`${window.location.origin}/share/${token}`);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        clearTokens();
        navigate("/login");
      } else {
        setError("Failed to generate shareable link.");
      }
    }
  };

  const logout = () => {
    clearTokens();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Panel</h2>

      <button
        className="bg-sky-600 text-white py-2 px-4 rounded-full hover:bg-sky-700 w-full"
        onClick={generateLink}
      >
        Generate Shareable Link
      </button>

      {shareLink && (
        <p className="mt-4 text-green-700 text-center break-words">
          <strong>Link:</strong> <a href={shareLink} className="underline">{shareLink}</a>
        </p>
      )}

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      <button
        onClick={logout}
        className="mt-6 text-sm text-gray-600 underline w-full text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
