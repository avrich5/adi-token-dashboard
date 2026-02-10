# Starter Prompt for Developer

## Context

You are building a dashboard for monitoring ADI token health. ADI is a utility token for Abu Dhabi's digital economy infrastructure.

**This is a prototype** — optimize for speed, not production-readiness.

## Reference Document

Read the attached `03-development-plan.md` for full technical details.

## Tech Stack

- **Backend:** Python + FastAPI (single `main.py` file)
- **Frontend:** React + Vite + Tailwind CSS
- **No database** — use JSON files for config
- **No TypeScript** — plain JavaScript is fine
- **No Docker** — run locally

## Task 1: Backend

Create `backend/main.py` with single endpoint `GET /api/data` that returns:

```json
{
  "timestamp": "2025-02-10T14:30:00Z",
  "state": {
    "id": 2,
    "name": "Utility-Driven Stability",
    "category": "healthy",
    "confidence": 0.78
  },
  "price": {
    "current": 2.61,
    "change_24h_pct": 8.6,
    "change_7d_pct": 13.2
  },
  "resistance": {
    "value": 2.34,
    "asymmetry": 0.62,
    "spread_pct": 0.35
  },
  "emission": {
    "circulating_pct": 5.1,
    "next_unlock_days": 45,
    "next_unlock_pct": 2.3
  },
  "forces": {
    "items": [
      {"id": "market_pressure", "name": "Market Pressure", "value": -0.30, "is_mockup": false},
      {"id": "emission_pressure", "name": "Emission Pressure", "value": -0.15, "is_mockup": false},
      {"id": "utility_demand", "name": "Utility Demand", "value": 0.20, "is_mockup": true},
      {"id": "mm_activity", "name": "MM Support", "value": 0.40, "is_mockup": true},
      {"id": "narrative", "name": "Narrative", "value": 0.10, "is_mockup": true}
    ],
    "net": 0.25,
    "interpretation": "Slight positive bias"
  },
  "transitions": [
    {"to_state": "Healthy Expansion", "to_id": 1, "probability": 0.35, "trigger": "Volume growth", "window": "2-4 weeks", "category": "healthy"},
    {"to_state": "Speculative Dominance", "to_id": 3, "probability": 0.15, "trigger": "BTC pump + FOMO", "window": "Days", "category": "caution"},
    {"to_state": "Liquidity Stress", "to_id": 9, "probability": 0.05, "trigger": "MM exit", "window": "Hours", "category": "warning"}
  ]
}
```

### Backend Requirements

1. **Fetch from CoinGecko:**
   ```
   GET https://api.coingecko.com/api/v3/coins/adi-token
   ```
   Extract: current price, 24h change, 7d change, volume

2. **Fetch from Kraken:**
   ```
   GET https://api.kraken.com/0/public/Depth?pair=ADIUSD&count=50
   ```
   Extract: bids, asks arrays

3. **Calculate Market Resistance:**
   ```python
   def calculate_resistance(bids, asks, depth_usd=10000):
       """
       Market Resistance = dollars needed to move price 1%
       Higher = more stable, harder to manipulate
       """
       bid_depth = sum(price * amount for price, amount in bids if within depth)
       ask_depth = sum(price * amount for price, amount in asks if within depth)
       resistance = (bid_depth + ask_depth) / 2
       asymmetry = bid_depth / (bid_depth + ask_depth)  # 0.5 = balanced
       return resistance, asymmetry
   ```

4. **Calculate Forces:**
   - `market_pressure`: `-btc_change_7d * btc_correlation` (fetch BTC data too)
   - `emission_pressure`: `-next_unlock_pct / days_to_unlock * 10`
   - Other forces: load from `config/forces_mockup.json`

5. **Load Transitions:**
   - Read from `config/transitions_mockup.json`
   - Filter by current state ID
   - Return top 3 by probability

6. **State Classification (simplified):**
   ```python
   def classify_state(metrics):
       if metrics['resistance'] < 0.5:
           return {"id": 9, "name": "Liquidity Stress", "category": "warning"}
       if metrics['btc_correlation'] > 0.7 and metrics['volatility_ratio'] > 1.5:
           return {"id": 3, "name": "Speculative Dominance", "category": "caution"}
       if metrics['price_change_30d'] < -0.15:
           return {"id": 12, "name": "Erosion Phase", "category": "warning"}
       return {"id": 2, "name": "Utility-Driven Stability", "category": "healthy"}
   ```

