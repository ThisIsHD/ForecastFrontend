import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";

const MapPage = () => {
  const mapRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get("lat");
  const lon = params.get("lon");
  const place = params.get("location");

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: lat && lon ? fromLonLat([parseFloat(lon), parseFloat(lat)]) : fromLonLat([78.9629, 20.5937]),
        zoom: 6,
      }),
    });

    return () => map.setTarget(null);
  }, [lat, lon]);

  return (
    <div>
      <header className="bg-blue-700 text-white px-6 py-4 text-center">
        <h1 className="text-2xl font-bold">Disaster Forecast - {place ? place : "Selected Location"}</h1>
      </header>
      <div ref={mapRef} className="h-screen w-full bg-gray-200"></div>
    </div>
  );
};

export default MapPage;
