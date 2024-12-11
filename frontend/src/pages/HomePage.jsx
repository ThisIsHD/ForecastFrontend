import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-700 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DisasterForecast</h1>
          <nav className="space-x-4">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#map" className="hover:underline">Map</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
          <button className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-gray-100">
            Get Alerts
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-gray-100 text-white text-center py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold">Stay Ahead of Disasters, Save Lives</h2>
          <p className="mt-4 text-lg">
            AI-powered forecasting to keep you and your loved ones safe.
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Enter your location"
              className="w-2/3 px-4 py-2 rounded-md text-gray-700 focus:outline-none"
            />
            <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Why Choose Our Platform?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h4 className="font-bold">Hyper-local Forecasts</h4>
              <p className="text-gray-600">Get precise predictions for your area.</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h4 className="font-bold">Real-time Alerts</h4>
              <p className="text-gray-600">Receive live updates on disasters.</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h4 className="font-bold">Historical Data</h4>
              <p className="text-gray-600">Analyze past trends for better preparedness.</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg">
              <h4 className="font-bold">Educational Resources</h4>
              <p className="text-gray-600">Learn how to mitigate disaster risks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Map Section */}
      <section id="map" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Live Disaster Map</h3>
          <div className="mt-6">
            <div className="h-96 bg-gray-200 shadow-lg rounded-lg">
              {/* Replace with actual map integration */}
              <p className="text-gray-500 pt-40">Interactive map coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Trusted by Thousands Worldwide</h3>
          <p className="mt-6 text-gray-600">
            “This platform saved my community during the recent floods.”
          </p>
          <p className="mt-2 font-bold">- User Testimonial</p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" className="py-10 bg-blue-700 text-white text-center">
        <h3 className="text-xl font-bold">Ready to Stay Safe?</h3>
        <Link to="/signup">
        <button className="mt-4 bg-white text-blue-700 px-6 py-2 rounded-lg hover:bg-gray-100">
          Get Started for Free
        </button>
        </Link>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <h4 className="text-white font-bold">Contact Us</h4>
            <p>Email: support@disasterforecast.com</p>
          </div>
          <div>
            <h4 className="text-white font-bold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
