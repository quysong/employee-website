import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

interface MapProps {
  center: any;
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: 400, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={icon}>
        <Popup>
          We can add address extracted from reverse geolocation service
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