7. **Load emission schedule:**
   - Read from `config/vesting_schedule.json`
   - Calculate circulating_pct, next_unlock_days, next_unlock_pct

8. **Cache responses** for 60 seconds (simple in-memory dict)

9. **CORS enabled** for frontend

## Task 2: Frontend

Create React app with these components:

### Components

1. **App.jsx** — main layout, fetches data every 60s
2. **StateCard.jsx** — hero section with state name, category badge, confidence
3. **MetricsCard.jsx** — reusable card for Price/Resistance/Emission
4. **ForceMap.jsx** — horizontal diverging bar chart
5. **TransitionsPanel.jsx** — 3 cards showing possible next states
6. **EmissionChart.jsx** — line chart with Recharts

### ForceMap Component

```jsx
// Horizontal bars extending left (negative) or right (positive) from center
// Value range: -1.0 to +1.0
// Show amber indicator for is_mockup: true items

function ForceMap({ forces }) {
  return (
    <div className="bg-[#12121A] rounded-lg p-4">
      <h3>Force Balance</h3>
      {forces.items.map(force => (
        <ForceBar 
          key={force.id}
          name={force.name}
          value={force.value}
          isMockup={force.is_mockup}
        />
      ))}
      <div className="border-t mt-2 pt-2">
        <span>Net Force: {forces.net > 0 ? '+' : ''}{forces.net}</span>
        <span className="text-gray-400 ml-2">{forces.interpretation}</span>
      </div>
    </div>
  );
}
```

### TransitionsPanel Component

```jsx
// 3 cards in a row
// Each card has: state name, probability bar, trigger, window, category color

function TransitionsPanel({ transitions, currentState }) {
  return (
    <div className="bg-[#12121A] rounded-lg p-4">
      <h3>Possible Transitions from "{currentState}"</h3>
      <div className="grid grid-cols-3 gap-4">
        {transitions.map(t => (
          <TransitionCard
            key={t.to_id}
            stateName={t.to_state}
            probability={t.probability}
            trigger={t.trigger}
            window={t.window}
            category={t.category}
          />
        ))}
      </div>
      <p className="text-xs text-amber-500 mt-2">
        ⚠ Probabilities are illustrative estimates
      </p>
    </div>
  );
}
```

### Colors

```javascript
const colors = {
  background: '#0A0A0F',
  cardBg: '#12121A',
  accent: '#00D4FF',
  positive: '#10B981',
  caution: '#F59E0B',
  warning: '#EF4444',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  mockupIndicator: '#F59E0B'
};

const categoryColors = {
  healthy: '#10B981',
  caution: '#F59E0B',
  warning: '#EF4444'
};
```

### Layout

- Single page, no routing
- Dark theme (`bg-[#0A0A0F]`)
- Responsive (works on mobile)
- Auto-refresh every 60 seconds

## Context

**ADI Token:**
- CoinGecko ID: `adi-token`
- Trading pair on Kraken: `ADIUSD`
- Total supply: 10 billion
- Currently ~5% circulating

**Market Resistance:**
- Measures liquidity depth
- Higher = more stable
- Calculated from order book

**Vesting Schedule:**
- See `config/vesting_schedule.json`
- 9-year release schedule

**Forces:**
- Values range from -1.0 (strong negative) to +1.0 (strong positive)
- `is_mockup: true` means data is estimated, not from real source
- Mockup items should show amber warning indicator in UI

**Transitions:**
- Loaded from `config/transitions_mockup.json`
- Categories: healthy, caution, warning
- Show as colored cards with probability bars

## Config Files Location

```
/config/vesting_schedule.json    — emission schedule
/config/state_thresholds.json    — classification rules
/config/forces_mockup.json       — mockup values for 3 forces
/config/transitions_mockup.json  — transition probabilities for all states
```

## Deliverable

Working prototype that:
- Shows current state with confidence
- Displays real price/resistance from APIs
- Shows force balance with 5 forces (2 real, 3 mockup)
- Shows 3 possible state transitions
- Shows emission timeline
- Auto-refreshes every 60 seconds
- Clearly marks mockup data with amber indicators
