# UI/UX Implementation Guide — Extension to PROMPT-developer.md

## Introduction

This document extends `PROMPT-developer.md` with detailed UI/UX implementation instructions. Read `design/UI-SPECIFICATION.md` for complete visual design system.

---

## Quick Start: Visual Setup

### 1. Install Dependencies

```bash
npm install @fontsource/inter recharts
```

### 2. Add Google Fonts (Alternative to @fontsource)

In `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Configure Tailwind

Create/update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        'bg-primary': '#0A0A0F',
        'bg-secondary': '#12121A',
        'bg-tertiary': '#1A1A24',
        
        // Text colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'text-tertiary': '#6B7280',
        
        // Borders
        'border-subtle': '#1F2937',
        'border-medium': '#374151',
        
        // Semantic
        'state-healthy': '#10B981',
        'state-caution': '#F59E0B',
        'state-warning': '#EF4444',
        
        // Forces
        'force-positive': '#10B981',
        'force-negative': '#EF4444',
        
        // Accent
        'accent-primary': '#00D4FF',
        'mockup-badge': '#F59E0B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### 4. Global CSS

In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg-primary text-text-primary;
    font-family: 'Inter', -apple-system, BlinkMacSystemFrame, sans-serif;
  }
}

@layer components {
  /* Card base */
  .card {
    @apply bg-bg-secondary rounded-lg border border-border-subtle;
  }
  
  /* State category badges */
  .badge-healthy {
    @apply bg-state-healthy/20 text-state-healthy px-3 py-1 rounded-full text-sm font-medium;
  }
  
  .badge-caution {
    @apply bg-state-caution/20 text-state-caution px-3 py-1 rounded-full text-sm font-medium;
  }
  
  .badge-warning {
    @apply bg-state-warning/20 text-state-warning px-3 py-1 rounded-full text-sm font-medium;
  }
  
  /* Mockup indicator */
  .mockup-indicator {
    @apply inline-flex items-center gap-1 text-mockup-badge;
  }
  
  .mockup-dot {
    @apply w-2 h-2 bg-mockup-badge rounded-full;
  }
}
```

---

## Component Implementation Details

### Component 1: Header

**File:** `src/components/Header.jsx`

```jsx
import { useEffect, useState } from 'react';

export function Header({ lastUpdate }) {
  const [formattedTime, setFormattedTime] = useState('');
  
  useEffect(() => {
    if (lastUpdate) {
      const date = new Date(lastUpdate);
      setFormattedTime(date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
      }));
    }
  }, [lastUpdate]);
  
  return (
    <header className="h-16 px-6 bg-bg-secondary border-b border-border-subtle flex items-center justify-between">
      <h1 className="text-xl font-bold text-text-primary">
        ADI Token Health
      </h1>
      <div className="text-xs text-text-tertiary">
        Last update: <span className="font-mono">{formattedTime || '—'}</span>
      </div>
    </header>
  );
}
```

**Visual:**
- Height: exactly 64px (h-16)
- Logo text: 20px, bold, white
- Timestamp: 11px, mono font, gray

---

### Component 2: StateCard

**File:** `src/components/StateCard.jsx`

```jsx
export function StateCard({ state }) {
  const categoryStyles = {
    healthy: 'badge-healthy',
    caution: 'badge-caution',
    warning: 'badge-warning'
  };
  
  const categoryColors = {
    healthy: 'text-state-healthy',
    caution: 'text-state-caution',
    warning: 'text-state-warning'
  };
  
  // Confidence as 10 circles
  const circles = Array(10).fill(0).map((_, i) => 
    i < Math.round(state.confidence * 10)
  );
  
  return (
    <div className="card p-10 text-center">
      {/* Category badge */}
      <div className="mb-4">
        <span className={categoryStyles[state.category]}>
          {state.category.toUpperCase()}
        </span>
      </div>
      
      {/* State name */}
      <h2 className={`text-5xl font-bold mb-6 ${categoryColors[state.category]}`}>
        {state.name}
      </h2>
      
      {/* Confidence circles */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {circles.map((filled, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              filled 
                ? `bg-${state.category === 'healthy' ? 'state-healthy' : state.category === 'caution' ? 'state-caution' : 'state-warning'}`
                : 'bg-bg-tertiary'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-text-secondary">
          {Math.round(state.confidence * 100)}% confidence
        </span>
      </div>
      
      {/* Metadata (optional for v1) */}
      <div className="mt-4 text-xs text-text-tertiary space-y-1">
        <div>Last transition: 3 days ago</div>
        <div>Duration in state: 12 days</div>
      </div>
    </div>
  );
}
```

