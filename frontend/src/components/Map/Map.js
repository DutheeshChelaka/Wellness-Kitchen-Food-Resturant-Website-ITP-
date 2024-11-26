import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { reverseGeocode } from "../../services/GeoServices"; // Ensure the path is correct

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const SetMapView = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13); // Zoom level set to 13
    }
  }, [map, position]);
  return null;
};

const MyMap = ({ setAddress }) => {
  const [position, setPosition] = useState(null);
  const defaultPosition = [6.9271, 79.9612]; // Default to a general location

  useEffect(() => {
    // Function to get the user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            // Fetch the address using reverse geocoding
            try {
              const address = await reverseGeocode(latitude, longitude);
              console.log("Fetched address:", address); // Debug log
              setAddress(address); // Set the fetched address in the parent component
            } catch (error) {
              console.error("Error fetching address:", error);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [setAddress]);

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetMapView position={position} />
      {position && (
        <Marker position={position}>
          <Popup>Your current location.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MyMap;
