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
          <YAxis
            yAxisId="kg"
            dataKey="kilogram"
            orientation="right"
            axisLine={false}
            tickLine={false}
            domain={[dataMin => Math.floor(dataMin - 1), dataMax => Math.ceil(dataMax + 1)]}
            tickFormatter={tick => Number.isInteger(tick) ? tick : Math.round(tick)}
            allowDecimals={false}
          />
          <YAxis yAxisId="cal" dataKey="calories" hide />
          <Tooltip
            contentStyle={{ background: '#E60000', color: '#fff', border: 'none', borderRadius: 5 }}
            labelStyle={{ display: 'none' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => {
              if (name === 'kilogram') return [`${value} kg`];
              if (name === 'calories') return [`${value} Kcal`];
              return value;
            }}
          />
          <Legend verticalAlign="top" align="right" iconType="circle" height={36} wrapperStyle={{ top: -45 }} formatter={v => v === 'kilogram' ? 'Poids (kg)' : 'Calories brûlées (kCal)'}/>
          <Bar yAxisId="cal" dataKey="calories" fill="#E60000" radius={[3, 3, 0, 0]} maxBarSize={7} name="calories" />
          <Bar yAxisId="kg" dataKey="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} maxBarSize={7} name="kilogram" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