**Key Details:**
- 48px font size for state name
- State name color matches category
- 12px circles for confidence (use Tailwind w-3 h-3)
- Center-aligned everything

---

### Component 3: MetricsCard

**File:** `src/components/MetricsCard.jsx`

```jsx
export function MetricsCard({ label, value, unit, details, changeIndicators }) {
  return (
    <div className="card p-5 flex-1">
      {/* Label */}
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3">
        {label}
      </div>
      
      {/* Main value */}
      <div className="text-3xl font-bold font-mono text-text-primary mb-3">
        {unit && <span className="text-lg text-text-tertiary mr-1">{unit}</span>}
        {value}
      </div>
      
      {/* Change indicators (for price card) */}
      {changeIndicators && (
        <div className="space-y-1">
          {changeIndicators.map((change, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-text-tertiary">{change.label}:</span>
              <span className={change.value >= 0 ? 'text-force-positive' : 'text-force-negative'}>
                {change.value >= 0 ? '+' : ''}{change.value}%
              </span>
              <span className={change.value >= 0 ? 'text-force-positive' : 'text-force-negative'}>
                {change.value >= 0 ? '▲' : '▼'}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {/* Details (for other cards) */}
      {details && (
        <div className="space-y-1">
          {details.map((detail, i) => (
            <div key={i} className="text-sm text-text-secondary">
              <span className="text-text-tertiary">{detail.label}:</span> {detail.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Usage Examples:**

```jsx
// Price Card
<MetricsCard
  label="Price"
  value="2.61"
  unit="$"
  changeIndicators={[
    { label: '24h', value: 8.6 },
    { label: '7d', value: 13.2 }
  ]}
/>

// Resistance Card
<MetricsCard
  label="Market Resistance"
  value="2.34"
  details={[
    { label: 'Asymmetry', value: '0.62 (balanced)' },
    { label: 'Spread', value: '0.35%' }
  ]}
/>

// Emission Card
<MetricsCard
  label="Emission Status"
  value="5.1%"
  unit=""
  details={[
    { label: 'Next unlock', value: '45 days' },
    { label: 'Amount', value: '2.3% of supply' }
  ]}
/>
```

**MetricsRow Layout:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <MetricsCard {...priceProps} />
  <MetricsCard {...resistanceProps} />
  <MetricsCard {...emissionProps} />
</div>
```

---

### Component 4: ForceMap

**File:** `src/components/ForceMap.jsx`

This is the most complex component. Here's simplified version:

