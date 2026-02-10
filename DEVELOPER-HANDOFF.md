# 📦 Developer Handoff Package — Complete

**Project:** ADI Token Health Dashboard  
**Status:** Ready for Development  
**Timeline:** 2-3 weeks  
**Created:** February 2025

---

## 🎯 What You're Building

A **token health monitoring dashboard** for ADI Foundation stakeholders to understand the economic state of their utility token in institutional terms.

**NOT a trading tool.** This is for **governance-level decision making**.

---

## 📚 Documentation Structure

All docs are in `/docs/` folder. Read in this order:

### Step 1: Orientation (15 min)
📄 **DEVELOPER-HANDOFF.md** (this file)  
Quick overview of entire package.

### Step 2: Quick Start (10 min)
📄 **DEVELOPER-QUICK-START.md**  
Fast overview: stack, structure, timeline, success criteria.

### Step 3: Core Requirements (20 min)
📄 **PROMPT-developer.md**  
Main task definition, API response, component list.

### Step 4: Complete Technical Spec (45 min) ⭐
📄 **PROMPT-developer-ADDITION.md**  
**🔴 MOST CRITICAL DOCUMENT**  
Complete implementation details:
- All formulas and calculations
- Backend structure and code examples
- Frontend component patterns
- Config file structures
- Error handling
- Testing strategy
- Common pitfalls

### Step 5: Architecture (30 min)
📄 **03-development-plan.md**  
System architecture, component specs, API design.

### Step 6: Domain Knowledge (20 min)
📄 **01-state-classification-rules.md**  
Economic state definitions, thresholds, classification logic.

