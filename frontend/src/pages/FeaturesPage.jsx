import React from 'react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-700 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">DisasterForecast - Features</h1>
        </div>
      </header>

      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="mt-8 max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">Real-time Disaster Alerts</h3>
            <p>Stay updated with AI-powered disaster forecasting.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">Interactive Disaster Map</h3>
            <p>View real-time disasters in your region with an interactive map.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">Location Detection</h3>
            <p>Automatically detect your location or manually input your area.</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
            <p>Easy-to-use platform for quick and accurate disaster alerts.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
