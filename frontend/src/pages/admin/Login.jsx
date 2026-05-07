import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";

import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-6
        relative
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          bg-white/5
          blur-3xl
          rounded-full
          top-[-100px]
          left-[-100px]
        "
      />

      <div
        className="
          absolute
          w-[400px]
          h-[400px]
          bg-zinc-700/10
          blur-3xl
          rounded-full
          bottom-[-120px]
          right-[-100px]
        "
      />
      <button
        onClick={() => navigate("/")}
        className="
    absolute
    top-8
    left-8
    px-5
    py-2.5
    rounded-full
    border
    border-zinc-800
    bg-zinc-900/60
    backdrop-blur-md
    text-zinc-300
    hover:text-white
    hover:border-zinc-600
    hover:bg-zinc-800/80
    transition-all
    duration-300
    text-sm
    font-medium
  "
      >
        ← Back to Home
      </button>
      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="
          relative
          z-10
          w-full
          max-w-md
          bg-zinc-900/70
          backdrop-blur-xl
          border
          border-zinc-800
          rounded-3xl
          p-10
          shadow-2xl
          shadow-black/40
        "
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-2xl
              bg-white
              text-black
              flex
              items-center
              justify-center
              mb-5
              shadow-lg
            "
          >
            <ShieldCheck size={40} />
          </div>

          <h1 className="text-4xl font-black tracking-tight">Admin Login</h1>

          <p className="text-zinc-400 mt-3 text-sm">
            Secure access to your portfolio dashboard
          </p>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2 ml-1">
            Email Address
          </label>

          <div
            className="
              flex
              items-center
              bg-zinc-800/70
              border
              border-zinc-700
              focus-within:border-white
              rounded-xl
              px-4
              transition-all
            "
          >
            <Mail size={20} className="text-zinc-500" />

            <input
              type="email"
              placeholder="you@example.com"
              className="
                w-full
                bg-transparent
                p-4
                outline-none
                placeholder:text-zinc-500
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2 ml-1">
            Password
          </label>

          <div
            className="
              flex
              items-center
              bg-zinc-800/70
              border
              border-zinc-700
              focus-within:border-white
              rounded-xl
              px-4
              transition-all
            "
          >
            <Lock size={20} className="text-zinc-500" />

            <input
              type="password"
              placeholder="••••••••"
              className="
                w-full
                bg-transparent
                p-4
                outline-none
                placeholder:text-zinc-500
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className={`
            w-full
            py-4
            rounded-xl
            font-bold
            text-lg
            transition-all
            duration-300

            ${
              loading
                ? `
                  bg-zinc-700
                  text-zinc-400
                  cursor-not-allowed
                `
                : `
                  bg-white
                  text-black
                  hover:bg-zinc-200
                  hover:scale-[1.02]
                  active:scale-[0.98]
                `
            }
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