```jsx
export function ForceMap({ forces }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        FORCE BALANCE
      </h3>
      
      {/* Individual force bars */}
      <div className="space-y-3 mb-4">
        {forces.items.map(force => (
          <ForceBar key={force.id} force={force} />
        ))}
      </div>
      
      {/* Divider */}
      <div className="border-t border-border-medium my-4" />
      
      {/* Net force */}
      <div className="mb-3">
        <NetForceBar value={forces.net} />
      </div>
      
      {/* Interpretation */}
      <div className="text-sm text-text-secondary">
        Interpretation: <span className="text-text-primary">{forces.interpretation}</span>
      </div>
      
      {/* Mockup disclaimer */}
      {forces.items.some(f => f.is_mockup) && (
        <div className="mt-4 text-xs text-mockup-badge">
          ⚠ Some values are illustrative estimates
        </div>
      )}
    </div>
  );
}

function ForceBar({ force }) {
  const isNegative = force.value < 0;
  const percentage = Math.abs(force.value) * 100;
  
  return (
    <div className="flex items-center gap-3">
      {/* Force name with mockup indicator */}
      <div className="w-40 text-sm text-text-primary flex items-center gap-2">
        {force.is_mockup && <span className="mockup-dot" />}
        {force.name}
      </div>
      
      {/* Bar container */}
      <div className="flex-1 relative h-3 flex items-center">
        {/* Center line */}
        <div className="absolute left-1/2 w-px h-full bg-border-medium" />
        
        {/* Negative bar (left from center) */}
        {isNegative && (
          <div
            className="absolute right-1/2 h-full bg-gradient-to-l from-force-negative to-red-700 rounded-l"
            style={{ width: `${percentage / 2}%` }}
          />
        )}
        
        {/* Positive bar (right from center) */}
        {!isNegative && (
          <div
            className="absolute left-1/2 h-full bg-gradient-to-r from-force-positive to-green-700 rounded-r"
            style={{ width: `${percentage / 2}%` }}
          />
        )}
      </div>
      
      {/* Value */}
      <div className="w-16 text-right text-sm font-mono text-text-primary">
        {force.value >= 0 ? '+' : ''}{force.value.toFixed(2)}
      </div>
    </div>
  );
}

function NetForceBar({ value }) {
  const isNegative = value < 0;
  const percentage = Math.abs(value) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 text-sm font-semibold text-text-primary">
        Net Force
      </div>
      
      <div className="flex-1 relative h-4 flex items-center">
        <div className="absolute left-1/2 w-px h-full bg-border-medium" />
        
        {isNegative && (
          <div
            className="absolute right-1/2 h-full bg-gradient-to-l from-force-negative/80 to-red-700/80 rounded-l"
            style={{ width: `${percentage / 2}%` }}
          />
        )}
        
        {!isNegative && (
          <div
            className="absolute left-1/2 h-full bg-gradient-to-r from-force-positive/80 to-green-700/80 rounded-r"
            style={{ width: `${percentage / 2}%` }}
          />
        )}
      </div>
      
      <div className="w-16 text-right text-sm font-mono font-semibold text-text-primary">
        {value >= 0 ? '+' : ''}{value.toFixed(2)} ►
      </div>
    </div>
  );
}
```

**Key Visual Details:**
- Bar container width: use flex-1 (fills available space)
- Bar height: 12px for individual, 16px for net
- Force name column: fixed 160px width (w-40)
- Value column: fixed 64px width (w-16), right-aligned
- Center line: absolute positioned at 50%, 1px wide
- Bars extend from center (50%) toward edges
- Negative bars: `right-1/2`, positive bars: `left-1/2`
- Percentage to width: `value * 100 / 2` (since 50% = max)

**Gradient Colors:**
```
Negative: from-force-negative to-red-700 (from #EF4444 to #B91C1C)
Positive: from-force-positive to-green-700 (from #10B981 to #059669)
```

---

### Component 5: TransitionsPanel

**File:** `src/components/TransitionsPanel.jsx`

