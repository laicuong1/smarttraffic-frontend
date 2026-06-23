import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "10:00", vehicles: 120, speed: 23 },
  { name: "11:00", vehicles: 150, speed: 19 },
  { name: "12:00", vehicles: 310, speed: 12 },
  { name: "13:00", vehicles: 260, speed: 15 },
  { name: "14:00", vehicles: 400, speed: 9 },
  { name: "15:00", vehicles: 360, speed: 11 },
  { name: "16:00", vehicles: 430, speed: 8 },
];

function TrafficChart() {
  return (
    <div className="h-[340px] w-full rounded-3xl bg-slate-950/80 p-4 shadow-2xl shadow-cyan-950/20 ring-1 ring-cyan-400/10 backdrop-blur-3xl">
      <div className="flex items-center justify-between gap-3 pb-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Lưu lượng giao thông</p>
          <p className="text-xl font-semibold text-slate-100">Dữ liệu theo giờ</p>
        </div>
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs text-cyan-300 ring-1 ring-cyan-400/20">Peak hours</span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 2 }}>
          <defs>
            <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.72} />
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(56,189,248,0.18)', borderRadius: 16 }} labelStyle={{ color: '#e2e8f0' }} itemStyle={{ color: '#38bdf8' }} />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
          <Area type="monotone" dataKey="vehicles" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#trafficGradient)" activeDot={{ r: 6, fill: '#38bdf8', stroke: '#ffffff', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrafficChart;
