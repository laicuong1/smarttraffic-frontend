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

function createTrafficLightIcon(state) {
  const color = state === "red" ? "red" : state === "green" ? "green" : "amber";
  return L.divIcon({
    className: "custom-trafficlight-marker",
    html: `<div class="traffic-light ${color}" style="width:18px;height:18px;border-radius:4px;box-shadow:0 0 6px rgba(0,0,0,0.4);background:${color==='red'? '#ef4444': color==='green'? '#10b981' : '#f59e0b'}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function Map() {
  // Khu phố Hoàn Kiếm - Hà Nội (trung tâm)
  const congestedArea = { lat: 21.0285, lng: 105.8542, name: "Hoàn Kiếm" };
  
  const [vehicles, setVehicles] = useState(() => {
    // Khởi tạo các xe hiện có (Hoàn Kiếm + một số vị trí bình thường)
    const base = [
      { id: 1, position: [21.0285, 105.8542], status: "congested", area: "Hoàn Kiếm" },
      { id: 2, position: [21.0287, 105.8543], status: "congested", area: "Hoàn Kiếm" },
      { id: 3, position: [21.0283, 105.8541], status: "congested", area: "Hoàn Kiếm" },
      { id: 4, position: [21.0286, 105.8545], status: "congested", area: "Hoàn Kiếm" },
      { id: 5, position: [21.0284, 105.8539], status: "congested", area: "Hoàn Kiếm" },
      { id: 6, position: [21.0288, 105.8541], status: "congested", area: "Hoàn Kiếm" },
      { id: 7, position: [21.0282, 105.8543], status: "congested", area: "Hoàn Kiểm" },
      { id: 8, position: [21.0285, 105.8547], status: "congested", area: "Hoàn Kiếm" },
      { id: 9, position: [21.0281, 105.8540], status: "congested", area: "Hoàn Kiếm" },
      { id: 10, position: [21.0289, 105.8544], status: "congested", area: "Hoàn Kiếm" },
      { id: 11, position: [21.0283, 105.8545], status: "congested", area: "Hoàn Kiếm" },
      { id: 12, position: [21.0286, 105.8538], status: "congested", area: "Hoàn Kiếm" },
      { id: 13, position: [21.0280, 105.8542], status: "congested", area: "Hoàn Kiếm" },
      { id: 14, position: [21.0287, 105.8546], status: "congested", area: "Hoàn Kiếm" },
      { id: 15, position: [21.0284, 105.8544], status: "congested", area: "Hoàn Kiếm" },
      { id: 16, position: [21.05, 105.85], status: "normal", area: "Ba Đình" },
      { id: 17, position: [21.00, 105.80], status: "normal", area: "Cầu Giấy" },
    ];

    // Thêm nhiều xe ùn tắc quanh vòng xuyến Yên Nghĩa
    const yennghia = { lat: 21.0008, lng: 105.7580 };
    for (let i = 0; i < 40; i++) {
      const jitterLat = (Math.random() - 0.5) * 0.0045; // ~ small offset
      const jitterLng = (Math.random() - 0.5) * 0.0045;
      base.push({
        id: 100 + i,
        position: [yennghia.lat + jitterLat, yennghia.lng + jitterLng],
        status: "congested",
        area: "Yên Nghĩa",
      });
    }

    return base;
  });

  const icons = useMemo(
    () => ({
      congested: createMarkerIcon("congested"),
      normal: createMarkerIcon("normal"),
    }),
    []
  );

  const trafficLightIcons = useMemo(
    () => ({
      red: createTrafficLightIcon("red"),
      green: createTrafficLightIcon("green"),
      amber: createTrafficLightIcon("amber"),
    }),
    []
  );

  const trafficLights = [
    // a cluster of traffic lights around the Yên Nghĩa roundabout
    { id: "tl-yn-1", position: [21.0010, 105.7582], state: "red" },
    { id: "tl-yn-2", position: [21.0006, 105.7577], state: "green" },
    { id: "tl-yn-3", position: [21.0004, 105.7586], state: "amber" },
    { id: "tl-yn-4", position: [21.0012, 105.7579], state: "red" },
    { id: "tl-yn-5", position: [21.0009, 105.7590], state: "red" },
  ];

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