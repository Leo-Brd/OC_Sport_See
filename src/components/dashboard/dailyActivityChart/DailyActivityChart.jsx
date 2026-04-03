import React from "react";
import './DailyActivityChart.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Affiche le graphique de l'activité quotidienne (poids et calories).
 * @param {{ sessions: Array<{ day: string, kilogram: number, calories: number }> }} props
 */
export default function DailyActivityChart({ sessions }) {
  // On veut afficher les jours sous forme de 1, 2, 3, ...
  const data = sessions.map((s, i) => ({ ...s, day: i + 1 }));

  return (
    <div className="daily-activity-chart">
      <h3>Activité quotidienne</h3>
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: '#DEDEDE' }} />
          <YAxis yAxisId="kg" dataKey="kilogram" orientation="right" axisLine={false} tickLine={false} domain={[dataMin => Math.floor(dataMin - 1), dataMax => Math.ceil(dataMax + 1)]} />
          <YAxis yAxisId="cal" dataKey="calories" hide />
          <Tooltip
            contentStyle={{ background: '#E60000', color: '#fff', border: 'none', borderRadius: 5 }}
            labelStyle={{ display: 'none' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => [value, name === 'kilogram' ? 'kg' : 'Kcal']}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" height={36} wrapperStyle={{ top: -20 }} formatter={v => v === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'} />
          <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} maxBarSize={7} name="kilogram" />
          <Bar yAxisId="cal" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} maxBarSize={7} name="calories" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
