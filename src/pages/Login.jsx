import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; 
import { storeTokens } from "../utils/auth";

const Login = () =>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function generateCaptcha() {
    return Math.random().toString(36).substring(2, 8); 
  }
  const handleLogin = async (e) => {
  e.preventDefault();

  if (userCaptcha !== captcha) {
    setError("Captcha does not match!");
    setCaptcha(generateCaptcha());
    setUserCaptcha("");
    return;
  }

  try {
    const res = await api.post("/login", {
      username,
      password,
    });

    const { accessToken, refreshToken } = res.data;
    storeTokens({ accessToken, refreshToken });
    navigate("/admin");
  } catch (err) {
    setError("Invalid credentials or server error.");
  }
};

    return (<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border px-3 py-2 rounded-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center gap-4">
          <span className="bg-gray-200 px-3 py-2 text-lg font-mono tracking-widest">
            {captcha}
          </span>
          <button
            type="button"
            className="text-blue-600 text-sm underline"
            onClick={() => setCaptcha(generateCaptcha())}
          >
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter CAPTCHA"
          className="border px-3 py-2 rounded-full"
          value={userCaptcha}
          onChange={(e) => setUserCaptcha(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-sky-600 text-white py-2 rounded-full hover:bg-sky-700 transition"
        >
          Submit
        </button>
      </form>
    </div>)
}
export default Login;