```jsx
export function TransitionsPanel({ transitions, currentState }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        Possible Transitions from "{currentState}"
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transitions.map(transition => (
          <TransitionCard key={transition.to_id} transition={transition} />
        ))}
      </div>
      
      <div className="mt-4 text-xs text-mockup-badge">
        ⚠ Probabilities are illustrative estimates
      </div>
    </div>
  );
}

function TransitionCard({ transition }) {
  const borderColors = {
    healthy: 'border-state-healthy',
    caution: 'border-state-caution',
    warning: 'border-state-warning'
  };
  
  const badgeStyles = {
    healthy: 'badge-healthy',
    caution: 'badge-caution',
    warning: 'badge-warning'
  };
  
  const barColors = {
    healthy: 'bg-state-healthy/60',
    caution: 'bg-state-caution/60',
    warning: 'bg-state-warning/60'
  };
  
  const probability = Math.round(transition.probability * 100);
  
  return (
    <div 
      className={`
        bg-bg-tertiary rounded-lg p-4 
        border-2 ${borderColors[transition.category]}
        transition-all hover:bg-bg-tertiary/80
      `}
    >
      {/* State name */}
      <h4 className="text-lg font-semibold text-text-primary mb-3">
        {transition.to_state}
      </h4>
      
      {/* Probability bar */}
      <div className="relative h-6 bg-bg-secondary rounded mb-3">
        <div 
          className={`absolute top-0 left-0 h-full ${barColors[transition.category]} rounded transition-all`}
          style={{ width: `${probability}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <span className="text-xs font-semibold text-text-primary">
            {probability}%
          </span>
        </div>
      </div>
      
      {/* Trigger */}
      <div className="mb-2">
        <div className="text-xs uppercase text-text-tertiary mb-1">Trigger</div>
        <div className="text-sm text-text-secondary">{transition.trigger}</div>
      </div>
      
      {/* Window */}
      <div className="mb-3">
        <div className="text-xs uppercase text-text-tertiary mb-1">Window</div>
        <div className="text-sm text-text-secondary">{transition.window}</div>
      </div>
      
      {/* Category badge */}
      <div>
        <span className={badgeStyles[transition.category]}>
          {transition.category === 'healthy' ? '🟢' : transition.category === 'caution' ? '🟡' : '🔴'}{' '}
          {transition.category}
        </span>
      </div>
    </div>
  );
}
```

**Layout Notes:**
- 3 columns on desktop (md:grid-cols-3)
- 1 column on mobile
- 16px gap between cards
- Cards have 2px border in category color
- Hover: slight background change

---

### Component 6: EmissionChart

**File:** `src/components/EmissionChart.jsx`

```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

export function EmissionChart({ schedule, currentCirculating }) {
  // Transform vesting schedule to chart data
  const chartData = schedule.map(item => ({
    year: new Date(item.date).getFullYear(),
    circulating: item.cumulative_tokens / 1e9, // Convert to billions
  }));
  
  // Find current position
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        EMISSION TIMELINE
      </h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorCirculating" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#1F2937" 
          />
          
          <XAxis 
            dataKey="year" 
            stroke="#6B7280"
            style={{ fontSize: 11 }}
          />
          
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: 11 }}
            tickFormatter={(value) => `${value}B`}
          />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#12121A', 
              border: '1px solid #374151',
              borderRadius: 4 
            }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          
          {/* Current position marker */}
          <ReferenceLine 
            x={currentYear} 
            stroke="#00D4FF" 
            strokeDasharray="3 3"
            label={{
              value: 'You are here',
              position: 'top',
              fill: '#00D4FF',
              fontSize: 11
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="circulating" 
            stroke="#00D4FF" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCirculating)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-sm text-text-secondary">
        <span>Current: {currentCirculating.toFixed(0)}M ({(currentCirculating / 10000).toFixed(1)}%)</span>
        <span>|</span>
        <span>Total: 10B</span>
        <span>|</span>
        <span>Next: 230M in 45 days</span>
      </div>
    </div>
  );
}
```

**Chart Styling:**
- Height: 300px
- Line color: #00D4FF (accent-primary)
- Area fill: gradient from #00D4FF at 40% opacity to transparent
- Grid: dashed, subtle gray
- Current marker: dashed vertical line with label

---

## Main App Structure

**File:** `src/App.jsx`

```jsx
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StateCard } from './components/StateCard';
import { MetricsCard } from './components/MetricsCard';
import { ForceMap } from './components/ForceMap';
import { TransitionsPanel } from './components/TransitionsPanel';
import { EmissionChart } from './components/EmissionChart';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/data');
      if (!response.ok) throw new Error('Failed to fetch');
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 60 seconds
    return () => clearInterval(interval);
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="card p-6 max-w-md border-state-warning">
          <div className="text-state-warning mb-2">⚠ Unable to fetch data</div>
          <div className="text-text-secondary text-sm">
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header lastUpdate={data.timestamp} />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* State Card */}
        <StateCard state={data.state} />
        
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard
            label="Price"
            value={data.price.current.toFixed(2)}
            unit="$"
            changeIndicators={[
              { label: '24h', value: data.price.change_24h_pct },
              { label: '7d', value: data.price.change_7d_pct }
            ]}
          />
          
          <MetricsCard
            label="Market Resistance"
            value={data.resistance.value.toFixed(2)}
            details={[
              { label: 'Asymmetry', value: `${data.resistance.asymmetry.toFixed(2)} (balanced)` },
              { label: 'Spread', value: `${data.resistance.spread_pct.toFixed(2)}%` }
            ]}
          />
          
          <MetricsCard
            label="Emission Status"
            value={`${data.emission.circulating_pct.toFixed(1)}%`}
            details={[
              { label: 'Next unlock', value: `${data.emission.next_unlock_days} days` },
              { label: 'Amount', value: `${data.emission.next_unlock_pct.toFixed(1)}% of supply` }
            ]}
          />
        </div>
        
        {/* Force Map */}
        <ForceMap forces={data.forces} />
        
        {/* Transitions Panel */}
        <TransitionsPanel 
          transitions={data.transitions} 
          currentState={data.state.name}
        />
        
        {/* Emission Chart (optional for v1) */}
        {/* <EmissionChart schedule={vestingSchedule} currentCirculating={510} /> */}
      </main>
    </div>
  );
}

