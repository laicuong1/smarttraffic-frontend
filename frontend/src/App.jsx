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
  const congestedArea = {
    name: "Hoàn Kiếm",
    address: "Trung tâm Hà Nội",
    congestedVehicles: 15,
    normalVehicles: 2,
    totalVehicles: 17,
    congestedVehiclesList: [
      { id: 1, type: "Ô tô", speed: "0 km/h", time: "15 phút" },
      { id: 2, type: "Ô tô", speed: "0 km/h", time: "12 phút" },
      { id: 3, type: "Xe máy", speed: "2 km/h", time: "18 phút" },
      { id: 4, type: "Ô tô", speed: "0 km/h", time: "10 phút" },
      { id: 5, type: "Xe tải", speed: "1 km/h", time: "20 phút" },
      { id: 6, type: "Ô tô", speed: "0 km/h", time: "14 phút" },
      { id: 7, type: "Xe máy", speed: "3 km/h", time: "8 phút" },
      { id: 8, type: "Ô tô", speed: "0 km/h", time: "16 phút" },
      { id: 9, type: "Xe buýt", speed: "0.5 km/h", time: "22 phút" },
      { id: 10, type: "Ô tô", speed: "0 km/h", time: "11 phút" },
      { id: 11, type: "Xe máy", speed: "2 km/h", time: "9 phút" },
      { id: 12, type: "Ô tô", speed: "0 km/h", time: "13 phút" },
      { id: 13, type: "Xe van", speed: "1 km/h", time: "19 phút" },
      { id: 14, type: "Ô tô", speed: "0 km/h", time: "17 phút" },
      { id: 15, type: "Xe máy", speed: "2.5 km/h", time: "7 phút" },
    ],
  };

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
            className="mb-6 rounded-[2rem] border border-cyan-200/10 bg-slate-950/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Operational Alert</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-100">
                  Vùng ùn tắc chủ đạo: {congestedArea.name}
                </h2>
                <p className="text-sm text-slate-400">{congestedArea.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                <motion.div variants={cardItem} className="rounded-3xl bg-slate-900/80 px-4 py-4 ring-1 ring-cyan-400/10 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-1 hover:bg-slate-900/95">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Tổng xe</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-100">{congestedArea.totalVehicles}</p>
                </motion.div>
                <motion.div variants={cardItem} className="rounded-3xl bg-slate-900/80 px-4 py-4 ring-1 ring-cyan-400/10 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-1 hover:bg-slate-900/95">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Mật độ</p>
                  <p className="mt-2 text-3xl font-semibold text-cyan-300">High</p>
                </motion.div>
                <motion.div variants={cardItem} className="rounded-3xl bg-slate-900/80 px-4 py-4 ring-1 ring-red-400/10 shadow-xl shadow-red-500/5 transition hover:-translate-y-1 hover:bg-slate-900/95">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Xe kẹt</p>
                  <p className="mt-2 text-3xl font-semibold text-rose-400">{congestedArea.congestedVehicles}</p>
                </motion.div>
                <motion.div variants={cardItem} className="rounded-3xl bg-slate-900/80 px-4 py-4 ring-1 ring-emerald-400/10 shadow-xl shadow-emerald-400/5 transition hover:-translate-y-1 hover:bg-slate-900/95">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Tốc độ TB</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-300">3 km/h</p>
                </motion.div>
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
                  <div className="border-t border-cyan-200/10 bg-slate-950/80 p-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200 ring-1 ring-cyan-400/10 shadow-sm shadow-cyan-500/5">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Vùng nóng</p>
                        <p className="mt-2 font-semibold text-slate-100">Hoàn Kiếm</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200 ring-1 ring-cyan-400/10 shadow-sm shadow-cyan-500/5">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Lưu lượng</p>
                        <p className="mt-2 font-semibold text-cyan-300">Cao</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200 ring-1 ring-cyan-400/10 shadow-sm shadow-cyan-500/5">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Sự cố</p>
                        <p className="mt-2 font-semibold text-rose-300">3 điểm</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-sm text-slate-200 ring-1 ring-cyan-400/10 shadow-sm shadow-cyan-500/5">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Đèn tín hiệu</p>
                        <p className="mt-2 font-semibold text-emerald-300">Ổn định</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div variants={sectionFade} className="rounded-[2rem] border border-cyan-200/10 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-3xl">
                <TrafficLight location="Hoàn Kiếm" />
              </motion.div>

              <motion.div variants={sectionFade} className="rounded-[2rem] border border-cyan-200/10 bg-slate-950/80 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-3xl overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-100">Xe bị kẹt</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">Top 15</span>
                </div>
                <div className="overflow-y-auto flex-1 space-y-3 max-h-[312px] pr-2">
                  {congestedArea.congestedVehiclesList.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="rounded-3xl border border-cyan-400/10 bg-slate-900/80 p-4 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-0.5 hover:bg-slate-900/95"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">#{vehicle.id} {vehicle.type}</p>
                          <p className="mt-1 text-xs text-slate-500">{vehicle.area || 'Hoàn Kiếm'}</p>
                        </div>
                        <span className="inline-flex rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-rose-300">
                          ùn tắc
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span className="text-cyan-300">{vehicle.speed}</span>
                        <span className="text-amber-300">{vehicle.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
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