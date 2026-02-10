# Developer Prompt Addition: Implementation Details

## Critical Context for Implementation

This document provides **essential technical specifications** that complete the information in `PROMPT-developer.md` and `03-development-plan.md`. Read all three together.

---

## 1. State Mapping Configuration

You need to create a mapping between **state IDs** and their **category** for UI color coding.

### states_config.json

Create this file in `/config/states_config.json`:

```json
{
  "states": [
    {"id": 1, "name": "Healthy Utility Expansion", "category": "healthy"},
    {"id": 2, "name": "Utility-Driven Stability", "category": "healthy"},
    {"id": 3, "name": "Speculative Dominance", "category": "caution"},
    {"id": 4, "name": "Utility-Market Divergence", "category": "caution"},
    {"id": 5, "name": "Liquidity-Driven Expansion", "category": "caution"},
    {"id": 6, "name": "Incentive-Driven Usage", "category": "caution"},
    {"id": 7, "name": "Incentive Misalignment", "category": "warning"},
    {"id": 8, "name": "Utility Degradation", "category": "warning"},
    {"id": 9, "name": "Liquidity Stress", "category": "warning"},
    {"id": 10, "name": "Narrative-Driven Volatility", "category": "caution"},
    {"id": 11, "name": "Structural Transition", "category": "caution"},
    {"id": 12, "name": "Erosion Phase", "category": "warning"}
  ]
}
```

**Usage in backend:**
```python
with open('config/states_config.json') as f:
    states_config = json.load(f)

def get_state_name_and_category(state_id):
    state = next((s for s in states_config['states'] if s['id'] == state_id), None)
    return state['name'], state['category']
```

---

## 2. Transition Data Structure Details

The `transitions_mockup.json` uses state IDs as keys. When loading transitions:

### Backend Implementation

```python
def get_transitions_for_state(current_state_id, transitions_config):
    """
    Load transitions from config and enrich with state names and categories
    """
    state_key = str(current_state_id)
    state_data = transitions_config['transitions'].get(state_key, {})
    raw_transitions = state_data.get('possible_transitions', [])
    
    # Enrich with target state info
    enriched = []
    for t in raw_transitions[:3]:  # Top 3 only
        target_name, target_category = get_state_name_and_category(t['to'])
        enriched.append({
            'to_state': target_name,
            'to_id': t['to'],
            'probability': t['probability'],
            'trigger': t['trigger'],
            'window': t['window'],
            'category': target_category
        })
    
    return enriched
```

---

## 3. Force Calculation Details

### Real Forces (Calculated from APIs)

#### Market Pressure

```python
def calculate_market_pressure(btc_change_7d, adi_btc_correlation):
    """
    Negative when BTC falls and ADI follows
    Range: typically -1.0 to +1.0
    """
    # BTC down 5% + correlation 0.6 = market_pressure -0.3
    pressure = -btc_change_7d * adi_btc_correlation
    return round(max(-1.0, min(1.0, pressure)), 2)
```

**Data needed:**
- BTC 7-day price change from CoinGecko: `https://api.coingecko.com/api/v3/coins/bitcoin`
- Calculate ADI-BTC correlation from 7-day returns

#### Emission Pressure

```python
def calculate_emission_pressure(next_unlock_pct, days_to_unlock):
    """
    Negative pressure increases as unlock approaches
    Formula: -unlock_size / days_remaining * 10
    Range: typically -0.1 to -0.5
    """
    if days_to_unlock == 0:
        return -1.0  # Unlock happening now
    
    pressure = -(next_unlock_pct / 100) / days_to_unlock * 10
    return round(max(-1.0, pressure), 2)
```

**Data source:** `config/vesting_schedule.json`

### Mockup Forces (From Config)

Load directly from `config/forces_mockup.json`:

```python
with open('config/forces_mockup.json') as f:
    forces_config = json.load(f)

mockup_forces = {f['id']: f for f in forces_config['forces']}

# Get mockup values
utility_demand = mockup_forces['utility_demand']['current_value']
mm_activity = mockup_forces['mm_activity']['current_value']
narrative = mockup_forces['narrative']['current_value']
```

### Force Assembly

