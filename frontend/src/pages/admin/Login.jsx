import { useState } from "react"
import { useNavigate } from "react-router-dom"

import api from "../../services/api"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      navigate("/admin/dashboard")

    } catch (error) {

      console.log(error)

      alert("Login Failed")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-zinc-800 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black py-4 rounded-xl font-semibold">
          Login
        </button>

      </form>

    </div>
  )
}

export default Login