import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
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

const HomePage = () => {
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/";
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState("");
  
  // Fetch user info to check login status
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${url}api/v1/user/me`, { withCredentials: true });
        setIsLoggedIn(true);
        console.log("User logged in:", response.data);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("User not logged in:", error.message);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle location input change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    localStorage.setItem("userLocation", event.target.value); // Store location in local storage
  };

  // Handle Search - Open map in a new page
  const handleSearch = () => {
    if (location.trim() !== "") {
      navigate(`/map?location=${encodeURIComponent(location)}`);
    } else {
      alert("Please enter a valid location.");
    }
  };

  // Handle GPS Auto-detection
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setLocation(coords);
          localStorage.setItem("userLocation", coords); // Store GPS location in local storage
          navigate(`/map?location=${encodeURIComponent(coords)}`);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          alert("Unable to retrieve location. Please check your GPS settings.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Dummy disaster data (for markers)
  const disasterData = [
    { id: 1, name: "Flood Warning", coordinates: [78.9629, 20.5937] }, 
    { id: 2, name: "Cyclone Alert", coordinates: [88.3639, 22.5726] },
    { id: 3, name: "Earthquake Risk", coordinates: [77.2090, 28.6139] },
    { id: 4, name: "Tsunami Alert", coordinates: [79.8333, 11.8333] },
  ];

  useEffect(() => {
    // Disaster Features
    const disasterFeatures = disasterData.map((disaster) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(disaster.coordinates)),
        name: disaster.name,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
        })
      );
      return feature;
    });

    // Initialize OpenLayers Map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        new VectorLayer({
          source: new VectorSource({ features: disasterFeatures }),
        }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]),
        zoom: 4,
      }),
    });

    return () => map.setTarget(null);
  }, []);

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
          <p className="mt-4 text-lg">AI-powered forecasting to keep you and your loved ones safe.</p>

          {isLoggedIn ? (
            <div className="mt-8">
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={handleLocationChange}
                className="w-2/3 px-4 py-2 rounded-md text-gray-700 focus:outline-none"
              />
              <button onClick={handleSearch} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md ml-2">
                Search
              </button>
              <button onClick={handleGetCurrentLocation} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md ml-2">
                Use GPS
              </button>
            </div>
          ) : (
            <p className="mt-4 text-lg">Please <Link to="/login" className="text-yellow-300 underline">log in</Link> to access the disaster map.</p>
          )}
        </div>
      </section>

      {/* Disaster Map Section */}
      <section id="map" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800">Live Disaster Map</h3>
          <div className="mt-6">
            <div ref={mapRef} className="h-96 bg-gray-200 shadow-lg rounded-lg"></div>
          </div>
        </div>
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
