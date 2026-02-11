import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useHistoryData } from '../hooks/useHistoryData';
import './ForcesTimeline.css';

const FORCES_META = [
  { id: 'market_pressure',  name: 'Market Pressure',    color: '#00E5A0', mockup: false },
  { id: 'emission_pressure', name: 'Emission Pressure', color: '#FF5C5C', mockup: false },
  { id: 'utility_demand',   name: 'Utility Demand',     color: '#A78BFA', mockup: true },
  { id: 'mm_activity',      name: 'MM Activity',        color: '#38BDF8', mockup: true },
  { id: 'narrative',        name: 'Narrative',           color: '#FBBF24', mockup: true },
];

// Split into positive-stacked and negative-stacked keys
const POS_KEYS = FORCES_META.map(f => `pos_${f.id}`);
const NEG_KEYS = FORCES_META.map(f => `neg_${f.id}`);

export default function ForcesTimeline() {
  const { data, error, loading } = useHistoryData();

  const chartData = useMemo(() => {
    if (!data?.timeline?.length) return [];

    return data.timeline.map(day => {
      const forces = day.forces || {};
      const row = { date: day.date, _raw: {} };

      for (const fm of FORCES_META) {
        const val = forces[fm.id]?.value ?? 0;
        row._raw[fm.id] = val;
        // Positive forces stack upward, negative stack downward
        row[`pos_${fm.id}`] = val > 0 ? val : 0;
        row[`neg_${fm.id}`] = val < 0 ? val : 0;  // negative values (will stack down)
      }

      // Net force for reference
      row._net = Object.values(row._raw).reduce((s, v) => s + v, 0);
      return row;
    });
  }, [data]);

  if (loading) return <div className="ft-loading">Loading forces…</div>;
  if (error) return <div className="ft-error">⚠ {error}</div>;
  if (!chartData.length) return null;

  return (
    <section className="ft-section">
      <div className="ft-header">
        <h2 className="ft-title">Force Decomposition</h2>
        <div className="ft-badges">
          <span className="ft-badge mockup">3 of 5 forces estimated</span>
        </div>
      </div>

      <div className="ft-chart-wrap">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#555874', fontSize: 11 }}
              tickFormatter={v => v.slice(5)}
              interval="preserveStartEnd"
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            />
            <YAxis
              width={60}
              tick={{ fill: '#555874', fontSize: 11 }}
              tickFormatter={v => v.toFixed(1)}
              axisLine={false} tickLine={false}
            />
            {/* Right axis for width alignment with Timeline above */}
            <YAxis
              yAxisId="right"
              orientation="right"
              width={60}
              tick={{ fill: 'transparent', fontSize: 11 }}
              tickFormatter={() => ''}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <Tooltip content={<ForcesTooltip />} />

            {/* Positive forces — stacked upward */}
            {FORCES_META.map(fm => (
              <Area
                key={`pos_${fm.id}`}
                type="monotone"
                dataKey={`pos_${fm.id}`}
                stackId="positive"
                stroke="none"
                fill={fm.color}
                fillOpacity={fm.mockup ? 0.3 : (fm.id === 'emission_pressure' ? 0.35 : 0.55)}
              />
            ))}

            {/* Negative forces — stacked downward */}
            {FORCES_META.map(fm => (
              <Area
                key={`neg_${fm.id}`}
                type="monotone"
                dataKey={`neg_${fm.id}`}
                stackId="negative"
                stroke="none"
                fill={fm.color}
                fillOpacity={fm.mockup ? 0.3 : (fm.id === 'emission_pressure' ? 0.35 : 0.55)}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="ft-legend">
        {FORCES_META.map(fm => (
          <span key={fm.id} className="ft-legend-item">
            <span className="ft-legend-dot" style={{
              background: fm.color,
              opacity: fm.mockup ? 0.45 : 0.85
            }} />
            <span className={fm.mockup ? 'ft-legend-name mockup' : 'ft-legend-name'}>
              {fm.name}
            </span>
          </span>
        ))}
        <span className="ft-legend-item net">
          <span className="ft-legend-dot" style={{ background: '#fff', opacity: 0.3 }} />
          <span className="ft-legend-name">Zero line</span>
        </span>
      </div>
    </section>
  );
}


function ForcesTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const row = payload[0]?.payload;
  if (!row?._raw) return null;

  const net = row._net ?? 0;

  return (
    <div className="ft-tooltip">
      <div className="ft-tooltip-date">{row.date}</div>
      <div className="ft-tooltip-divider" />
      {FORCES_META.map(fm => {
        const val = row._raw[fm.id] ?? 0;
        const isPos = val >= 0;
        return (
          <div key={fm.id} className="ft-tooltip-row">
            <span className="ft-tooltip-dot" style={{
              background: fm.color,
              opacity: fm.mockup ? 0.5 : 1
            }} />
            <span className="ft-tooltip-name">{fm.name}</span>
            <span className="ft-tooltip-val" style={{
              color: isPos ? '#00E5A0' : '#FF5C5C'
            }}>
              {isPos ? '+' : ''}{val.toFixed(3)}
            </span>
          </div>
        );
      })}
      <div className="ft-tooltip-divider" />
      <div className="ft-tooltip-row net">
        <span className="ft-tooltip-name">Net Force</span>
        <span className="ft-tooltip-val" style={{
          color: net >= 0 ? '#00E5A0' : '#FF5C5C',
          fontWeight: 600
        }}>
          {net >= 0 ? '+' : ''}{net.toFixed(3)}
        </span>
      </div>
    </div>
  );
}