```python
def assemble_forces(calculated_market, calculated_emission, mockup_forces):
    items = [
        {
            "id": "market_pressure",
            "name": "Market Pressure",
            "value": calculated_market,
            "is_mockup": False
        },
        {
            "id": "emission_pressure",
            "name": "Emission Pressure",
            "value": calculated_emission,
            "is_mockup": False
        },
        {
            "id": "utility_demand",
            "name": "Utility Demand",
            "value": mockup_forces['utility_demand']['current_value'],
            "is_mockup": True
        },
        {
            "id": "mm_activity",
            "name": "MM Support",
            "value": mockup_forces['mm_activity']['current_value'],
            "is_mockup": True
        },
        {
            "id": "narrative",
            "name": "Narrative",
            "value": mockup_forces['narrative']['current_value'],
            "is_mockup": True
        }
    ]
    
    net = sum(f['value'] for f in items)
    
    # Interpretation
    if net > 0.3:
        interpretation = "Strong positive momentum"
    elif net > 0.1:
        interpretation = "Slight positive bias"
    elif net > -0.1:
        interpretation = "Roughly balanced"
    elif net > -0.3:
        interpretation = "Slight negative pressure"
    else:
        interpretation = "Strong negative pressure"
    
    return {
        "items": items,
        "net": round(net, 2),
        "interpretation": interpretation
    }
```

---

## 4. Resistance Calculation

### Order Book Processing

```python
async def fetch_order_book():
    """Fetch from Kraken public API"""
    url = "https://api.kraken.com/0/public/Depth?pair=ADIUSD&count=50"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=10)
        data = response.json()
        
    # Kraken structure: {result: {ADIUSD: {bids: [...], asks: [...]}}}
    pair_data = data['result']['ADIUSD']
    bids = [[float(p), float(v)] for p, v, _ in pair_data['bids']]
    asks = [[float(p), float(v)] for p, v, _ in pair_data['asks']]
    
    return bids, asks

def calculate_resistance(bids, asks, current_price, depth_usd=10000):
    """
    Market Resistance = liquidity within depth_usd from current price
    
    Returns:
        resistance: float (higher = more stable)
        asymmetry: float 0-1 (0.5 = balanced, >0.5 = bid-heavy)
        spread_pct: float (bid-ask spread as %)
    """
    # Depth calculation
    bid_depth = sum(price * volume for price, volume in bids 
                    if price >= current_price - depth_usd / current_price)
    ask_depth = sum(price * volume for price, volume in asks 
                    if price <= current_price + depth_usd / current_price)
    
    total_depth = bid_depth + ask_depth
    resistance = total_depth / 2  # Average depth
    
    # Asymmetry: >0.5 means more bids (buy pressure)
    asymmetry = bid_depth / total_depth if total_depth > 0 else 0.5
    
    # Spread
    best_bid = bids[0][0] if bids else current_price
    best_ask = asks[0][0] if asks else current_price
    spread_pct = ((best_ask - best_bid) / current_price) * 100
    
    return round(resistance, 2), round(asymmetry, 2), round(spread_pct, 2)
```

---

## 5. Emission Schedule Processing

### Vesting Schedule Structure

The `config/vesting_schedule.json` contains unlock events:

```json
{
  "total_supply": 10000000000,
  "unlocks": [
    {
      "date": "2025-03-15",
      "amount": 230000000,
      "category": "Team",
      "percentage": 2.3
    },
    ...
  ]
}
```

### Backend Processing

```python
from datetime import datetime, timedelta

def process_emission_schedule(schedule):
    """
    Calculate:
    - Current circulating %
    - Next unlock date and size
    - 90-day emission pressure
    """
    today = datetime.now().date()
    total_supply = schedule['total_supply']
    
    # Past unlocks = circulating
    past_unlocks = [u for u in schedule['unlocks'] 
                    if datetime.strptime(u['date'], '%Y-%m-%d').date() <= today]
    circulating = sum(u['amount'] for u in past_unlocks)
    circulating_pct = (circulating / total_supply) * 100
    
    # Next unlock
    future_unlocks = [u for u in schedule['unlocks'] 
                      if datetime.strptime(u['date'], '%Y-%m-%d').date() > today]
    future_unlocks.sort(key=lambda x: x['date'])
    
    if future_unlocks:
        next_unlock = future_unlocks[0]
        next_date = datetime.strptime(next_unlock['date'], '%Y-%m-%d').date()
        next_unlock_days = (next_date - today).days
        next_unlock_pct = next_unlock['percentage']
    else:
        next_unlock_days = None
        next_unlock_pct = 0
    
    # 90-day pressure
    cutoff_date = today + timedelta(days=90)
    unlocks_90d = [u for u in future_unlocks 
                   if datetime.strptime(u['date'], '%Y-%m-%d').date() <= cutoff_date]
    emission_90d_pct = sum(u['percentage'] for u in unlocks_90d)
    
    return {
        "circulating_pct": round(circulating_pct, 1),
        "next_unlock_days": next_unlock_days,
        "next_unlock_pct": next_unlock_pct,
        "emission_90d_pct": round(emission_90d_pct, 1)
    }
```

