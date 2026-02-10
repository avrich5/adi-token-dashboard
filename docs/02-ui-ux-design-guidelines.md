# ADI Token Health Dashboard — UI/UX Design Guidelines

## Document Purpose

This document provides visual design specifications for UI/UX designers creating the ADI Token Health Dashboard. The design must align with ADI Foundation's corporate identity while serving the functional requirements of a real-time token monitoring system.

---

## 1. ADI Foundation Brand Analysis

### 1.1 Brand Positioning

ADI Foundation positions itself as:
- **Institutional-grade** blockchain infrastructure
- **Government and enterprise** focused (not retail crypto)
- **Compliance-first** approach
- **Emerging markets** enabler (Middle East, Africa, Asia)

**Key message:** "A different idea of the blockchain"

**Tone:** Professional, trustworthy, sophisticated, forward-looking

### 1.2 Visual Identity Elements (from adi.foundation)

#### Color Palette

| Color | Usage | Hex (approximate) |
|-------|-------|-------------------|
| **Deep Navy/Black** | Primary background | `#0A0A0F` - `#12121A` |
| **White** | Primary text, logos | `#FFFFFF` |
| **Electric Blue/Cyan** | Accents, CTAs, highlights | `#00D4FF` - `#0099FF` |
| **Gradient Blue** | Hero sections, emphasis | Linear gradient from cyan to blue |
| **Muted Gray** | Secondary text, borders | `#6B7280` - `#9CA3AF` |

#### Typography

- **Headlines:** Clean, modern sans-serif (appears to be Inter or similar)
- **Body:** Same family, lighter weights
- **Style:** Generous letter-spacing on headlines, clean hierarchy

#### Visual Language

- **Dark mode first** — primary interface is dark
- **Minimalist** — generous whitespace, clean lines
- **Grid patterns** — subtle geometric background elements
- **Cards** — content organized in rounded-corner cards with subtle borders
- **Gradients** — subtle blue gradients for depth and emphasis
- **Icons** — minimal, line-style icons

### 1.3 Key Design Principles from ADI Brand

1. **Institutional trust** — design must feel like Bloomberg/Reuters, not Binance
2. **Clarity over decoration** — information density without clutter
3. **Dark theme** — aligns with professional trading/monitoring tools
4. **Blue accents** — trust, technology, stability
5. **No crypto-kitsch** — no rockets, moons, or gambling aesthetics

---

## 2. Dashboard Design Specifications

### 2.1 Layout Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo + Navigation + Time Layer Selector                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│  │                     │  │                                 │  │
│  │   CURRENT STATE     │  │      MARKET RESISTANCE          │  │
│  │   (Primary KPI)     │  │      (Central Metric)           │  │
│  │                     │  │                                 │  │
│  └─────────────────────┘  └─────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              EMISSION SCHEDULE TIMELINE                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│  │                     │  │                                 │  │
│  │    FORCE MAP        │  │    STATE TRANSITIONS            │  │
│  │    (Balance)        │  │    (Probabilities)              │  │
│  │                     │  │                                 │  │
│  └─────────────────────┘  └─────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              SCENARIO ANALYSIS PANEL                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Time Layer Navigation

Three distinct views accessible via tab/toggle:

| Layer | Label | Focus |
|-------|-------|-------|
| **Strategic** | "9-Year View" | Full vesting schedule, capacity planning |
| **Tactical** | "90-Day View" | Upcoming unlocks, scenario planning |
| **Operational** | "Real-Time" | Current state, live resistance, alerts |

**Design:** Segmented control or tab bar, always visible in header

### 2.3 Component Specifications

#### 2.3.1 Current State Card (Primary KPI)

**Purpose:** Show current economic state at a glance

**Elements:**
- State name (large, bold)
- State icon/indicator
- Confidence level (percentage or bar)
- Time in current state
- "Data completeness" indicator (shows if classification is presumptive)

**Visual:**
```
┌────────────────────────────────────┐
│  CURRENT STATE                     │
│                                    │
│  ● Utility-Driven Stability        │
│                                    │
│  Confidence: 78%  ████████░░       │
│  Duration: 14 days                 │
│                                    │
│  ⚠ Based on partial data          │
└────────────────────────────────────┘
```

**State color coding:**
- Green states (1, 2, 5): Healthy
- Yellow states (3, 6, 10, 11): Caution
- Red states (4, 7, 8, 9, 12): Warning

#### 2.3.2 Market Resistance Widget

**Purpose:** Central metric showing market's ability to absorb pressure

**Elements:**
- Current resistance value (large number)
- Trend indicator (↑↓→)
- Asymmetry visualization (buy vs sell pressure)
- Historical comparison (vs 7d/30d average)
- Depth chart mini-visualization

**Visual:**
```
┌────────────────────────────────────────────────┐
│  MARKET RESISTANCE                             │
│                                                │
│       2.34x ↑                                  │
│  ───────────────────────────────               │
│  Daily volumes needed to move price 5%        │
│                                                │
│  Buy Pressure  ████████████░░░░  Sell Pressure│
│       62%                            38%      │
│                                                │
│  vs 7d avg: +12%   vs 30d avg: -8%           │
└────────────────────────────────────────────────┘
```

#### 2.3.3 Emission Schedule Timeline

**Purpose:** Visualize upcoming and historical token unlocks

