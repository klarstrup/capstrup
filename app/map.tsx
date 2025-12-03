"use client";

import { MapContainer, Polygon, TileLayer } from "react-leaflet";

export default function Map({
  polygons,
}: {
  polygons?: [lat: number, lng: number][][];
}) {
  return (
    <MapContainer
      center={[55.6761, 12.5683]}
      zoom={3}
      maxZoom={20}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polygons?.map((polygon, idx) => (
        <Polygon key={idx} positions={polygon} />
      ))}
    </MapContainer>
  );
}
