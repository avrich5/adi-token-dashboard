# ADI Token Health Dashboard — Development Plan (Simplified)

## This is a PROTOTYPE

**Goal:** Working demo in 2-3 weeks, not production system.

**Principle:** Minimal viable complexity. No over-engineering.

---

## Tech Stack (Simplified)

| Layer | Technology | Notes |
|-------|------------|-------|
| **Frontend** | React + Vite | Single page, no routing needed |
| **Styling** | Tailwind CSS | Use CDN for prototype |
| **Charts** | Recharts | Simple, React-native |
| **Backend** | Python + FastAPI | Single file is OK for prototype |
| **Storage** | JSON files | No database needed for MVP |

**Removed for prototype:**
- ❌ Redis (just use in-memory cache)
- ❌ SQLite (JSON files sufficient)
- ❌ Docker (run locally)
- ❌ WebSocket (polling every 60s is fine)
- ❌ TypeScript (plain JS faster for prototype)

---

## Architecture (Minimal)

```
Frontend (React)          Backend (FastAPI)           External
     │                          │                        │
     │  GET /api/data    ┌──────┴──────┐                │
     ├──────────────────►│  main.py    │◄───────────────┤ CoinGecko
     │                   │             │                │
     │  JSON response    │  - fetch    │◄───────────────┤ Kraken
     │◄──────────────────│  - calc     │                │
     │                   │  - classify │                │
     │                   │  - mockups  │◄───── JSON files (forces, transitions)
     │                   └─────────────┘                │
```

**One backend file** (`main.py`) handles everything:
- Fetch data from APIs
- Calculate metrics
- Classify state
- Load mockup data for forces & transitions
- Return JSON

**One API endpoint** for prototype:
- `GET /api/data` — returns everything dashboard needs

---

## API Response (Single Endpoint)

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
      {"id": "market_pressure", "name": "Market Pressure", "value": -0.3, "is_mockup": false},
      {"id": "emission_pressure", "name": "Emission Pressure", "value": -0.15, "is_mockup": false},
      {"id": "utility_demand", "name": "Utility Demand", "value": 0.2, "is_mockup": true},
      {"id": "mm_activity", "name": "MM Support", "value": 0.4, "is_mockup": true},
      {"id": "narrative", "name": "Narrative", "value": 0.1, "is_mockup": true}
    ],
    "net": 0.25,
    "interpretation": "Slight positive bias"
  },
  
  "transitions": [
    {"to_state": "Healthy Expansion", "probability": 0.35, "trigger": "Volume growth", "window": "2-4 weeks"},
    {"to_state": "Speculative Dominance", "probability": 0.15, "trigger": "BTC pump + FOMO", "window": "Days"},
    {"to_state": "Liquidity Stress", "probability": 0.05, "trigger": "MM exit", "window": "Hours"}
  ]
}
```

---

## Frontend Components (MVP)

```
App
├── Header (logo + last update time)
├── StateCard (current state + confidence)
├── MetricsRow
│   ├── PriceCard
│   ├── ResistanceCard  
│   └── EmissionCard
├── ForceMap (horizontal bar chart of forces)
├── ScenarioPanel (interactive sliders for forces) ← NEW
├── TransitionsPanel (list of possible next states)
└── EmissionChart (simple line chart)
```

**Note:** ScenarioPanel includes force adjustment sliders that trigger state recalculation.

---

## Scenario Modeling (What-If Analysis)

**Purpose:** Allow interactive exploration of "what happens if forces change?"

**Interface:** Simple sliders for each force

```
┌─────────────────────────────────────────────────────┐
│  Scenario Modeling                                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Adjust forces to see state changes:               │
│                                                     │
│  Market Pressure     [-1.0 ◄──●───► +1.0]  -0.30  │
│  Emission Pressure   [-1.0 ◄──●───► +1.0]  -0.15  │
│  Utility Demand      [-1.0 ◄────●─► +1.0]  +0.20  │
│  MM Support          [-1.0 ◄──────●► +1.0]  +0.40  │
│  Narrative           [-1.0 ◄────●─► +1.0]  +0.10  │
│                                                     │
│  Net Force: +0.25 ► (Slight positive bias)         │
│                                                     │
│  [Reset to Current]  [Apply Scenario]              │
│                                                     │
│  Projected State: Utility-Driven Stability (78%)   │
│  Changed transitions will update below ↓           │
└─────────────────────────────────────────────────────┘
```

**Implementation:**
1. User adjusts sliders → forces array changes
2. Frontend re-runs state classification logic (same as backend)
3. StateCard updates to show "projected" state
4. TransitionsPanel reloads transitions for new state
5. ForceMap reflects new force values
6. "Reset" button restores current real values

**Data sources for simulation:**
- `config/state_thresholds.json` - classification rules
- `config/transitions_mockup.json` - transitions for each state
- `config/vesting_schedule.json` - emission timeline for impact overlay

**Key insight:** No backend needed for scenario modeling - frontend can recalculate state using same simple IF-THEN rules from classification algorithm.

---

### ForceMap

**Visual:** Horizontal diverging bar chart (negative left, positive right)

```
Market Pressure    ████████░░░░░░░░░░░░  -0.30
Emission Pressure  ████░░░░░░░░░░░░░░░░  -0.15
Utility Demand     ░░░░░░░░░░░░████░░░░  +0.20  ⚠ mockup
MM Support         ░░░░░░░░░░░░████████  +0.40  ⚠ mockup
Narrative          ░░░░░░░░░░░░██░░░░░░  +0.10  ⚠ mockup
                   ─────────────────────
