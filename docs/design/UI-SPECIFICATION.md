# ADI Token Health Dashboard — UI/UX Specification

## Design Principles

### 1. Institutional Trust & Clarity
- **NOT** trading signals or speculation aesthetics
- **YES** governance-level economic intelligence
- Clean, professional, data-dense but readable
- Clear hierarchy: what's real vs estimated

### 2. Visual Language
- **Dark theme** — reduces eye strain for long analysis sessions
- **Minimal color** — only semantic (red/amber/green for states)
- **Typography** — clear hierarchy, institutional feel
- **Data density** — maximize information, minimize decoration

### 3. Explainability First
- Every metric has clear label and unit
- Mockup data explicitly marked with amber indicator
- State transitions show reasoning (trigger, window, probability)
- Forces show directionality and magnitude

---

## Color System

### Base Colors
```css
--bg-primary:     #0A0A0F  /* Main background */
--bg-secondary:   #12121A  /* Cards, panels */
--bg-tertiary:    #1A1A24  /* Elevated elements */

--text-primary:   #FFFFFF  /* Headers, important text */
--text-secondary: #9CA3AF  /* Body text, labels */
--text-tertiary:  #6B7280  /* Muted text, timestamps */

--border-subtle:  #1F2937  /* Card borders */
--border-medium:  #374151  /* Interactive borders */
```

### Semantic Colors
```css
--state-healthy:  #10B981  /* Green — stable, growth states */
--state-caution:  #F59E0B  /* Amber — speculative, transition */
--state-warning:  #EF4444  /* Red — stress, degradation */

--force-positive: #10B981  /* Green bars */
--force-negative: #EF4444  /* Red bars */

--accent-primary: #00D4FF  /* Cyan — highlights, links */
--mockup-badge:   #F59E0B  /* Amber — mockup indicator */
```

### Color Usage Rules

