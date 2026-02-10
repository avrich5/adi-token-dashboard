# Starter Prompt for Designer

## Context

You are designing a dashboard for monitoring token health. The token is ADI — a utility token for Abu Dhabi's digital economy infrastructure.

**Target user:** Token management team (not traders, not retail users).

**Purpose:** Show current economic state of the token and factors affecting it.

## Reference Document

Read the attached `02-ui-ux-design-guidelines.md` for full design system details.

## Task

Design a single desktop dashboard screen (1440px width) with these components:

### 1. Header
- Logo placeholder (left)
- "Last updated: 2 min ago" (right)
- Dark background

### 2. StateCard (Hero section)
- Large state name: "Utility-Driven Stability"
- State category badge: "Healthy" (green)
- Confidence indicator: 78%
- Brief description (1 line)

### 3. MetricsRow (3 cards in a row)

**PriceCard:**
- Current price: $2.61
- 24h change: +8.6% (green arrow)
- 7d change: +13.2%
- Small sparkline optional

**ResistanceCard:**
- Market Resistance: 2.34
- Label: "Moderate"
- Asymmetry indicator: 0.62
- Tooltip: "Dollars needed to move price 1%"

**EmissionCard:**
- Circulating: 5.1%
- Next unlock: 45 days
- Next unlock size: 2.3%

### 4. ForceMap (NEW)

Horizontal diverging bar chart showing 5 forces affecting the token:

```
Market Pressure    ████████░░░░░░░░░░░░  -0.30
Emission Pressure  ████░░░░░░░░░░░░░░░░  -0.15
Utility Demand     ░░░░░░░░░░░░████░░░░  +0.20  ⚠
MM Support         ░░░░░░░░░░░░████████  +0.40  ⚠
Narrative          ░░░░░░░░░░░░██░░░░░░  +0.10  ⚠
─────────────────────────────────────────────────
Net Force          ░░░░░░░░░░░░░███░░░░  +0.25 ►
```

**Design notes:**
- Bars extend left (negative/red) or right (positive/green) from center
- Values range from -1.0 to +1.0
- Amber warning icon (⚠) marks mockup data
- "Net Force" row at bottom shows sum
- Subtle tooltip on hover explaining each force

### 5. TransitionsPanel (NEW)

Shows 3 cards for possible next states:

**Card layout:**
```
┌─────────────────────┐
│ Healthy Expansion   │  ← State name
│                     │
│ ████████░░░░ 35%    │  ← Probability bar
│                     │
│ Trigger:            │
│ Volume growth       │  ← What causes this
│                     │
│ Window: 2-4 weeks   │  ← Timeframe
│                     │
│ 🟢                  │  ← Category indicator
└─────────────────────┘
```

**3 transition cards with data:**

| State | Probability | Trigger | Window | Category |
|-------|-------------|---------|--------|----------|
| Healthy Expansion | 35% | Volume growth | 2-4 weeks | 🟢 Positive |
| Speculative Dominance | 15% | BTC pump + FOMO | Days | 🟡 Caution |
| Liquidity Stress | 5% | MM exit | Hours | 🔴 Warning |

**Design notes:**
- Cards have colored left border matching category
- Small disclaimer at bottom: "⚠ Probabilities are illustrative estimates"
- Green/Yellow/Red category dots

### 6. EmissionChart
- Simple line chart showing vesting schedule
- X-axis: months (2024-2033)
- Y-axis: cumulative % released
- Current position marker
- Next unlock highlighted

## Color Scheme

| Element | Color |
|---------|-------|
| Background | `#0A0A0F` |
| Card background | `#12121A` |
| Primary accent | `#00D4FF` (cyan) |
| Positive/Healthy | `#10B981` (green) |
| Caution | `#F59E0B` (amber) |
| Warning/Negative | `#EF4444` (red) |
| Text primary | `#FFFFFF` |
| Text secondary | `#9CA3AF` |
| Mockup indicator | `#F59E0B` (amber) |

## Layout Suggestion

```
┌────────────────────────────────────────────────────────┐
│  Header                                                │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │              StateCard (hero)                    │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐         │
│  │   Price   │  │ Resistance│  │  Emission │         │
│  └───────────┘  └───────────┘  └───────────┘         │
│                                                        │
│  ┌─────────────────────┐  ┌────────────────────────┐  │
│  │     ForceMap        │  │   TransitionsPanel     │  │
│  │                     │  │  ┌────┐ ┌────┐ ┌────┐  │  │
│  │  ▓▓▓▓░░░░░░ -0.30  │  │  │    │ │    │ │    │  │  │
│  │  ▓▓░░░░░░░░ -0.15  │  │  │35% │ │15% │ │ 5% │  │  │
│  │  ░░░░░░░▓▓░ +0.20  │  │  │    │ │    │ │    │  │  │
│  │  ░░░░░░▓▓▓▓ +0.40  │  │  └────┘ └────┘ └────┘  │  │
│  │  ░░░░░░░▓░░ +0.10  │  │                        │  │
│  └─────────────────────┘  └────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │              EmissionChart                       │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Deliverable

Figma file or exported PNG/PDF with:
- Full dashboard at 1440px width
- Component variants for different states (if time permits)
- Basic responsive considerations noted

## Important Notes

- This is a management tool, not a trading app
- Dark theme is mandatory
- Mockup data must be visually distinguished (amber indicators)
- Clean, minimal, professional look
- No decorative elements or unnecessary visuals
