import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onRegister = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const { userName, fullName, email, password } = formData;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
        {
          userName,
          fullName,
          email,
          password,
        }
      );
      setLoading(false);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data.message || error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h1>
        <form onSubmit={onRegister}>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          {/* Full Name */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="userName"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Create a strong password"
              autoComplete="current-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPass"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={formData.confirmPass}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Re-enter your password"
              autoComplete="current-password"
            />
          </div>

          {/* Register Button */}
          <div className="mb-4">
            <button
              type="submit"
              className={`w-full py-2 rounded-lg font-medium text-lg ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