export default App;
```

**Layout Structure:**
- Max width: 1400px (max-w-7xl)
- Padding: 24px horizontal (px-6)
- Vertical spacing: 32px between sections (space-y-8)
- Responsive: stacks on mobile, grid on desktop

---

## Loading & Error States

### Loading Skeleton

```jsx
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-bg-secondary rounded-lg mb-4" />
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="h-32 bg-bg-secondary rounded-lg" />
        <div className="h-32 bg-bg-secondary rounded-lg" />
        <div className="h-32 bg-bg-secondary rounded-lg" />
      </div>
    </div>
  );
}
```

### Error Banner

```jsx
function ErrorBanner({ message, lastSuccess }) {
  return (
    <div className="bg-state-warning/10 border border-state-warning rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2 text-state-warning mb-1">
        <span>⚠</span>
        <span className="font-medium">Unable to fetch data</span>
      </div>
      <div className="text-sm text-text-secondary">
        {message}
      </div>
      {lastSuccess && (
        <div className="text-xs text-text-tertiary mt-2">
          Last successful update: {lastSuccess}
        </div>
      )}
    </div>
  );
}
```

---

## Mobile Responsive Patterns

### Force Map Mobile Adjustments

```jsx
<div className="flex items-center gap-2 md:gap-3">
  {/* Reduce name width on mobile */}
  <div className="w-32 md:w-40 text-xs md:text-sm">
    {force.name}
  </div>
  
  {/* Bar scales on mobile */}
  <div className="flex-1 relative h-2 md:h-3">
    {/* ... bar content */}
  </div>
  
  {/* Value column */}
  <div className="w-12 md:w-16 text-xs md:text-sm">
    {force.value.toFixed(2)}
  </div>
</div>
```

### Transitions Grid Mobile

Already handled by Tailwind:
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```
- Mobile: 1 column (stacked)
- Desktop: 3 columns (side by side)

---

## Animation & Transitions

### Smooth Data Updates

```jsx
// Add transition classes to dynamic values
<div className="transition-all duration-500">
  {data.price.current.toFixed(2)}
</div>
```

### Force Bar Animations

```css
/* In component style or global CSS */
.force-bar {
  transition: width 0.6s ease-out, background-color 0.3s ease;
}
```

### State Change Highlight

```jsx
// When state changes, add pulse effect
const [justChanged, setJustChanged] = useState(false);

useEffect(() => {
  if (prevState !== currentState) {
    setJustChanged(true);
    setTimeout(() => setJustChanged(false), 1200);
  }
}, [currentState]);

<div className={justChanged ? 'animate-pulse-border' : ''}>
```

```css
@keyframes pulse-border {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.4); }
}

.animate-pulse-border {
  animation: pulse-border 1.2s ease-out;
}
```

---

## Accessibility Checklist

### Semantic HTML
```jsx
<header>...</header>
<main>
  <section aria-label="Current state">
    <StateCard />
  </section>
  
  <section aria-label="Key metrics">
    <div className="grid">...</div>
  </section>
</main>
```

