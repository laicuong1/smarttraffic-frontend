import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const phases = [
  { color: "red", label: "🛑 DỪNG", duration: 10, description: "Đèn đỏ - Dừng lại" },
  { color: "green", label: "✅ ĐI", duration: 8, description: "Đèn xanh - Tiến lên" },
  { color: "yellow", label: "⚠️ CHUẨN BỊ", duration: 3, description: "Đèn vàng - Chuẩn bị" },
];

const lightVariants = {
  active: { scale: 1.08, opacity: 1, boxShadow: "0 0 24px rgba(56,189,248,0.35)", y: -2 },
  inactive: { scale: 0.96, opacity: 0.75 },
};

function TrafficLight({ location = "Hoàn Kiếm" }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const currentPhase = phases[phaseIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
    }, currentPhase.duration * 1000);

    return () => clearTimeout(timer);
  }, [currentPhase]);

  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Đèn thông minh</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-100">{location}</h3>
        <p className="mt-2 text-sm text-slate-400">Hệ thống tín hiệu giao thông với vòng đổi trạng thái mượt mà.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {phases.map((phase) => {
          const isActive = currentPhase.color === phase.color;
          return (
            <motion.button
              key={phase.color}
              whileHover={{ y: -2 }}
              onClick={() => setPhaseIndex(phases.findIndex((item) => item.color === phase.color))}
              className={`rounded-full border px-4 py-4 text-left transition ${isActive ? "border-cyan-500 bg-cyan-400/15" : "border-slate-800 bg-slate-900/80"}`}
            >
              <motion.div
                animate={isActive ? "active" : "inactive"}
                variants={lightVariants}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`flex h-full w-full flex-col items-center justify-center rounded-full px-2 py-3 ${isActive ? "bg-slate-950/70" : "bg-slate-950/60"}`}
              >
                <span className="text-lg font-semibold text-slate-100">{phase.label}</span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">{phase.description}</span>
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="rounded-3xl bg-slate-900/70 px-6 py-5 text-left shadow-inner shadow-slate-950/20 ring-1 ring-white/10 backdrop-blur-xl">
        <p className="text-sm text-slate-400">Trạng thái hiện tại</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-3xl font-semibold text-slate-100">{currentPhase.label}</p>
            <p className="mt-1 text-slate-300">{currentPhase.description}</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-300 ring-1 ring-cyan-500/10">
            Thời gian vòng: <span className="font-semibold text-slate-100">{currentPhase.duration} giây</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficLight;
