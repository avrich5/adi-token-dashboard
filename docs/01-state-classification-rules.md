# ADI Token State Classification Rules

## Overview

This document defines the rules for classifying the current economic state of the $ADI token based on publicly available metrics. The classification system identifies which of 12 base economic states the token is currently in.

## Available Metrics (Public Sources)

### Price & Volume (CoinGecko/CMC)

| Metric | Source | Update Frequency |
|--------|--------|------------------|
| Price (USD) | CoinGecko API | 1-5 min |
| Price change % (24h, 7d, 30d) | CoinGecko API | 1-5 min |
| Volume 24h | CoinGecko API | 1-5 min |
| Volume change % | Calculated | 1-5 min |
| Market cap | CoinGecko API | 1-5 min |
| Circulating supply | CoinGecko API | Daily |

### Market Structure (CEX Order Books)

| Metric | Source | Update Frequency |
|--------|--------|------------------|
| Bid/ask spread % | Kraken/KuCoin API | 1 min |
| Order book depth (± 2%, ± 5%, ± 10%) | Kraken/KuCoin API | 1 min |
| Bid/ask asymmetry | Calculated | 1 min |

### Derived Metrics

| Metric | Formula | Description |
|--------|---------|-------------|
| Resistance | `depth / avg_daily_volume` | How many daily volumes needed to move price |
| Volatility | `ATR` or `std_dev(returns, 14d)` | Price movement intensity |
| Volume trend | `volume_now / volume_MA_7d` | Current volume vs average |
| BTC correlation | `corr(ADI_returns, BTC_returns, 7d)` | Market dependency |

### Emission Context

| Metric | Source | Description |
|--------|--------|-------------|
| Days to next unlock | Vesting schedule | Countdown to emission event |
| Next unlock size | Vesting schedule | % of circulating supply |
| 90-day unlock pressure | Calculated | Sum of unlocks in next 90 days |

---

## Threshold Values

These thresholds require calibration on real data. Initial values based on general crypto market behavior:

| Metric | Low | Medium | High | Critical |
|--------|-----|--------|------|----------|
| Resistance | < 0.5 | 0.5-1.5 | 1.5-3.0 | > 3.0 |
| Spread % | > 1% | 0.3-1% | < 0.3% | — |
| BTC correlation | < 0.3 | 0.3-0.6 | > 0.6 | > 0.85 |
| Volatility (vs MA) | < 0.7x | 0.7-1.3x | 1.3-2x | > 2x |
| Volume (vs MA) | < 0.5x | 0.5-1.5x | 1.5-3x | > 3x |
| Price change 7d | < -10% | -10% to +10% | > +10% | > +25% |

---

## State Definitions

### State 1: Healthy Utility Expansion

**Description:** Organic growth driven by real usage of the token within the ecosystem.

**Entry Conditions:**
```
price_change_7d >= 0
volume > volume_MA_7d * 1.2
resistance > 2.0
btc_correlation < 0.5
volatility <= volatility_MA * 1.3
```

**Key Indicator:** Volume growth with low BTC correlation = organic demand

**Placeholder Data Needed:**
- On-chain utility metrics (gas consumption, transaction count)
- Without this, classification is presumptive

---

### State 2: Utility-Driven Stability

**Description:** Stable equilibrium supported by consistent utility usage.

**Entry Conditions:**
```
abs(price_change_7d) < 5%
0.8 < volume/volume_MA_7d < 1.2
resistance > 2.0
volatility < volatility_MA * 0.7
btc_correlation < 0.6
```

**Key Indicator:** Stability with high Resistance = sustainable equilibrium

**Placeholder Data Needed:**
- Utility data to confirm stability comes from usage, not lack of interest

---

### State 3: Speculative Dominance

**Description:** Price driven by speculation rather than fundamentals.

**Entry Conditions:**
```
price_change_7d > 15%
volume > volume_MA_7d * 2
btc_correlation > 0.7
volatility > volatility_MA * 1.5
resistance_change_7d < 0 (falling)
```

**Key Indicator:** Price rise + BTC correlation rise + falling Resistance = speculative bubble

**Placeholder Data Needed:**
- Social sentiment
- Derivatives funding rates

---

### State 4: Utility-Market Divergence

**Description:** Token price moves independently of broader market, driven by internal factors.

**Entry Conditions:**
```
price_change_7d < -10%
volume_trend < 1.0 (low or falling)
btc_correlation < 0.3 (ADI moves opposite to market)
```

**Key Indicator:** Movement against market = internal factors dominate

**Placeholder Data Needed:**
- Utility metrics to understand divergence direction:
  - Utility up + price down = opportunity
  - Utility down + price down = problem

---

### State 5: Liquidity-Driven Expansion

**Description:** Price supported by newly added liquidity rather than organic demand.

**Entry Conditions:**
```
price_change_7d > 0
resistance_change_7d > 20%
bid_ask_asymmetry > 1.3 (more bids)
volume can be low
```

**Key Indicator:** Resistance growth outpaces price growth = someone added liquidity (MM, Treasury, whale)

**Placeholder Data Needed:**
- MM activity data
- Treasury operations

---

