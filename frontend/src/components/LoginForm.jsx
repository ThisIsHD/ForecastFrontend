import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {

  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACKEND_URL || "https://naturaldisasterforcastingbackend.onrender.com/";
  console.log(url);
  
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.email || !formData.password) {
      setLoading(false);
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${url}api/v1/user/auth/login`, formData,{
        withCredentials: true
      });
      console.log("Login successful", response.data);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-600 to-gray-100 text-white text-center py-20 min-h-screen flex items-center justify-center">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Log in to Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-start">
                <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  value={formData.email}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-bold text-gray-900">
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
                  onChange={handleChange}
                  required
                  value={formData.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm 
                ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-md bg-red-600 p-3 text-white" aria-live="assertive">
                {error}
              </div>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="/Signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
