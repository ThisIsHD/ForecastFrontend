import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isloading, setIsloading] = useState(false);
  const [errorbool, setErrorbool] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const url = import.meta.env.VITE_BACKEND_URL || "https://naturaldisasterforcastingbackend.onrender.com/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setErrorbool(false);
    setError("");
    setSuccess(false);

    // Client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setIsloading(false);
      setErrorbool(true);
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${url}api/v1/user/auth/signup`, formData);
      console.log("Response from backend:", response.data);
      setSuccess(true);
      navigate("/login");
    } catch (error) {
      setErrorbool(true);
      setError(error?.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-gray-100 h-screen flex justify-center items-center">
      <div className="flex bg-white rounded-lg  flex-col justify-center items-center px-44 py-5  shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-sm font-bold text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-bold text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-bold text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isloading}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm 
              ${isloading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {isloading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>

            {errorbool && (
              <div className="mt-4 rounded-md bg-red-600 p-3 text-white" aria-live="assertive">
                {error}
              </div>
            )}
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>

          {success && (
            <div
              aria-live="polite"
              className="fixed top-4 right-4 z-50 rounded-md bg-green-600 p-4 shadow-lg"
            >
              <p className="text-white font-semibold">Sign up successful!</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default SignUp;
