import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username_or_email: "",
    password: "",
  });
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      const { username_or_email, password } = formData;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        {
          username_or_email,
          password,
          isRememberMe,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      setError(error.response?.data.message || error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login to access your account
        </p>
        <form className="space-y-6" onSubmit={onLogin}>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="Email Address"
              name="username_or_email"
              value={formData.username_or_email}
              onChange={handleChange}
              autoComplete="username"
              required
            />
            <i className="absolute left-4 top-3 text-gray-500 fas fa-envelope"></i>
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
            <i className="absolute left-4 top-3 text-gray-500 fas fa-lock"></i>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                checked={isRememberMe}
                onChange={(e) => setIsRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline focus:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg ${
              loading
                ? "bg-gray-500"
                : "bg-indigo-600 hover:bg-indigo-700 transition duration-200"
            }  font-semibold`}
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline focus:underline font-medium"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
