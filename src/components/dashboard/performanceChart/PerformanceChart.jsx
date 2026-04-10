import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "./PerformanceChart.css";

// Reçoit directement un tableau [{ subject, value }] déjà formaté
export default function PerformanceChart({ data }) {
  return (
    <div className="performance-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="65%">
          <PolarGrid
            gridType="polygon"
            stroke="rgb(255, 255, 255)"
            radialLines={false}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#fff", fontSize: 11, fontWeight: 500 }}
            tickLine={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            fill="#ff0101"
            fillOpacity={0.7}
            stroke="#ff0101"
            strokeWidth={1}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
