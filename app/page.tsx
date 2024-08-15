"use client";
import { useState, FC, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

const locations: Location[] = [
  { id: 1, lat: 28.6139, lng: 77.209, name: "Delhi" },
  { id: 2, lat: 19.076, lng: 72.8777, name: "Mumbai" },
  { id: 3, lat: 13.0827, lng: 80.2707, name: "Chennai" },
  { id: 4, lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  { id: 5, lat: 22.5726, lng: 88.3639, name: "Kolkata" },
];

const customIcon = L.icon({
  iconUrl: "/map-marker-512.webp",
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapCentering = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng]);

  return null;
};

const MapComponent: FC = () => {
  const [center, setCenter] = useState<Location | null>(null);

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          icon={customIcon} // Apply the custom icon
          eventHandlers={{
            click: () => setCenter(location),
          }}
        >
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
      {center && <MapCentering lat={center.lat} lng={center.lng} />}
    </MapContainer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MapComponent />
    </div>
  );
}
