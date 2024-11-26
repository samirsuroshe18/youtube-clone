import React from 'react'
import { useState } from 'react'

const Register = () => {
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [name, setName] = useState("");
const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPass, setConfirmPass] = useState("");

  const onRegister = async ()=>{
    alert(`name : ${name}\nuserName : ${userName}\nEmail : ${email}\nPass : ${password}\nConfirmPass : ${confirmPass}\n`)
    if(password != confirmPass){
      alert("Password do not match");
    }

  }

  return (
    <div>
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
        <form>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your full name"
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
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Create a strong password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPass}
              onChange={(e)=>setConfirmPass(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Register Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-lg"
              onClick={onRegister}
            >
              Register
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-center">
            Already have an account?{' '}
            <a href="/login" className="text-green-500 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Register;