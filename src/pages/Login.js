// Login.js
import React, { useState } from 'react';

const Login = ({ toggleModal, toggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Here you can implement the logic to submit the login details
    console.log('Logging in with:', email, password);
    // After successful login, you can close the modal
    toggleModal();
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Sign in to our platform</h3>
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" placeholder="name@company.com" required />
        </div>
        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Your password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-3 w-full border rounded-lg" placeholder="••••••••" required />
        </div>
        {/* Remember me Checkbox */}
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" name="remember" className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>
        {/* Login Button */}
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600">Login</button>
          <a href="#" className="text-sm text-blue-600 hover:underline" onClick={toggleForm}>You don't have an account?</a>
        </div>
      </form>
    </>
  );
}

export default Login;
