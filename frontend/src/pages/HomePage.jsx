// import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import "ol/ol.css"; // Import OpenLayers styles
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Style, Icon } from "ol/style";
import Navbar from '../components/Navbar';

const HomePage = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";
  const mapRef = useRef(null); // Reference for the map container
  const disasterData = [
    { id: 1, name: "Flood Warning", coordinates: [78.9629, 20.5937] }, // Example in India
    { id: 2, name: "Cyclone Alert", coordinates: [88.3639, 22.5726] }, // Kolkata, India
    { id: 3, name: "Earthquake Risk", coordinates: [77.2090, 28.6139] }, // Delhi, India
    { id: 4, name: "Tsunami Alert", coordinates: [79.8333, 11.8333] }, // Tamil Nadu Coast
  ];

  const userinfo = async () => {
    try {
      console.log("Fetching user info...", url);
      
      const response = await axios.get(`${url}api/v1/user/me`,{
        withCredentials: true
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error fetching user info:", error.message);
    }
  };

  useEffect(() => {
    userinfo();

    // Disaster Features
    const disasterFeatures = disasterData.map((disaster) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(disaster.coordinates)), // Convert to OpenLayers projection
        name: disaster.name,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Disaster icon
            scale: 0.05, // Resize the icon
          }),
        })
      );
      return feature;
    });

    // Initialize Map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: disasterFeatures, // Add disaster features
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // Center of India
        zoom: 4, // Zoom level
      }),
    });

    return () => map.setTarget(null); // Cleanup
  }, []);

  return (
    <div>
      <Navbar/>
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

      {/* Disaster Map Section */}
      <section id="map" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Live Disaster Map</h3>
          <div className="mt-6">
            {/* OpenLayers Map Container */}
            <div
              ref={mapRef} // Reference to render the OpenLayers map
              className="h-96 bg-gray-200 shadow-lg rounded-lg"
            ></div>
          </div>
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