Net Force          ░░░░░░░░░░░░░███░░░░  +0.25 ►
```

**Colors:**
- Negative (red): `#EF4444`
- Positive (green): `#10B981`
- Mockup indicator (amber): `#F59E0B`

**Mockup indicator:** Yellow dot or "⚠" badge next to mockup values.

---

### TransitionsPanel

**Visual:** Cards or list showing possible next states

```
┌─────────────────────────────────────────────────────┐
│  Possible Transitions from "Utility-Driven Stability"  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐  ┌─────────────────┐          │
│  │ Healthy         │  │ Speculative     │          │
│  │ Expansion       │  │ Dominance       │          │
│  │                 │  │                 │          │
│  │ ████████░░ 35%  │  │ ███░░░░░░░ 15%  │          │
│  │                 │  │                 │          │
│  │ Trigger:        │  │ Trigger:        │          │
│  │ Volume growth   │  │ BTC pump        │          │
│  │                 │  │                 │          │
│  │ Window: 2-4 wks │  │ Window: Days    │          │
│  │ 🟢 Positive     │  │ 🟡 Caution      │          │
│  └─────────────────┘  └─────────────────┘          │
│                                                     │
│  ┌─────────────────┐                               │
│  │ Liquidity       │                               │
│  │ Stress          │                               │
│  │                 │                               │
│  │ █░░░░░░░░░  5%  │                               │
│  │                 │                               │
│  │ Trigger:        │                               │
│  │ MM exit         │                               │
│  │                 │                               │
│  │ Window: Hours   │                               │
│  │ 🔴 Warning      │                               │
│  └─────────────────┘                               │
│                                                     │
│  ⚠ Probabilities are illustrative estimates        │
└─────────────────────────────────────────────────────┘
```

**Transition card colors by target state category:**
- Healthy (green border): `#10B981`
- Caution (yellow border): `#F59E0B`  
- Warning (red border): `#EF4444`

---

## Core Algorithm (Simplified)

```python
def classify_state(metrics):
    """Simplified classification - just 4 priority checks"""
    
    # Critical: Liquidity Stress
    if metrics['resistance'] < 0.5:
        return {"id": 9, "name": "Liquidity Stress", "category": "warning"}
    
    # High volatility with speculation signals
    if metrics['btc_correlation'] > 0.7 and metrics['volatility_ratio'] > 1.5:
        return {"id": 3, "name": "Speculative Dominance", "category": "caution"}
    
    # Decline
    if metrics['price_change_30d'] < -0.15:
        return {"id": 12, "name": "Erosion Phase", "category": "warning"}
    
    # Default: Stable
    return {"id": 2, "name": "Utility-Driven Stability", "category": "healthy"}


def get_forces(metrics, mockup_data):
    """Combine real calculations with mockup data"""
    
    # Real: calculated from data
    market_pressure = -metrics['btc_change_7d'] * metrics['btc_correlation']
    emission_pressure = -metrics['next_unlock_pct'] / metrics['days_to_unlock'] * 10
    
    # Mockup: loaded from config
    return {
        "items": [
            {"id": "market_pressure", "name": "Market Pressure", 
             "value": round(market_pressure, 2), "is_mockup": False},
            {"id": "emission_pressure", "name": "Emission Pressure", 
             "value": round(emission_pressure, 2), "is_mockup": False},
            {"id": "utility_demand", "name": "Utility Demand", 
             "value": mockup_data['utility_demand'], "is_mockup": True},
            {"id": "mm_activity", "name": "MM Support", 
             "value": mockup_data['mm_activity'], "is_mockup": True},
            {"id": "narrative", "name": "Narrative", 
             "value": mockup_data['narrative'], "is_mockup": True},
        ],
        "net": sum of all values,
        "interpretation": interpret_net_force(net)
    }


def get_transitions(current_state_id, transitions_config):
    """Load transitions for current state from config"""
    
    state_transitions = transitions_config['transitions'].get(str(current_state_id), {})
    return state_transitions.get('possible_transitions', [])[:3]  # Top 3 only
```

---

## Config Files

### config/forces_mockup.json

Contains mockup values for forces that can't be calculated from public data:
- `utility_demand`: 0.2 (estimated)
- `mm_activity`: 0.4 (estimated)
- `narrative`: 0.1 (neutral)