**Elements:**
- Timeline with markers for unlock events
- Current position indicator
- Unlock size bubbles (proportional to volume)
- Category color coding (team, investors, community, etc.)
- Zoom controls for different time ranges

**Visual approach:**
- Horizontal timeline
- Vertical bars for unlock events
- Color-coded by allocation category
- Hover for details

#### 2.3.4 Force Map

**Purpose:** Show balance of forces affecting token

**Elements:**
- Radar/spider chart or force diagram
- Forces: Market pressure, Utility demand, Emission pressure, MM activity, Narrative
- Each force has direction (positive/negative) and magnitude
- Net force indicator

**Visual approach:**
- Radial diagram with center = equilibrium
- Arrows showing force direction and strength
- Color: green for supportive, red for pressure

#### 2.3.5 State Transitions Panel

**Purpose:** Show probable next states and transition costs

**Elements:**
- Current state (center)
- Possible next states (connected)
- Probability percentages
- Transition attributes (trigger, cost, reversibility, window)

**Visual approach:**
- Node-link diagram or Sankey-style flow
- Line thickness = probability
- Click to expand transition details

#### 2.3.6 Scenario Analysis Panel

**Purpose:** What-if analysis for planning

**Elements:**
- Scenario selector (predefined + custom)
- Input parameters (sliders for market moves, unlock timing)
- Output projections (state change, resistance impact)
- Comparison view (current vs scenario)

---

## 3. Design System Specifications

### 3.1 Color Tokens

```css
/* Background */
--bg-primary: #0A0A0F;
--bg-secondary: #12121A;
--bg-card: #1A1A24;
--bg-card-hover: #22222E;

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #9CA3AF;
--text-muted: #6B7280;

/* Accent */
--accent-primary: #00D4FF;
--accent-secondary: #0099FF;
--accent-gradient: linear-gradient(135deg, #00D4FF 0%, #0066FF 100%);

/* Semantic */
--state-healthy: #10B981;
--state-caution: #F59E0B;
--state-warning: #EF4444;
--state-neutral: #6B7280;

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.1);
--border-accent: rgba(0, 212, 255, 0.3);
```

### 3.2 Typography Scale

```css
/* Font Family */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Size Scale */
--text-xs: 0.75rem;    /* 12px - labels, metadata */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - emphasis */
--text-xl: 1.25rem;    /* 20px - card titles */
--text-2xl: 1.5rem;    /* 24px - section headers */
--text-3xl: 1.875rem;  /* 30px - primary KPIs */
--text-4xl: 2.25rem;   /* 36px - hero numbers */

/* Weight */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 3.3 Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

### 3.4 Component Styles

#### Cards
```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
}

.card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-accent);
}
```

#### Buttons
```css
.btn-primary {
  background: var(--accent-gradient);
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-semibold);
}

.btn-secondary {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
  border-radius: 8px;
}
```

#### Data Display
```css
.kpi-value {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.kpi-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### 3.5 Charts and Visualizations

**Library recommendation:** D3.js or Plotly (dark theme compatible)

**Chart styling:**
- Background: transparent (inherits card background)
- Grid lines: `rgba(255, 255, 255, 0.05)`
- Axis labels: `var(--text-muted)`
- Data lines: `var(--accent-primary)` or semantic colors
- Area fills: gradient with low opacity

---

## 4. Responsive Behavior

### 4.1 Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### 4.2 Layout Adaptation

| Viewport | Layout |
|----------|--------|
| < 768px | Single column, stacked cards |
| 768px - 1024px | 2-column grid |
| 1024px - 1536px | Primary layout (as shown) |
| > 1536px | Expanded with more detail panels |

### 4.3 Mobile Considerations

- Time layer selector becomes bottom tab bar
- Cards stack vertically
- Charts simplified (less detail)
- Touch-friendly tap targets (min 44px)

---

## 5. Interaction Patterns

### 5.1 Real-Time Updates

- New data: subtle pulse animation on updated values
- State change: card border glow + notification
- Alert: slide-in notification panel

### 5.2 Hover States

- Cards: slight background lighten + border accent
- Chart points: tooltip with detailed data
- Timeline events: expanded info popup

### 5.3 Loading States

- Skeleton screens matching card layouts
- Subtle shimmer animation
- No spinners (feels dated)

### 5.4 Error States

- Inline error messages (not modal)
- Fallback data indication
- Retry action available

---

## 6. Accessibility Requirements

- Contrast ratio: minimum 4.5:1 for text
- Focus indicators: visible ring on interactive elements
- Screen reader: ARIA labels for charts and dynamic content
- Keyboard navigation: full support
- Color-blind friendly: don't rely solely on color (add icons/patterns)

---

## 7. Deliverables Checklist

For UI/UX designer:

- [ ] High-fidelity mockups for all three time layers
- [ ] Component library in Figma
- [ ] Interactive prototype for key flows
- [ ] Responsive variants (mobile, tablet, desktop)
- [ ] Dark theme specifications (primary)
- [ ] Light theme variant (optional, for accessibility)
- [ ] Animation specifications
- [ ] Icon set (consistent with ADI brand)

---

## 8. Reference Links

- ADI Foundation website: https://www.adi.foundation/
- ADI Token page: https://token.adi.foundation/
- ADI Documentation: https://docs.adi.foundation/

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2025-02-10 | Initial specification based on brand analysis |