### ARIA Labels for Charts

```jsx
<div 
  role="img" 
  aria-label={`Force balance: ${forces.net > 0 ? 'positive' : 'negative'} ${Math.abs(forces.net).toFixed(2)}`}
>
  <ForceMap forces={forces} />
</div>
```

### Focus Styles

```css
/* Global focus style */
*:focus-visible {
  outline: 2px solid #00D4FF;
  outline-offset: 2px;
}
```

---

## Performance Optimization

### Memoize Heavy Components

```jsx
import { memo } from 'react';

export const ForceMap = memo(function ForceMap({ forces }) {
  // ... component code
}, (prevProps, nextProps) => {
  // Only re-render if forces actually changed
  return JSON.stringify(prevProps.forces) === JSON.stringify(nextProps.forces);
});
```

### Lazy Load Chart

```jsx
import { lazy, Suspense } from 'react';

const EmissionChart = lazy(() => import('./components/EmissionChart'));

// In render:
<Suspense fallback={<div className="h-64 bg-bg-secondary animate-pulse rounded-lg" />}>
  <EmissionChart {...props} />
</Suspense>
```

---

## Testing Your Implementation

### Visual Checklist

Open dashboard and verify:

- [ ] **Dark theme** — background is #0A0A0F
- [ ] **State card** — name is large (48px) and colored by category
- [ ] **Confidence circles** — 10 circles, some filled
- [ ] **Price card** — shows currency symbol, change percentages
- [ ] **Force bars** — extend from center, red left / green right
- [ ] **Mockup indicators** — amber dots visible on 3 forces
- [ ] **Transition cards** — 3 cards with colored borders
- [ ] **Probability bars** — fill matches card border color
- [ ] **Mobile layout** — stacks vertically below 768px
- [ ] **Auto-refresh** — timestamp updates every 60s
- [ ] **Loading state** — shows skeleton before data loads
- [ ] **Error state** — shows amber warning if API fails

### Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (iOS and desktop)
- [ ] Firefox (latest)

### Device Testing

- [ ] iPhone SE (375px) — smallest common mobile
- [ ] iPad (768px) — tablet
- [ ] 1080p desktop (1920px) — common desktop

---

## Common Mistakes to Avoid

### ❌ Don't Do This

```jsx
// Don't use absolute pixel widths
<div style={{ width: '300px' }}>

// Don't hide mockup indicators
{force.is_mockup ? null : <Indicator />}

// Don't use too many colors
<div className="bg-blue-500 text-green-300">

// Don't make force bars equal height to text
<div className="h-4"> {/* bars should be 12px */}
```

### ✅ Do This Instead

```jsx
// Use flex and relative units
<div className="flex-1">

// Always show mockup indicators
{force.is_mockup && <span className="mockup-dot" />}

// Stick to semantic colors
<div className="bg-bg-secondary text-text-primary">

// Use correct bar height
<div className="h-3"> {/* 12px = h-3 in Tailwind */}
```

---

## Next Steps After Base Implementation

### Week 3 Polish Tasks

1. **Add smooth transitions** for all data updates
2. **Implement loading skeletons** for each component
3. **Add error recovery** with retry button
4. **Test mobile thoroughly** on real devices
5. **Add subtle hover effects** to interactive elements
6. **Implement EmissionChart** using Recharts
7. **Add keyboard navigation** for accessibility

### Future Enhancements (Post-MVP)

- Expand to full 12-state classification
- Add historical state timeline
- Click transitions to see details
- Export data as CSV
- Dark/light theme toggle (if needed)
- Multi-language support

---

## Support & Questions

If something in this guide is unclear:

1. Check `design/UI-SPECIFICATION.md` for full visual details
2. Check `03-development-plan.md` for backend API structure
3. Refer to Tailwind docs for utility classes
4. Refer to Recharts docs for chart customization

**Key principle:** When in doubt, prioritize clarity over decoration. This is a governance tool, not a trading dashboard.

---

*Document version: 1.0*
*Complements: PROMPT-developer.md*
*Full visual spec: design/UI-SPECIFICATION.md*
