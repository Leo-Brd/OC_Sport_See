import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";
import "./ScoreChart.css";

export default function ScoreChart({ score }) {
  const percent = Math.round(score * 100);

  const data = [{ value: percent, fill: "#ff0101" }];

  // Calcul dynamique de l'arc pour que la taille soit proportionnelle
  const startAngle = 90;
  const endAngle = 90 + (360 * (percent / 100));

  return (
    <div className="score-chart-container">
      <span className="score-label">Score</span>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius="70%"
          outerRadius="80%"
          barSize={10}
          cx="50%"
          cy="50%"
        >
          <RadialBar
            dataKey="value"
            cornerRadius={5}
            minAngle={15}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {/* Cercle blanc central avec le texte */}
      <div className="score-center">
        <span className="score-percent">{percent}%</span>
        <span className="score-subtitle">de votre<br />objectif</span>
      </div>
    </div>
  );
}