See full file in `/config/forces_mockup.json`

### config/transitions_mockup.json

Contains transition probabilities for all 12 states:
- Each state has 3-4 possible transitions
- Each transition has: to_state, probability, trigger, cost, reversibility, window

See full file in `/config/transitions_mockup.json`

---

## Development Plan (2-3 weeks)

### Week 1: Backend + Basic Frontend

**Day 1-2:** Backend
- [ ] FastAPI setup (`main.py`)
- [ ] CoinGecko integration (price, volume)
- [ ] Kraken integration (order book)
- [ ] Resistance calculation
- [ ] Load mockup configs
- [ ] `/api/data` endpoint working

**Day 3-5:** Frontend
- [ ] React + Vite setup
- [ ] Tailwind (dark theme)
- [ ] Fetch data from backend
- [ ] StateCard component
- [ ] MetricsRow (Price, Resistance, Emission cards)

### Week 2: Forces, Transitions, Charts

**Day 6-7:** ForceMap
- [ ] Horizontal bar chart component
- [ ] Color coding (positive/negative)
- [ ] Mockup indicator badges

**Day 8-9:** TransitionsPanel
- [ ] Transition cards layout
- [ ] Probability bars
- [ ] Category color coding

**Day 10:** Emission Chart
- [ ] Load vesting schedule
- [ ] Simple timeline visualization

### Week 3: Scenario Modeling + Polish

**Day 11-12:** Scenario Modeling Interface
- [ ] Force adjustment sliders (5 forces, -1.0 to +1.0 range)
- [ ] Re-calculate state on slider change
- [ ] Update transitions panel with new state
- [ ] Show emission impact overlay
- [ ] Reset to current values button

**Day 13-15:** Polish
- [ ] Auto-refresh (60s interval)
- [ ] Loading states & error handling
- [ ] Mobile-friendly layout
- [ ] Full 12-state classification
- [ ] Scenario modeling UX refinement

---

## Files Structure

```
adi-token-health/
├── backend/
│   ├── main.py              # Single file backend
│   └── requirements.txt     # fastapi, httpx, uvicorn
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── StateCard.jsx
│   │   │   ├── MetricsCard.jsx
│   │   │   ├── ForceMap.jsx
│   │   │   ├── ScenarioPanel.jsx   # NEW: Force sliders
│   │   │   ├── TransitionsPanel.jsx
│   │   │   └── EmissionChart.jsx
│   │   ├── utils/
│   │   │   └── stateClassifier.js   # NEW: Client-side state logic
│   │   └── api.js
│   └── package.json
├── config/
│   ├── vesting_schedule.json
│   ├── state_thresholds.json
│   ├── forces_mockup.json      # NEW
│   └── transitions_mockup.json  # NEW
└── docs/
    └── ...
```

---

## Quick Start Commands

```bash
# Backend
cd backend
pip install fastapi httpx uvicorn
uvicorn main:app --reload

# Frontend  
cd frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```

---

## What's Real vs Mockup

| Component | Data Source | Status |
|-----------|-------------|--------|
| Price, Volume | CoinGecko API | ✅ Real |
| Order Book, Resistance | Kraken API | ✅ Real |
| Emission Schedule | vesting_schedule.json | ✅ Real (from docs) |
| State Classification | Calculated | ✅ Real (simplified) |
| Market Pressure force | Calculated from BTC | ✅ Real |
| Emission Pressure force | Calculated from schedule | ✅ Real |
| Utility Demand force | forces_mockup.json | ⚠️ Mockup |
| MM Support force | forces_mockup.json | ⚠️ Mockup |
| Narrative force | forces_mockup.json | ⚠️ Mockup |
| Transition probabilities | transitions_mockup.json | ⚠️ Mockup |

**Mockup data is clearly marked in UI** with amber indicators.

---

## Success Criteria for Prototype

✅ Dashboard loads and shows current state  
✅ Price and volume update every 60 seconds  
✅ Resistance calculated from real order book  
✅ Emission schedule displays correctly  
✅ Force map shows all 5 forces with mockup indicators  
✅ Transitions panel shows top 3 possible next states  
✅ Scenario modeling with force sliders works  
✅ State recalculation on slider adjustment  
✅ Transitions update based on scenario  
✅ Mobile-responsive dark theme  
✅ Can be demoed to stakeholders

---

## External API Details

### CoinGecko (Free, no key needed)

```
GET https://api.coingecko.com/api/v3/coins/adi-token
```

Rate limit: 10-30 calls/min. Cache response for 60s.

### Kraken (Public, no key needed)

```
GET https://api.kraken.com/0/public/Depth?pair=ADIUSD&count=50
```

Rate limit: 1 call/sec. Cache for 30s.

---

*Document version: 0.4 (added Scenario Modeling interface with force sliders, updated timeline to 3 weeks)*
