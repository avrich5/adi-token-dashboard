## 🧪 Backend Testing - Phase 1

### Test Started: 2025-02-10

---

### Step 1: Environment Setup

**Commands to run:**

```bash
cd /Users/andriy/VisualStudio/adi-token-health/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Expected output:**
- Virtual environment created
- All 5 packages installed successfully

**Status:** ⏳ PENDING

---

### Step 2: Start Server

**Command to run:**
```bash
python main.py
```

**Expected output:**
```
✅ All configuration files loaded successfully
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Status:** ⏳ PENDING

---

### Step 3: Test Health Endpoint

**Command to run (in new terminal):**
```bash
curl http://localhost:8000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-02-10T..."
}
```

**Status:** ⏳ PENDING

---

### Step 4: Test Main Data Endpoint

**Command to run:**
```bash
curl http://localhost:8000/api/data | python -m json.tool
```

**Expected response structure:**
```json
{
  "timestamp": "...",
  "current_state": {
    "id": 1-12,
    "name": "...",
    "category": "healthy|caution|warning",
    "description": "..."
  },
  "metrics": {
    "price_usd": 0.xx,
    "volume_24h": xxxxx,
    "market_cap": xxxxx,
    "resistance": x.xx,
    "price_change_7d": 0.xx,
    "price_change_30d": 0.xx
  },
  "forces": {
    "market_pressure": {...},
    "emission_pressure": {...},
    "utility_demand": {...},
    "mm_activity": {...},
    "narrative_strength": {...}
  },
  "transitions": [
    {
      "to_state": x,
      "probability": 0.xx,
      "triggers": [...],
      "target_state_name": "...",
      "target_state_category": "..."
    }
  ],
  "metadata": {...}
}
```

**Status:** ⏳ PENDING

---

### Step 5: Test Scenario Endpoint

**Command to run:**
```bash
curl -X POST http://localhost:8000/api/scenario \
  -H "Content-Type: application/json" \
  -d '{
    "adjusted_forces": {
      "market_pressure": 0.8,
      "utility_demand": -0.5
    }
  }' | python -m json.tool
```

**Expected response:**
- Different state classification based on adjusted forces
- Updated transitions
- `forces_modified: ["market_pressure", "utility_demand"]`

**Status:** ⏳ PENDING

---

### Issues Found:
*None yet - awaiting test execution*

---

### Notes:
- Make sure ports 8000 is free
- If CoinGecko API fails, check rate limits
- If Kraken API fails, check if ADI pair exists (may need fallback)

---

**Last Updated:** Starting backend tests
### Test Results Update:

#### ✅ Step 1: Environment Setup - PASSED
- Virtual environment created successfully
- All dependencies installed (took ~4 minutes due to C-extension compilation)

#### ✅ Step 2: Server Startup - PASSED (with port change)
- Port 8000 was occupied by another service
- Changed to port 8002
- Server started successfully
- Message: "✅ All configuration files loaded successfully"

#### ✅ Step 3: Health Check - PASSED
```json
{
  "status": "healthy",
  "timestamp": "2026-02-10T10:44:39.006473"
}
```

#### ❌ Step 4: Main Data Endpoint - FAILED (Expected)
**Error:** CoinGecko 404 - Token ID "adi-foundation" not found

**Root Cause:** ADI token не найден на CoinGecko под этим ID

**Possible Solutions:**
1. Find correct CoinGecko ID for ADI token
2. Add fallback to mockup data when API fails
3. Use different data source (e.g., CoinMarketCap)

**Current Server Status:** ✅ Running on http://localhost:8002

---

### Next Actions Required:
🔴 **BLOCKER:** Need correct CoinGecko token ID or decision to use mockup fallback

Options:
- A) Provide correct token ID
- B) Implement fallback to mockup price data
- C) Skip external APIs for now and use full mockup

**Recommendation:** Option B - Add graceful fallback to mockup data for demo purposes

