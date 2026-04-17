import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AverageSessionChart.css";

// Reçoit sessions déjà formatées : [{ index, day, sessionLength }]
const TOP_MARGIN = 80;
const BOTTOM_MARGIN = 20;

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="avg-custom-tooltip">
        <span>{payload[0].value} min</span>
      </div>
    );
  }
  return null;
}

export default function AverageSessionChart({ sessions }) {
  const [overlayLeft, setOverlayLeft] = useState(null);

  // sessions déjà formatées : [{ index, day, sessionLength }]
  return (
    <div className="average-session-chart-container">
      <h3 className="avg-chart-title">Durée moyenne des sessions</h3>
      {/* Overlay pleine hauteur rendu en dehors du SVG pour éviter le clipPath Recharts */}
      {overlayLeft !== null && (
        <div
          className="avg-cursor-overlay"
          style={{ left: overlayLeft }}
        />
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sessions}
          margin={{ top: TOP_MARGIN, right: 0, left: 0, bottom: BOTTOM_MARGIN }}
          onMouseMove={(e) => {
            if (e && e.activeCoordinate) {
              setOverlayLeft(e.activeCoordinate.x);
            }
          }}
          onMouseLeave={() => setOverlayLeft(null)}
        >
          <defs>
            <linearGradient id="lineOpacity" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#fff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="index"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "rgba(255,255,255,0.7)" }}
            tickFormatter={(val) => sessions[val]?.day}
            padding={{ left: 20, right: 20 }}
            interval={0}
          />
          <YAxis hide={true} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={false}
          />
          <Line
            type="monotoneX"
            dataKey="sessionLength"
            stroke="url(#lineOpacity)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              stroke: "rgba(255,255,255,0.5)",
              strokeWidth: 8,
              fill: "#fff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


