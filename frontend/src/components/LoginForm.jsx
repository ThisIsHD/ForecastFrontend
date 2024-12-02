import React from 'react';

const LoginForm = () => {
  return (
    <form>
      <div className="mt-5">
        <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" />
      </div>
      <div className="mt-5">
        <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
      </div>
      <div className="mt-5">
        <button className="w-full bg-purple-500 py-3 text-center text-white">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