---

## 6. BTC Correlation Calculation

```python
import numpy as np

def calculate_correlation(adi_prices, btc_prices, window=7):
    """
    Calculate 7-day rolling correlation
    
    Args:
        adi_prices: list of ADI prices (most recent last)
        btc_prices: list of BTC prices (same timeframe)
        window: number of days
    
    Returns:
        correlation: float -1 to 1
    """
    if len(adi_prices) < window + 1:
        return 0.5  # Default if insufficient data
    
    # Calculate returns
    adi_returns = np.diff(adi_prices[-window-1:]) / adi_prices[-window-1:-1]
    btc_returns = np.diff(btc_prices[-window-1:]) / btc_prices[-window-1:-1]
    
    # Pearson correlation
    correlation = np.corrcoef(adi_returns, btc_returns)[0, 1]
    
    return round(float(correlation), 2)
```

**Data needed:**
- Store last 14 days of prices in memory
- Update on each API fetch
- Use for correlation calculation

---

## 7. API Response Caching

### Simple In-Memory Cache

```python
from datetime import datetime, timedelta

class SimpleCache:
    def __init__(self):
        self.cache = {}
    
    def get(self, key):
        if key in self.cache:
            data, timestamp = self.cache[key]
            if datetime.now() - timestamp < timedelta(seconds=60):
                return data
        return None
    
    def set(self, key, data):
        self.cache[key] = (data, datetime.now())

cache = SimpleCache()

# Usage
@app.get("/api/data")
async def get_dashboard_data():
    cached = cache.get('dashboard_data')
    if cached:
        return cached
    
    # Fetch fresh data
    data = await fetch_all_data()
    cache.set('dashboard_data', data)
    return data
```

---

## 8. Error Handling

### API Failure Strategy

```python
async def safe_api_fetch(url, default=None):
    """Fetch with timeout and error handling"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        print(f"API fetch failed: {url}, error: {e}")
        return default

# Usage
coingecko_data = await safe_api_fetch(
    "https://api.coingecko.com/api/v3/coins/adi-token",
    default={"error": "API unavailable", "cached": True}
)
```

### Graceful Degradation

If API fails:
1. Return last cached value with `"stale": true` flag
2. If no cache, return mockup with `"error": "Data unavailable"`
3. Frontend shows error banner but doesn't crash

---

## 9. Frontend State Management

### Simple Context Pattern

```jsx
// api.js
export async function fetchDashboardData() {
  try {
    const response = await fetch('http://localhost:8000/api/data');
    if (!response.ok) throw new Error('API error');
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    return null;
  }
}

// App.jsx
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchDashboardData();
      if (result) {
        setData(result);
        setError(null);
      } else {
        setError('Failed to load data');
      }
      setLoading(false);
    };
    
    loadData();
    const interval = setInterval(loadData, 60000); // Every 60s
    
    return () => clearInterval(interval);
  }, []);
  
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;
  if (!data) return <ErrorScreen message="No data available" />;
  
  return (
    <div className="bg-[#0A0A0F] min-h-screen p-4">
      <Header lastUpdate={data.timestamp} />
      <StateCard state={data.state} />
      <MetricsRow price={data.price} resistance={data.resistance} emission={data.emission} />
      <ForceMap forces={data.forces} />
      <TransitionsPanel transitions={data.transitions} currentState={data.state.name} />
      <EmissionChart schedule={data.emission_schedule} />
    </div>
  );
}
```

---

## 10. Component Implementation Details

### ForceBar Sub-component

