import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Map from "./components/Map";
import TrafficChart from "./components/Chart";
import Alert from "./components/Alert";
import TrafficLight from "./components/TrafficLight";

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function App() {
  const [incidents, setIncidents] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTrafficIncidents() {
      try {
        const response = await fetch("http://localhost:3000/api/traffic", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Lỗi API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setIncidents(
          data.map((item) => ({
            id: item.id,
            title: item.title || `Sự cố giao thông #${item.id}`,
            body: item.description || "Cập nhật tình trạng giao thông",
          }))
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch API lỗi:", error);
          // Dữ liệu mock nếu backend không khả dụng
          setIncidents([
            { id: 1, title: "Khu vực ùn tắc: Hoàn Kiếm", body: "Mật độ xe cao, tốc độ giảm 30%" },
            { id: 2, title: "Tai nạn giao thông: Hàng Khay", body: "2 chiếc xe va chạm, gây ùn tắc 15 phút" },
            { id: 3, title: "Sửa chữa đường: Tràng Tiền", body: "1 làn đóng, lưu lượng xe giảm" },
            { id: 4, title: "Sự kiện: Nhà hát Lớn", body: "Có sự kiện, tăng lưu lượng giao thông" },
            { id: 5, title: "Điều tiết giao thông: Hoàn Kiếm", body: "Đèn tín hiệu sẵn sàng điều phối" },
          ]);
          setApiError(null);
        }
      } finally {
        setApiLoading(false);
      }
    }

    fetchTrafficIncidents();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[-20%] top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute right-[-10%] top-40 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-5 py-8">
          <Alert />

          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/70 px-4 py-2 text-sm text-cyan-200 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-400/10 backdrop-blur-xl backdrop-saturate-150">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.7)] animate-pulse" />
              Live traffic intelligence
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-slate-100">
                Smart Traffic Command Center
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300 sm:text-lg">
                Giám sát thời gian thực, phân tích AI và điều phối giao thông thành phố được thiết kế cho các cơ quan quản lý, vận hành như một hệ thống quản lý thông minh kiểu startup. 
              </p>
            </div>
          </motion.header>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={sectionFade}
            className="mb-6 rounded-[2rem] border border-emerald-200/10 bg-slate-950/70 p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-emerald-300/80">API trực tiếp</p>
                  <h2 className="text-2xl font-semibold text-slate-100">Dữ liệu API giao thông</h2>
                </div>
                {apiLoading ? (
                  <span className="text-sm text-slate-400">Đang tải dữ liệu...</span>
                ) : apiError ? (
                  <span className="text-sm text-amber-300">Lỗi API: {apiError}</span>
                ) : (
                  <span className="text-sm text-emerald-300">{incidents.length} báo cáo được tải</span>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {apiLoading ? (
                  <div className="rounded-3xl bg-slate-900/80 p-4 text-slate-400">Đang kết nối tới API...</div>
                ) : apiError ? (
                  <div className="rounded-3xl bg-slate-900/80 p-4 text-amber-200">{apiError}</div>
                ) : (
                  incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="rounded-3xl bg-slate-900/80 p-4 ring-1 ring-emerald-500/10 shadow-xl shadow-emerald-500/5"
                    >
                      <p className="text-sm text-slate-400">Báo cáo #{incident.id}</p>
                      <h3 className="mt-2 text-lg font-semibold text-slate-100">{incident.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{incident.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.section>

          <motion.section
            initial="hidden"
            animate="visible"
            variants={cardStagger}
            className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <motion.div
              variants={sectionFade}
              className="rounded-[2rem] overflow-hidden border border-cyan-200/10 bg-slate-950/75 shadow-2xl shadow-cyan-950/30 backdrop-blur-3xl"
              style={{ minHeight: '620px' }}
            >
              <div className="h-full overflow-hidden rounded-[2rem]">
                <div className="flex h-full flex-col">
                  <div className="relative grow min-h-[500px] w-full">
                    <Map />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div variants={sectionFade} className="rounded-[2rem] border border-cyan-200/10 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-3xl">
                <TrafficLight location="Hoàn Kiếm" />
              </motion.div>

              <motion.div variants={sectionFade} className="rounded-[2rem] border border-cyan-200/10 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-3xl">
                <TrafficChart />
              </motion.div>
            </div>
          </motion.section>

          {/* Real-time Alerts Feed Section */}
          <section className="mt-8">
            <div className="rounded-[2rem] border border-cyan-200/5 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-50 flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  🔔 Cảnh báo thời gian thực
                </h2>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-semibold">Cập nhật liên tục</span>
              </div>
              
              <div className="grid gap-4 lg:grid-cols-3">
                {/* Alert Stream */}
                <div className="lg:col-span-2 space-y-3 max-h-[420px] overflow-y-auto pr-2">
                  <div className="rounded-xl bg-red-500/5 border border-red-500/30 p-4 hover:bg-red-500/10 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🚨</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-red-300 text-sm">Va chạm xe - Hoàn Kiếm</p>
                          <span className="text-xs bg-red-500/30 text-red-200 px-2 py-0.5 rounded-full font-semibold">Nghiêm trọng</span>
                        </div>
                        <p className="text-xs text-slate-400">Ngã tư Tràng Tiền - Hàng Khay | Lưu lượng +35%</p>
                        <p className="text-xs text-slate-500 mt-1">Vừa xảy ra - 0 giây</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/30 p-4 hover:bg-amber-500/10 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📉</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-amber-300 text-sm">Ùn tắc tăng - Lý Thái Tổ</p>
                          <span className="text-xs bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full font-semibold">Trung bình</span>
                        </div>
                        <p className="text-xs text-slate-400">Tốc độ giảm từ 15 km/h xuống 5 km/h</p>
                        <p className="text-xs text-slate-500 mt-1">2 phút trước</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-cyan-500/5 border border-cyan-500/30 p-4 hover:bg-cyan-500/10 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✅</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-cyan-300 text-sm">Tình hình cải thiện - Hàng Khay</p>
                          <span className="text-xs bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded-full font-semibold">Tích cực</span>
                        </div>
                        <p className="text-xs text-slate-400">Tốc độ tăng từ 3 km/h lên 8 km/h</p>
                        <p className="text-xs text-slate-500 mt-1">5 phút trước</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/30 p-4 hover:bg-yellow-500/10 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🔧</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-yellow-300 text-sm">Sửa chữa đường - Hàng Buồm</p>
                          <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded-full font-semibold">Nhẹ</span>
                        </div>
                        <p className="text-xs text-slate-400">1 làn đóng, lưu lượng giảm 15%</p>
                        <p className="text-xs text-slate-500 mt-1">8 phút trước</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-blue-500/5 border border-blue-500/30 p-4 hover:bg-blue-500/10 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📍</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-blue-300 text-sm">Sự kiện - Khu vực Hoàn Kiếm</p>
                          <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-semibold">Thông tin</span>
                        </div>
                        <p className="text-xs text-slate-400">Có sự kiện giao lưu tại nhà hát Lớn, dự kiến 2 giờ nữa</p>
                        <p className="text-xs text-slate-500 mt-1">15 phút trước</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert Summary Stats */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 p-4">
                    <p className="text-xs text-slate-400 font-medium">CẢNH BÁO NGHIÊM TRỌNG</p>
                    <p className="text-3xl font-bold text-red-300 mt-2">3</p>
                    <p className="text-xs text-slate-400 mt-2">sự cố hoạt động</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 p-4">
                    <p className="text-xs text-slate-400 font-medium">CẢNH BÁO TRUNG BÌNH</p>
                    <p className="text-3xl font-bold text-amber-300 mt-2">7</p>
                    <p className="text-xs text-slate-400 mt-2">điểm ùn tắc</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 p-4">
                    <p className="text-xs text-slate-400 font-medium">TÌN HIỆU TÍCH CỰC</p>
                    <p className="text-3xl font-bold text-cyan-300 mt-2">5</p>
                    <p className="text-xs text-slate-400 mt-2">tuyến đường cải thiện</p>
                  </div>

                  <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 p-4">
                    <p className="text-xs text-slate-400 font-medium">CHỈ SỐ TƯƠNG TƯỢNG</p>
                    <p className="text-2xl font-bold text-blue-300 mt-2">68%</p>
                    <p className="text-xs text-slate-400 mt-2">so với ngày thường</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div> {/* Thẻ đóng bổ sung cho mx-auto max-w-7xl nằm ở đây */}
      </div>
    </div>
  );
}

export default App;