### State 6: Incentive-Driven Usage

**Description:** Activity driven by reward programs rather than organic utility.

**Entry Conditions:**
```
volume_trend > 1.5
price_trend: stable or slightly up
incentive_program_active = true
```

**Key Indicator:** Activity tied to incentive calendar

**Placeholder Data Needed:**
- Staking program data
- Incentive campaign schedules
- **Without this data, state cannot be detected**

---

### State 7: Incentive Misalignment

**Description:** Incentive programs failing to retain value — rewards sold immediately.

**Entry Conditions:**
```
incentive_program_active = true
price_change_7d < 0 OR resistance_change_7d < 0
volume can be high (selling pressure)
```

**Key Indicator:** Incentives not holding — tokens sold immediately after receipt

**Placeholder Data Needed:**
- Staking/unstaking data
- Reward distribution timing

---

### State 8: Utility Degradation

**Description:** Sustained decline in all metrics without external shock.

**Entry Conditions:**
```
price_change_30d < -20%
volume_trend < 0.8 (falling)
resistance < 1.5 AND resistance_trend < 0
no_external_shock = true
```

**Key Indicator:** Sustained decline in all metrics without external cause

**Placeholder Data Needed:**
- On-chain activity decline for confirmation

---

### State 9: Liquidity Stress

**Description:** Thin liquidity causes disproportionate price impact from small orders.

**Entry Conditions:**
```
resistance < 0.5
spread > 1%
order_book_depth: thin on both sides
volatility > volatility_MA * 2
```

**Key Indicator:** Small volume moves price disproportionately

**Placeholder Data Needed:**
- MM status (disconnected?)

**Priority:** HIGH — this state overrides other classifications when active

---

### State 10: Narrative-Driven Volatility

**Description:** Chaotic price movements driven by news/social narratives without fundamental driver.

**Entry Conditions:**
```
volatility > volatility_MA * 2
volume > volume_MA_7d * 2
price: sharp movements in both directions
no_clear_trend = true (chaotic)
```

**Key Indicator:** Chaotic movements without fundamental driver

**Placeholder Data Needed:**
- News/social sentiment to confirm narrative driver

---

### State 11: Structural Transition

**Description:** System transitioning from one stable regime to another.

**Entry Conditions:**
```
multiple_metrics_changing_regime = true
abs(resistance_change_7d) > 30%
abs(btc_correlation_change) > 0.3
previous_state_duration > 14 days
```

**Key Indicator:** System transitioning between stable regimes

**Placeholder Data Needed:**
- Historical data on previous transitions for calibration

**Priority:** HIGH — indicates regime change in progress

---

### State 12: Erosion Phase

**Description:** Slow decay without capitulation — gradual loss of interest and value.

**Entry Conditions:**
```
price_trend: sustained decline > 30 days
volume_trend: sustained decline
resistance < 1.0
no_reversal_signals = true
```

**Key Indicator:** Slow decay without capitulation

**Placeholder Data Needed:**
- Long-term holder behavior
- Whale movements

---

## Classification Priority Logic

States are not mutually exclusive. When multiple states match, use this priority:

```
Priority 1: Liquidity Stress (State 9)
  → If Resistance is critical, this overrides everything

Priority 2: Structural Transition (State 11)
  → If metrics are in rapid regime change

Priority 3: Speculative Dominance (State 3)
  → If high correlation + growth + volatility

Priority 4: All others
  → Best match based on condition overlap
```

## Classification Algorithm

```python
def classify_state(metrics: dict) -> tuple[int, str, float]:
    """
    Returns: (state_number, state_name, confidence_score)
    """
    
    # Priority 1: Check for Liquidity Stress
    if metrics['resistance'] < 0.5 and metrics['spread'] > 0.01:
        return (9, "Liquidity Stress", 0.9)
    
    # Priority 2: Check for Structural Transition
    if (abs(metrics['resistance_change_7d']) > 0.3 and 
        abs(metrics['btc_correlation_change']) > 0.3):
        return (11, "Structural Transition", 0.8)
    
    # Priority 3: Check for Speculative Dominance
    if (metrics['price_change_7d'] > 0.15 and 
        metrics['btc_correlation'] > 0.7 and
        metrics['volatility_ratio'] > 1.5):
        return (3, "Speculative Dominance", 0.85)
    
    # Continue with other states...
    # (Full implementation in codebase)
    
    return (0, "Unclassified", 0.0)
```

---

## Data Gaps and Placeholders

| Data Type | Status | Impact on Classification |
|-----------|--------|-------------------------|
| On-chain utility (gas, tx) | NOT AVAILABLE | States 1, 2, 4, 8 are presumptive |
| Staking program data | NOT AVAILABLE | States 6, 7 cannot be detected |
| MM activity | NOT AVAILABLE | States 5, 9 partially blind |
| Social sentiment | NOT AVAILABLE | States 3, 10 less accurate |
| Treasury operations | NOT AVAILABLE | State 5 partially blind |

**Visualization Requirement:** Dashboard must clearly indicate which classifications are "confirmed" vs "presumptive" based on data availability.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2025-02-10 | Initial draft based on public data analysis |