```jsx
function ForceBar({ name, value, isMockup }) {
  // Value range: -1.0 to +1.0
  // Bar center at 50%
  // Negative extends left, positive extends right
  
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const barWidth = `${absValue * 50}%`; // Max 50% either direction
  
  const barColor = isNegative ? 'bg-red-500' : 'bg-green-500';
  const barPosition = isNegative ? 'right-1/2' : 'left-1/2';
  
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-gray-300">
          {name}
          {isMockup && <span className="ml-1 text-amber-500 text-xs">⚠</span>}
        </span>
        <span className="text-sm font-mono">
          {value > 0 ? '+' : ''}{value.toFixed(2)}
        </span>
      </div>
      <div className="h-2 bg-gray-800 relative">
        <div className="absolute top-0 h-full w-px bg-gray-600 left-1/2" />
        <div 
          className={`absolute top-0 h-full ${barColor} ${barPosition}`}
          style={{ width: barWidth }}
        />
      </div>
    </div>
  );
}
```

### TransitionCard Sub-component

```jsx
function TransitionCard({ stateName, probability, trigger, window, category }) {
  const borderColors = {
    healthy: 'border-green-500',
    caution: 'border-yellow-500',
    warning: 'border-red-500'
  };
  
  const emojis = {
    healthy: '🟢',
    caution: '🟡',
    warning: '🔴'
  };
  
  return (
    <div className={`bg-[#12121A] rounded-lg p-4 border-2 ${borderColors[category]}`}>
      <h4 className="font-semibold mb-2">{stateName}</h4>
      
      {/* Probability bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Probability</span>
          <span>{(probability * 100).toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded">
          <div 
            className="h-full bg-blue-500 rounded"
            style={{ width: `${probability * 100}%` }}
          />
        </div>
      </div>
      
      {/* Details */}
      <div className="space-y-1 text-xs text-gray-400">
        <div>
          <span className="text-gray-500">Trigger:</span> {trigger}
        </div>
        <div>
          <span className="text-gray-500">Window:</span> {window}
        </div>
      </div>
      
      {/* Category indicator */}
      <div className="mt-3 text-lg">
        {emojis[category]} {category}
      </div>
    </div>
  );
}
```

---

## 11. Complete Backend Structure

```python
# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
import json
from datetime import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple cache
cache = SimpleCache()

# Load configs at startup
with open('../config/vesting_schedule.json') as f:
    vesting_schedule = json.load(f)

with open('../config/forces_mockup.json') as f:
    forces_mockup = json.load(f)

with open('../config/transitions_mockup.json') as f:
    transitions_config = json.load(f)

with open('../config/states_config.json') as f:
    states_config = json.load(f)

@app.get("/api/data")
async def get_dashboard_data():
    """Single endpoint returning all dashboard data"""
    
    # Check cache
    cached = cache.get('dashboard')
    if cached:
        return cached
    
    # Fetch fresh data
    adi_data = await safe_api_fetch("https://api.coingecko.com/api/v3/coins/adi-token")
    btc_data = await safe_api_fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    bids, asks = await fetch_order_book()
    
    # Calculate metrics
    current_price = adi_data['market_data']['current_price']['usd']
    price_change_24h = adi_data['market_data']['price_change_percentage_24h']
    price_change_7d = adi_data['market_data']['price_change_percentage_7d']
    
    resistance, asymmetry, spread_pct = calculate_resistance(bids, asks, current_price)
    
    btc_change_7d = btc_data['market_data']['price_change_percentage_7d']
    btc_correlation = 0.45  # Simplified: would need historical prices
    
    # Emission data
    emission = process_emission_schedule(vesting_schedule)
    
    # Forces
    market_pressure = calculate_market_pressure(btc_change_7d, btc_correlation)
    emission_pressure = calculate_emission_pressure(
        emission['next_unlock_pct'], 
        emission['next_unlock_days']
    )
    forces = assemble_forces(market_pressure, emission_pressure, forces_mockup)
    
    # State classification
    metrics = {
        'resistance': resistance,
        'btc_correlation': btc_correlation,
        'price_change_30d': -0.05,  # Would need historical data
        'volatility_ratio': 1.0
    }
    state_id = classify_state(metrics)
    state_name, state_category = get_state_name_and_category(state_id)
    
    # Transitions
    transitions = get_transitions_for_state(state_id, transitions_config)
    
    # Assemble response
    response = {
        "timestamp": datetime.now().isoformat(),
        "state": {
            "id": state_id,
            "name": state_name,
            "category": state_category,
            "confidence": 0.78  # Simplified
        },
        "price": {
            "current": current_price,
            "change_24h_pct": price_change_24h,
            "change_7d_pct": price_change_7d
        },
        "resistance": {
            "value": resistance,
            "asymmetry": asymmetry,
            "spread_pct": spread_pct
        },
        "emission": emission,
        "forces": forces,
        "transitions": transitions
    }
    
    cache.set('dashboard', response)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## 12. Development Checklist

