import React from 'react'

const Login = () => {
  return (
    
    <div className="h-screen w-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Login to access your account
        </p>
        <form className="space-y-6">
          <div className="relative">
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="Email Address"
              required
            />
            <i className="absolute left-4 top-3 text-gray-500 fas fa-envelope"></i>
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200"
              placeholder="Password"
              required
            />
            <i className="absolute left-4 top-3 text-gray-500 fas fa-lock"></i>
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-indigo-600" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:underline focus:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:underline focus:underline font-medium"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

 