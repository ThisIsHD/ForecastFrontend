import React from 'react';

const SignupForm = () => {
  return (
    <form>
      <div className="grid grid-cols-2 gap-5">
        <input type="text" placeholder="Firstname" className="border border-gray-400 py-1 px-2" />
        <input type="text" placeholder="Surname" className="border border-gray-400 py-1 px-2" />
      </div>
      <div className="mt-5">
        <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" />
      </div>
      <div className="mt-5">
        <input type="password" placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
      </div>
      <div className="mt-5">
        <input type="password" placeholder="Confirm Password" className="border border-gray-400 py-1 px-2 w-full" />
      </div>
      <div className="mt-5">
        <input type="checkbox" className="border border-gray-400" />
        <span>
          I accept the{' '}
          <a href="#" className="text-purple-500 font-semibold">
            Terms of Use
          </a>{' '}
          &{' '}
          <a href="#" className="text-purple-500 font-semibold">
            Privacy Policy
          </a>
        </span>
      </div>
      <div className="mt-5">
        <button className="w-full bg-purple-500 py-3 text-center text-white">
          Register Now
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
