import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function createMarkerIcon(status) {
  return L.divIcon({
    className: "custom-vehicle-marker",
    html: `<div class="marker-body ${status}"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function Map() {
  // Khu phố Hoàn Kiếm - Hà Nội (trung tâm)
  const congestedArea = { lat: 21.0285, lng: 105.8542, name: "Hoàn Kiếm" };
  
  const [vehicles, setVehicles] = useState([
    // Xe ùn tắc tại khu phố Hoàn Kiếm (15 xe)
    { id: 1, position: [21.0285, 105.8542], status: "congested", area: "Hoàn Kiếm" },
    { id: 2, position: [21.0287, 105.8543], status: "congested", area: "Hoàn Kiếm" },
    { id: 3, position: [21.0283, 105.8541], status: "congested", area: "Hoàn Kiếm" },
    { id: 4, position: [21.0286, 105.8545], status: "congested", area: "Hoàn Kiếm" },
    { id: 5, position: [21.0284, 105.8539], status: "congested", area: "Hoàn Kiếm" },
    { id: 6, position: [21.0288, 105.8541], status: "congested", area: "Hoàn Kiếm" },
    { id: 7, position: [21.0282, 105.8543], status: "congested", area: "Hoàn Kiếm" },
    { id: 8, position: [21.0285, 105.8547], status: "congested", area: "Hoàn Kiếm" },
    { id: 9, position: [21.0281, 105.8540], status: "congested", area: "Hoàn Kiếm" },
    { id: 10, position: [21.0289, 105.8544], status: "congested", area: "Hoàn Kiếm" },
    { id: 11, position: [21.0283, 105.8545], status: "congested", area: "Hoàn Kiếm" },
    { id: 12, position: [21.0286, 105.8538], status: "congested", area: "Hoàn Kiếm" },
    { id: 13, position: [21.0280, 105.8542], status: "congested", area: "Hoàn Kiếm" },
    { id: 14, position: [21.0287, 105.8546], status: "congested", area: "Hoàn Kiếm" },
    { id: 15, position: [21.0284, 105.8544], status: "congested", area: "Hoàn Kiếm" },
    // Xe di chuyển bình thường
    { id: 16, position: [21.05, 105.85], status: "normal", area: "Ba Đình" },
    { id: 17, position: [21.00, 105.80], status: "normal", area: "Cầu Giấy" },
  ]);

  const icons = useMemo(
    () => ({
      congested: createMarkerIcon("congested"),
      normal: createMarkerIcon("normal"),
    }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => ({
          ...vehicle,
          position: [
            vehicle.position[0] + (Math.random() - 0.5) * 0.0007,
            vehicle.position[1] + (Math.random() - 0.5) * 0.0007,
          ],
        }))
      );
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[21.0285, 105.8542]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/attributions">Carto</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {vehicles.map((vehicle) => (
        <Marker key={vehicle.id} position={vehicle.position} icon={icons[vehicle.status]}>
          <Popup>
            <div className="text-slate-900">
              <p className="font-semibold">Xe số {vehicle.id}</p>
              <p className="text-[13px] text-slate-600">Khu vực: {vehicle.area}</p>
              <p className={`font-semibold ${vehicle.status === "congested" ? "text-orange-700" : "text-teal-700"}`}>
                {vehicle.status === "congested" ? "⚠️ Ùn tắc" : "✓ Bình thường"}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;