### Step 7: Design Reference (as needed)
📁 **docs/design/**
- UI-SPECIFICATION.md
- VISUAL-REFERENCE.md
- IMPLEMENTATION-GUIDE.md

---

## ⚙️ Configuration Files (Ready to Use)

All in `/config/` — no changes needed:

✅ **states_config.json** — 12 economic states mapping  
✅ **forces_mockup.json** — 5 forces with mockup flags  
✅ **transitions_mockup.json** — Transition probabilities  
✅ **vesting_schedule.json** — 9-year unlock timeline  
✅ **state_thresholds.json** — Classification thresholds

---

## 🏗️ Project Structure

```
adi-token-health/
├── backend/               # ← You create this
│   ├── main.py           # FastAPI app
│   ├── requirements.txt
│   └── README.md
│
├── frontend/             # ← You create this
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── components/
│   ├── package.json
│   └── README.md
│
├── config/               # ✅ Complete
│   └── *.json
│
├── docs/                 # ✅ Complete
│   ├── DEVELOPER-HANDOFF.md
│   ├── DEVELOPER-QUICK-START.md
│   ├── PROMPT-developer.md
│   ├── PROMPT-developer-ADDITION.md
│   └── design/
│
└── README.md             # ✅ Updated
```

---

## 🚀 Quick Start

### 1. Read Documentation (2-3 hours)
Start with DEVELOPER-QUICK-START.md, then PROMPT-developer-ADDITION.md.

### 2. Setup Backend (Day 1)
```bash
cd backend
pip install fastapi uvicorn httpx
python main.py
# Test: http://localhost:8000/api/data
```

### 3. Setup Frontend (Day 2)
```bash
cd frontend
npm create vite@latest . -- --template react
npm install recharts
npm run dev
# Open: http://localhost:5173
```

### 4. Build Components (Week 1-2)
Follow component specs in PROMPT-developer-ADDITION.md.

### 5. Test & Polish (Week 3)
Responsive testing, error handling, demo preparation.

---

## 🎯 Core Features

### Must Deliver

1. **State Card** — Current economic state with confidence %
2. **Metrics Row** — Price, Resistance, Next Unlock
3. **Force Map** — 5 forces visualization (2 real, 3 mockup)
4. **Transitions Panel** — 3 most likely state transitions
5. **Emission Chart** — Token unlock timeline

### Data Sources

**Real (from APIs):**
- Price, volume, change % (CoinGecko)
- Order book depth (Kraken)
- Market resistance (calculated)
- BTC correlation (calculated)

**Mockup (from config):**
- Utility demand force
- Market maker activity force
- Narrative force
- Transition probabilities

---

## 🔴 Critical Requirements

**Must have for successful demo:**

- ✅ Auto-refresh every 60 seconds
- ✅ Clear mockup indicators (amber ⚠️)
- ✅ Mobile responsive (375px+)
- ✅ Dark theme throughout
- ✅ Graceful error handling
- ✅ Category color coding (healthy/caution/warning)
- ✅ Works without internet (cached data)

---

## 📊 Single API Endpoint

```
GET /api/data
```

Returns complete dashboard state in one call:

```json
{
  "current_state": {
    "id": 2,
    "name": "Utility-обусловленная стабильность",
    "category": "healthy",
    "confidence_pct": 72,
    "description": "..."
  },
  "metrics": {
    "price": { "value": 0.95, "change_7d": 2.3 },
    "resistance": { "value": 47500, "unit": "USD" },
    "next_unlock": { "date": "2025-06-15", "amount": 50000000 }
  },
  "forces": [
    { "name": "Market Pressure", "value": -0.15, "is_mockup": false },
    { "name": "Utility Demand", "value": 0.30, "is_mockup": true }
  ],
  "transitions": [
    {
      "to_state_id": 1,
      "to_state_name": "Здоровое расширение",
      "probability": 0.35,
      "category": "healthy"
    }
  ],
  "emission_schedule": [...]
}
```

---

## 💡 Key Technical Decisions

### Backend
- **FastAPI** — Fast, modern, easy
- **Single main.py** — Prototype simplicity
- **60s cache** — Reduce API calls
- **No database** — In-memory only

### Frontend
- **React + Vite** — Fast dev experience
- **Tailwind CSS** — Quick styling
- **Recharts** — Simple charts
- **No state management** — Fetch + useState enough

### Architecture
- **Single-page app** — No routing needed
- **One API call** — Simplifies frontend
- **Config files** — Easy to update values
- **Dark theme** — Institutional aesthetic

---

## ⚠️ Important Constraints

### What This Is NOT

❌ Not a trading platform  
❌ Not real-time tick data  
❌ Not production-ready  
❌ Not multi-user system  
❌ Not mobile app  

### What This IS

✅ Governance monitoring tool  
✅ Educational prototype  
✅ Demo for stakeholders  
✅ Proof of concept  
✅ Foundation for future work  

---

## 🧪 Testing Checklist

### Backend
- [ ] CoinGecko API responds
- [ ] Kraken API responds
- [ ] Resistance calculation works
- [ ] Force calculations return valid values
- [ ] State classification selects correct state
- [ ] Cache reduces redundant API calls
- [ ] Error handling returns fallback data

### Frontend
- [ ] Initial load shows data
- [ ] Auto-refresh works (60s)
- [ ] Loading states display
- [ ] Error states display
- [ ] Mobile layout works (375px)
- [ ] Tablet layout works (768px)
- [ ] Desktop layout works (1024px+)
- [ ] Mockup indicators visible
- [ ] Category colors correct
- [ ] All components render

### Integration
- [ ] Full data flow works
- [ ] Network failure handled gracefully
- [ ] Can demo live without issues
- [ ] Stakeholder can understand display
- [ ] No console errors in production mode

---

## 📅 Timeline

### Week 1: Foundation
- Day 1-2: Backend with API integration
- Day 3: Frontend setup
- Day 4-5: Core components (StateCard, MetricsRow)

### Week 2: Features
- Day 6-7: Force map visualization
- Day 8-9: Transitions panel
- Day 10: Emission chart

### Week 3: Polish
- Day 11-12: Responsive design
- Day 13-14: Error handling
- Day 15: Demo preparation

**Total: 15 working days**

---

## 🎨 Design System

### Colors
- Background: `#0A0A0F`
- Cards: `#12121A`
- Text: `#E5E7EB`
- Healthy: `#10B981`
- Caution: `#F59E0B`
- Warning: `#EF4444`

### Typography
- Font: Inter (via Google Fonts)
- Headers: 600 weight
- Body: 400 weight
- Mono: 'Courier New' for numbers

### Spacing
- Card padding: 1.5rem
- Gap between sections: 1.5rem
- Mobile gap: 1rem

---

## 🆘 Common Issues

### "Can't fetch API data"
→ Check CORS middleware in backend  
→ Verify API endpoint URL  
→ Check browser console for errors

### "State not detecting correctly"
→ Review state_thresholds.json  
→ Check classification logic in backend  
→ Verify utility_score calculation

### "Force bars not showing"
→ Check value range (-1.0 to +1.0)  
→ Verify is_mockup flags  
→ Check ForceBar component props

### "Layout broken on mobile"
→ Use Tailwind responsive classes  
→ Test at exact 375px width  
→ Check flex-wrap and grid settings

---

## 🏆 Success Criteria

Dashboard is complete when:

✅ Stakeholder can open URL and see dashboard  
✅ Current state displays with clear category  
✅ All metrics show real data  
✅ Force map shows 5 bars with mockup warnings  
✅ Transitions show 3 possible next states  
✅ Emission timeline visible  
✅ Auto-refresh works every 60s  
✅ Works on mobile phone  
✅ Can be demoed live confidently  
✅ Stakeholder understands what they're seeing  

---

## 📞 Next Steps

1. **Read DEVELOPER-QUICK-START.md** (10 min)
2. **Read PROMPT-developer-ADDITION.md** (45 min)
3. **Setup development environment** (1 hour)
4. **Start backend implementation** (Day 1)
5. **Build frontend components** (Week 1-2)
6. **Test and polish** (Week 3)
7. **Prepare demo** (Last day)

---

## 💎 Pro Tips

- **Speed > Perfection** — It's a prototype
- **Visual clarity > Code elegance** — Stakeholders must understand
- **Real data first** — Get APIs working before polish
- **Test on mobile early** — Don't wait until end
- **Document deviations** — Note what you changed and why
- **Prepare for demo** — Test with live internet connection

---

## 📦 Final Deliverable

When complete, provide:

1. Working dashboard (localhost)
2. Setup instructions (README)
3. List of known limitations
4. Suggestions for production version
5. Demo notes (optional)

---

## 🎓 Learning Resources

If you need to learn any technology:

- **FastAPI:** https://fastapi.tiangolo.com/
- **React:** https://react.dev/
- **Tailwind:** https://tailwindcss.com/
- **Recharts:** https://recharts.org/

---

## ✅ You Have Everything

**Documentation:** Complete ✅  
**Config files:** Complete ✅  
**Design specs:** Complete ✅  
**Technical specs:** Complete ✅  
**Examples:** Complete ✅  

**You're ready to start building.**

---

## 🚀 Start Here

Open and read in this order:

1. **docs/DEVELOPER-QUICK-START.md**
2. **docs/PROMPT-developer-ADDITION.md**

Then start coding!

---

*Last updated: February 2025*  
*Project: ADI Token Health Dashboard*  
*Target: ADI Foundation Stakeholders*
