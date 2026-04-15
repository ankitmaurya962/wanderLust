import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

// 🔥 Custom Yellow Marker
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const Map = ({ coordinates, title }) => {
  if (!coordinates) return null;

  const [lng, lat] = coordinates;
  const position = [lat, lng];

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-[320px] w-full"
      >
        {/* 🌑 Dark Map */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Tooltip permanent direction="top" offset={[0, -25]}>
            {title}
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
