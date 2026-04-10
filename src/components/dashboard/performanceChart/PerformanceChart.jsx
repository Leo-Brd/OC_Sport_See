import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "./PerformanceChart.css";

// Traduction des kinds en français + ordre souhaité (comme la maquette, sens horaire depuis le haut)
const kindTranslations = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

// Ordre d'affichage pour que Intensité soit en haut, puis sens horaire
const kindOrder = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];

export default function PerformanceChart({ performance }) {
  const { kind, data } = performance;

  // Construire les données dans le bon ordre
  const chartData = kindOrder.map((kindName) => {
    const kindId = Object.keys(kind).find((k) => kind[k] === kindName);
    const entry = data.find((d) => String(d.kind) === String(kindId));
    return {
      subject: kindTranslations[kindName],
      value: entry ? entry.value : 0,
    };
  });

  return (
    <div className="performance-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} outerRadius="65%">
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