### Backend (Day 1-2)

- [ ] Create `backend/main.py` with FastAPI app
- [ ] Add CORS middleware
- [ ] Implement `SimpleCache` class
- [ ] Add `safe_api_fetch` helper
- [ ] Load all config files at startup
- [ ] Implement `fetch_order_book()` for Kraken
- [ ] Implement `calculate_resistance()`
- [ ] Implement `calculate_market_pressure()`
- [ ] Implement `calculate_emission_pressure()`
- [ ] Implement `process_emission_schedule()`
- [ ] Implement `assemble_forces()`
- [ ] Implement `classify_state()` (simplified)
- [ ] Implement `get_transitions_for_state()`
- [ ] Create `/api/data` endpoint with full response
- [ ] Test with `curl` or Postman
- [ ] Verify mockup indicators are set correctly

### Frontend (Day 3-5)

- [ ] Create React app with Vite
- [ ] Setup Tailwind CSS
- [ ] Create `api.js` with fetch function
- [ ] Create `App.jsx` with state management
- [ ] Create `StateCard.jsx`
- [ ] Create `MetricsCard.jsx` (reusable)
- [ ] Create `MetricsRow.jsx` using 3x MetricsCard
- [ ] Add auto-refresh every 60s
- [ ] Add loading and error states
- [ ] Test on mobile viewport

### Force Map (Day 6-7)

- [ ] Create `ForceMap.jsx` component
- [ ] Create `ForceBar.jsx` sub-component
- [ ] Implement diverging bar chart (center = 0)
- [ ] Add mockup indicators (amber ⚠)
- [ ] Show net force and interpretation
- [ ] Test with different force values

### Transitions (Day 8-9)

- [ ] Create `TransitionsPanel.jsx` component
- [ ] Create `TransitionCard.jsx` sub-component
- [ ] Add category color coding
- [ ] Add probability bars
- [ ] Display trigger and window
- [ ] Add mockup warning at bottom
- [ ] Test layout with 3 cards

### Emission Chart (Day 10)

- [ ] Create `EmissionChart.jsx` with Recharts
- [ ] Load vesting schedule
- [ ] Display timeline visualization
- [ ] Mark next unlock
- [ ] Test responsiveness

---

## 13. Testing Strategy

### Backend Testing

```bash
# Test CoinGecko
curl "https://api.coingecko.com/api/v3/coins/adi-token"

# Test Kraken
curl "https://api.kraken.com/0/public/Depth?pair=ADIUSD&count=50"

# Test your endpoint
curl "http://localhost:8000/api/data" | jq
```

### Frontend Testing

```bash
# Check auto-refresh
# Open DevTools Network tab
# Watch for fetch every 60s

# Check mobile
# Use DevTools device toolbar
# Test on 375px width
```

---

## 14. Common Pitfalls

❌ **Don't use `require()` in frontend** — Use ES6 `import`  
❌ **Don't forget CORS** — Backend will block frontend requests  
❌ **Don't hardcode 60000ms** — Extract to constant  
❌ **Don't skip error handling** — APIs will fail eventually  
❌ **Don't forget mockup indicators** — Required for transparency  
❌ **Don't calculate correlation wrong** — Need actual historical prices  
❌ **Don't mix state IDs and names** — Use consistent mapping  
❌ **Don't forget to load configs at startup** — Not on each request  

---

## 15. Quick Reference

### API Endpoints

```
Backend:  http://localhost:8000/api/data
Frontend: http://localhost:5173 (Vite default)
```

### Config Files

```
/config/vesting_schedule.json      — Unlock schedule
/config/states_config.json         — State ID → name/category
/config/forces_mockup.json         — Mockup force values
/config/transitions_mockup.json    — Transition probabilities
```

### Color Palette

```javascript
const colors = {
  bg: '#0A0A0F',
  card: '#12121A',
  accent: '#00D4FF',
  positive: '#10B981',  // Green
  caution: '#F59E0B',   // Amber
  warning: '#EF4444',   // Red
  mockup: '#F59E0B'     // Amber
};
```

---

**This completes the technical specification. You now have everything needed to implement the prototype.**
