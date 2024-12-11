import React, { useState } from 'react';

const SignupForm = () => {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a sign-up process
    setIsSignupSuccess(true); // Show success popup
    setTimeout(() => setIsSignupSuccess(false), 3000); // Hide after 3 seconds
  };

  return (
    <section className="bg-gradient-to-b from-blue-600 to-gray-100 text-white text-center py-20 min-h-screen flex items-center justify-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Create a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/ForgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col space-y-4 items-center">
            {/* Continue with Google Button */}
            <button
              className="flex items-center justify-center w-full sm:w-72 rounded-lg bg-white border border-gray-300 px-4 py-3 text-lg font-medium text-gray-700 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Icon"
                className="w-6 h-6 mr-3"
              />
              Google
            </button>

            {/* Continue with App Store Button */}
            <button
              className="flex items-center justify-center w-full sm:w-72 rounded-lg bg-white border border-gray-300 px-4 py-3 text-lg font-medium text-gray-700 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Apple_Store_logo.svg"
                alt="App Store Icon"
                className="w-6 h-6 mr-3"
              />
              App Store
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have an Account?{' '}
            <a href="/LoginForm" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {isSignupSuccess && (
        <div className="fixed top-4 right-4 z-50 rounded-md bg-green-600 p-4 shadow-lg">
          <p className="text-white font-semibold">Sign up successful!</p>
        </div>
      )}
    </section>
  );
};

export default SignupForm;
