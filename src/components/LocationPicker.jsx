// src/components/LocationPicker.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for marker icons not showing up correctly
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

export default function LocationPicker({ position, setPosition, clearLocation }) {
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ width: '100%', height: '400px' }}
        className="rounded-md shadow-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      {position && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-lg">Selected Location:</p>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
          <button
            onClick={clearLocation}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
          >
            Clear Location
          </button>
        </div>
      )}
    </div>
  );
};