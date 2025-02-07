import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "ol/ol.css"; // Ensure OpenLayers CSS is imported
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { CircularProgress } from "@mui/material"; // Import Material-UI spinner

const MapPage = () => {
  const mapRef = useRef(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get("location");

  const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch coordinates from a location name
  const fetchCoordinates = async (locationName) => {
    const apiKey = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API key
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=${apiKey}`
      );
      const { lat, lng } = response.data.results[0].geometry;
      return [lat, lng]; // Return coordinates as [latitude, longitude]
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error("Unable to fetch coordinates.");
    }
  };

  useEffect(() => {
    if (!locationParam) {
      setError("Location parameter is missing.");
      setLoading(false);
      return;
    }

    // Check if the locationParam is already in coordinates format (e.g., "28.6139,77.2090")
    const isCoordinates = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(locationParam);

    if (isCoordinates) {
      // If it's already coordinates, parse and use them directly
      const [lat, lon] = locationParam.split(",").map(parseFloat);
      setCoordinates([lat, lon]);
      setLoading(false);
    } else {
      // If it's a location name, fetch coordinates
      setLoading(true);
      fetchCoordinates(locationParam)
        .then((coords) => {
          setCoordinates(coords);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [locationParam]);

  useEffect(() => {
    if (!coordinates) return; // Don't initialize the map until coordinates are available

    // Initialize OpenLayers Map
    const map = new Map({
      target: mapRef.current, // Ensure this is attached to a valid DOM element
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap as the base layer
        }),
      ],
      view: new View({
        center: fromLonLat([coordinates[1], coordinates[0]]), // Convert coordinates to OpenLayers projection
        zoom: 8, // Adjust the zoom level as needed
      }),
    });

    // Cleanup function to remove the map on unmount
    return () => map.setTarget(null);
  }, [coordinates]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress /> {/* Material-UI spinner */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error message
  }

  return (
    <div>
      {/* Ensure the map container has a defined height and width */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }} // Full-screen map
      ></div>
    </div>
  );
};

export default MapPage;