**State Categories:**
- `healthy` → `--state-healthy` (#10B981)
- `caution` → `--state-caution` (#F59E0B)
- `warning` → `--state-warning` (#EF4444)

**Forces:**
- Positive values → `--force-positive` bars extending right
- Negative values → `--force-negative` bars extending left
- Mockup forces → amber dot indicator next to label

**Transitions:**
- Border color matches target state category
- Probability bar uses category color at 60% opacity

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Use [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts (CDN):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

```css
/* Headers */
.text-hero:    font-size: 48px; font-weight: 700; line-height: 1.1;
.text-h1:      font-size: 32px; font-weight: 700; line-height: 1.2;
.text-h2:      font-size: 24px; font-weight: 600; line-height: 1.3;
.text-h3:      font-size: 20px; font-weight: 600; line-height: 1.4;

/* Body */
.text-body-lg: font-size: 16px; font-weight: 400; line-height: 1.5;
.text-body:    font-size: 14px; font-weight: 400; line-height: 1.5;
.text-body-sm: font-size: 12px; font-weight: 400; line-height: 1.4;

/* Labels */
.text-label:   font-size: 13px; font-weight: 500; line-height: 1.4;
.text-caption: font-size: 11px; font-weight: 400; line-height: 1.3;

/* Monospace (for numbers, codes) */
.text-mono:    font-family: 'SF Mono', 'Consolas', monospace;
               font-size: 14px;
```

### Typography Usage

- **State name** → `text-hero` + state category color
- **Card headers** → `text-h3` + `text-primary`
- **Metric values** → `text-h2` + `text-mono` + `text-primary`
- **Metric labels** → `text-label` + `text-secondary`
- **Force names** → `text-body` + `text-primary`
- **Force values** → `text-mono` + `text-primary`
- **Transition text** → `text-body-sm` + `text-secondary`
- **Timestamps** → `text-caption` + `text-tertiary`

---

## Spacing System

Use 4px base unit:

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

### Spacing Rules

- **Card padding:** `--space-6` (24px)
- **Card gap:** `--space-4` (16px)
- **Section gap:** `--space-8` (32px)
- **Element gap:** `--space-3` (12px)
- **Text spacing:** `--space-2` (8px) between label and value

---

## Component Specifications

### 1. Header Component

```
┌─────────────────────────────────────────────────────────────────┐
│  ADI Token Health                     Last update: 14:32:05 UTC │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Height: 64px
- Padding: 0 24px
- Background: `--bg-secondary`
- Border bottom: 1px solid `--border-subtle`

**Elements:**
- Logo text: `text-h3` + `text-primary`
- Timestamp: `text-caption` + `text-tertiary`
- Flex: space-between

---

### 2. StateCard Component

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│            Utility-Driven Stability                             │
│            ────────────────────────                             │
│                                                                 │
│            [●●●●●●●●○○] 78% confidence                          │
│                                                                 │
│            Last transition: 3 days ago                          │
│            Duration in state: 12 days                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Width: 100%
- Padding: 40px 24px
- Background: `--bg-secondary`
- Border radius: 8px
- Text align: center

**Elements:**
- State name: `text-hero` + state category color
- Category badge: pill shape, 6px padding, 4px radius, category background at 20% opacity
- Confidence bar: 10 circles, filled = category color, empty = `--bg-tertiary`
- Confidence text: `text-label` + `text-secondary`
- Metadata: `text-caption` + `text-tertiary`

**Category Badge:**
```
Healthy: bg-[#10B981]/20 text-[#10B981]
Caution: bg-[#F59E0B]/20 text-[#F59E0B]
Warning: bg-[#EF4444]/20 text-[#EF4444]
```

---

### 3. MetricsCard Component

**Price Card Example:**
```
┌─────────────────────────────┐
│ PRICE                       │
│                             │
│ $2.61                       │
│                             │
│ 24h: +8.6%  ▲               │
│ 7d:  +13.2% ▲               │
└─────────────────────────────┘
```

**Layout:**
- Width: 1/3 of container (flex: 1)
- Padding: 20px
- Background: `--bg-secondary`
- Border radius: 8px
- Border: 1px solid `--border-subtle`

**Elements:**
- Label: `text-label` + `text-secondary` + uppercase
- Value: `text-h1` + `text-mono` + `text-primary`
- Change indicator: `text-body-sm` + positive/negative color
- Arrow: ▲ (positive) or ▼ (negative) using same color

**Resistance Card:**
```
┌─────────────────────────────┐
│ MARKET RESISTANCE           │
│                             │
│ 2.34                        │
│                             │
│ Asymmetry: 0.62 (balanced)  │
│ Spread: 0.35%               │
└─────────────────────────────┘
```

**Emission Card:**
```
┌─────────────────────────────┐
│ EMISSION STATUS             │
│                             │
│ 5.1% circulating            │
│                             │
│ Next unlock: 45 days        │
│ Amount: 2.3% of supply      │
└─────────────────────────────┘
```

---

### 4. ForceMap Component

```
┌─────────────────────────────────────────────────────────────────┐
│ FORCE BALANCE                                                   │
│                                                                 │
│ Market Pressure       ████████░░░░░░░░░░░░  -0.30              │
│ Emission Pressure     ████░░░░░░░░░░░░░░░░  -0.15              │
│ Utility Demand     ⚠  ░░░░░░░░░░░░████░░░░  +0.20              │
│ MM Support         ⚠  ░░░░░░░░░░░░████████  +0.40              │
│ Narrative          ⚠  ░░░░░░░░░░░░██░░░░░░  +0.10              │
│                       ─────────────┼─────────                   │
│ Net Force             ░░░░░░░░░░░░░███░░░░░  +0.25 ►           │
│                                                                 │
│ Interpretation: Slight positive bias                           │
│ ⚠ Some values are illustrative estimates                       │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Width: 100%
- Padding: 24px
- Background: `--bg-secondary`
- Border radius: 8px

**Force Bar Structure:**
- Each bar row: 40px height, 12px gap
- Bar container: 300px width, centered
- Left side (negative): extends left from center, red gradient
- Right side (positive): extends right from center, green gradient
- Center line: 1px, `--border-medium`

**Bar Visual:**
```
Negative bar: linear-gradient(to left, #EF4444, #B91C1C)
Positive bar: linear-gradient(to right, #10B981, #059669)
```

**Force Value:**
- Position: absolute right
- `text-mono` + `text-primary`
- Width: 60px, right-aligned

**Mockup Indicator:**
- Amber circle (⚠) or dot, 12px diameter
- Position: before force name
- Tooltip on hover: "Estimated value"

**Net Force Bar:**
- Double height (60px)
- Thicker (16px vs 12px for individual forces)
- Same color logic but with 80% opacity
- Arrow indicator (►) at the end

**Interpretation Text:**
- Below net force
- `text-body-sm` + `text-secondary`
- Examples:
  - "Strong negative pressure"
  - "Slight positive bias"
  - "Neutral / balanced"
  - "Strong positive momentum"

---

### 5. TransitionsPanel Component

```
┌─────────────────────────────────────────────────────────────────┐
│ POSSIBLE TRANSITIONS FROM "UTILITY-DRIVEN STABILITY"           │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │ Healthy         │  │ Speculative     │  │ Liquidity       ││
│  │ Expansion       │  │ Dominance       │  │ Stress          ││
│  │                 │  │                 │  │                 ││
│  │ ████████░░  35% │  │ ███░░░░░░░  15% │  │ █░░░░░░░░░   5% ││
│  │                 │  │                 │  │                 ││
│  │ Trigger:        │  │ Trigger:        │  │ Trigger:        ││
│  │ Volume growth   │  │ BTC pump + FOMO │  │ MM exit         ││
│  │                 │  │                 │  │                 ││
│  │ Window: 2-4 wks │  │ Window: Days    │  │ Window: Hours   ││
│  │ 🟢 Healthy      │  │ 🟡 Caution      │  │ 🔴 Warning      ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
│                                                                 │
│  ⚠ Probabilities are illustrative estimates                    │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Width: 100%
- Padding: 24px
- Background: `--bg-secondary`
- Border radius: 8px

**Grid:**
- 3 columns (desktop)
- 1 column (mobile)
- Gap: 16px

**Transition Card:**
- Padding: 16px
- Background: `--bg-tertiary`
- Border radius: 6px
- Border: 2px solid category color
- Hover: border opacity 100%, background +5% lighter

**Card Elements:**

1. **State Name**
   - `text-h3` + `text-primary`
   - Margin bottom: 12px

2. **Probability Bar**
   - Height: 24px
   - Width: 100%
   - Background: `--bg-secondary`
   - Border radius: 4px
   - Fill: category color at 60% opacity
   - Fill width: probability * 100%
   - Text overlay: `text-label` + `text-primary`
   - Text position: right-aligned, 8px padding

3. **Trigger**
   - Label: `text-caption` + `text-tertiary` + uppercase
   - Value: `text-body-sm` + `text-secondary`
   - Margin: 8px 0

4. **Window**
   - Same style as Trigger
   - Margin: 8px 0

5. **Category Badge**
   - Same style as StateCard badge
   - Position: bottom of card

**Footer Warning:**
- `text-caption` + `--mockup-badge`
- Margin top: 16px

---

### 6. EmissionChart Component

```
┌─────────────────────────────────────────────────────────────────┐
│ EMISSION TIMELINE                                               │
│                                                                 │
│  10B ┤                                                          │
│      │                                          ┌───────────────│
│   8B ┤                              ┌───────────┘               │
│      │                  ┌───────────┘                           │
│   6B ┤      ┌───────────┘                                       │
│      │ ┌────┘                                                   │
│   4B ┤─┘                                                        │
│      │   ▲ You are here                                        │
│   2B ┤   │                                                      │
│      │   │                                                      │
│   0B └───┴────┴────┴────┴────┴────┴────┴────┴────┴────         │
│      2025 26  27  28  29  30  31  32  33  34                   │
│                                                                 │
│ Current: 510M (5.1%)  |  Total: 10B  |  Next: 230M in 45 days │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Width: 100%
- Padding: 24px
- Background: `--bg-secondary`
- Border radius: 8px

**Chart:**
- Use Recharts `<LineChart>`
- Line color: `--accent-primary` (#00D4FF)
- Area fill: gradient from `--accent-primary` at 40% to transparent
- Grid: dashed, `--border-subtle`
- Axis labels: `text-caption` + `text-tertiary`

**Current Position Marker:**
- Vertical line: dashed, `--accent-primary`
- Label: "You are here" in pill badge
- Badge: `--accent-primary` background, `--bg-primary` text

**Legend:**
- Below chart
- `text-body-sm` + `text-secondary`
- Separator: `|` with margins

---

## Layout & Grid

### Desktop (≥1024px)

```
┌─────────────────────────────────────────────────────────────────┐
│ Header                                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ StateCard (full width)                                          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ MetricsRow (3 columns)                                          │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│ │ Price      │  │ Resistance │  │ Emission   │                │
│ └────────────┘  └────────────┘  └────────────┘                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ForceMap (full width)                                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ TransitionsPanel (3 columns)                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ EmissionChart (full width)                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Container:**
- Max width: 1400px
- Padding: 0 24px
- Margin: 0 auto

**Section gaps:** 32px

### Mobile (≤768px)

**Changes:**
- MetricsRow: 1 column, stacked
- TransitionsPanel: 1 column, stacked
- ForceMap: bars shorter (200px vs 300px)
- StateCard: padding reduced to 24px

---

## Interactive States

### Hover States

**Cards:**
```css
transition: border-color 0.2s ease, background-color 0.2s ease;

hover:
  border-color: --border-medium
  background: lighter by 5%
```

**Force bars:**
```css
transition: opacity 0.2s ease;

hover:
  opacity: 0.8
  show tooltip with exact value
```

**Transition cards:**
```css
hover:
  border: category color at 100% (from 60%)
  background: lighter by 5%
  cursor: pointer
```

### Loading States

**Skeleton:**
- Use animated gradient pulse
- Same dimensions as actual content
- Colors: `--bg-tertiary` to `--bg-secondary`

**Loading indicator:**
- Small spinner (20px) in top right of Header
- Color: `--accent-primary`
- Shows during data fetch

### Error States

**API Error:**
```
┌─────────────────────────────────────────────┐
│ ⚠ Unable to fetch data                      │
│                                             │
│ Last successful update: 2 minutes ago       │
│ Retrying in 58 seconds...                   │
└─────────────────────────────────────────────┘
```

- Background: `--state-warning` at 10%
- Border: 1px solid `--state-warning`
- Icon: ⚠ in `--state-warning`
- Text: `text-body-sm` + `text-secondary`

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 768px) {
  .metrics-row { grid-template-columns: 1fr; }
  .transitions-grid { grid-template-columns: 1fr; }
  .force-bar-container { width: 200px; }
  .state-card { padding: 24px 16px; }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1023px) {
  .metrics-row { grid-template-columns: repeat(3, 1fr); }
  .transitions-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */
@media (min-width: 1024px) {
  .metrics-row { grid-template-columns: repeat(3, 1fr); }
  .transitions-grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

## Animations

### Page Load
```css
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
duration: 0.4s
easing: ease-out
stagger: 0.1s between sections
```

### Auto-refresh
```css
/* Pulse header timestamp during refresh */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Force bar updates
```css
transition: width 0.6s ease-out, background-color 0.3s ease;
```

### State changes
```css
/* StateCard gets brief highlight border */
box-shadow: 0 0 0 3px {category-color} at 40%
duration: 1.2s
easing: ease-out
```

---

## Accessibility

### Semantic HTML
- Use `<header>`, `<main>`, `<section>`, `<article>`
- Cards are `<article>` elements
- Force bars are `<div role="img" aria-label="...">` with readable label

### ARIA Labels
```html
<div role="img" aria-label="Market Pressure force: negative 0.30">
  <!-- visual bar -->
</div>

<div aria-label="Current state: Utility-Driven Stability, 78% confidence">
  <!-- StateCard content -->
</div>
```

### Keyboard Navigation
- All interactive elements focusable
- Focus visible: 2px solid `--accent-primary` outline, 2px offset
- Tab order: top to bottom, left to right

### Color Contrast
All text meets WCAG AA:
- Primary text on dark bg: 16:1 ratio ✓
- Secondary text on dark bg: 7:1 ratio ✓
- Category colors on dark bg: 4.5:1+ ratio ✓

---

## Performance

### Bundle Size Targets
- Initial bundle: < 250KB (gzipped)
- Recharts: lazy load only when chart visible

### Rendering
- Use React.memo for MetricsCard, ForceBar components
- Debounce window resize handler (100ms)
- RequestAnimationFrame for force bar animations

### Data Fetching
- Cache responses for 60 seconds
- Show stale data during refetch
- Optimistic updates for better perceived performance

---

## Mockup Indicator Pattern

### Visual Treatment
All mockup data must have clear, non-intrusive indicator:

**Option A: Amber Dot (recommended)**
```
Utility Demand  ⚠  ░░░░░░░░░░░░████░░░░  +0.20
```

**Option B: Amber Badge**
```
Utility Demand [EST]  ░░░░░░░░░░░░████░░░░  +0.20
```

### Tooltip Content
```
⚠ Estimated Value

This force is currently estimated based on 
internal analysis. Real-time data integration 
is planned for future versions.
```

### Footer Disclaimers
Every section with mockup data must have footer:
```
⚠ Some values are illustrative estimates
```

Style: `text-caption` + `--mockup-badge` color

---

## Implementation Notes for Developer

### Priority Order
1. **Week 1:** Header, StateCard, MetricsRow
   - These are pure data display, no complex logic
   - Get the theme and typography right here

2. **Week 2:** ForceMap, TransitionsPanel
   - More complex layouts
   - Ensure mockup indicators are clear

3. **Week 3:** EmissionChart, polish
   - Chart is nice-to-have
   - Focus on smooth animations and error states

### Quick Wins
- Use Tailwind's default dark theme classes
- Copy/paste color values into tailwind.config.js
- Use Recharts examples as starting point
- Don't build custom bar chart — use divs with width %

### Common Pitfalls to Avoid
- ❌ Don't make bars too thick (12px max)
- ❌ Don't hide mockup indicators
- ❌ Don't use too many colors (stick to semantic colors)
- ❌ Don't make transition cards clickable yet (no logic)
- ❌ Don't over-animate (subtle is better)

### Testing Checklist
- [ ] Works on iPhone SE (375px width)
- [ ] Works on iPad (768px width)
- [ ] Works on 1080p monitor (1920px width)
- [ ] Dark theme looks good in bright room
- [ ] All text is readable
- [ ] Mockup indicators are obvious
- [ ] Loading state doesn't flash too fast
- [ ] Error state is clear but not alarming

---

*Document version: 1.0*
*Last updated: 2025-02-10*
