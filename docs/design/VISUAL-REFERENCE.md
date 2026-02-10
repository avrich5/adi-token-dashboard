# Component Visual Reference

Quick visual guide for each component with exact specs.

---

## Color Palette (Copy-Paste Ready)

```
Background:
#0A0A0F - Main background
#12121A - Cards, panels  
#1A1A24 - Elevated elements

Text:
#FFFFFF - Headers, primary
#9CA3AF - Body, labels
#6B7280 - Muted, timestamps

Borders:
#1F2937 - Subtle
#374151 - Medium

States:
#10B981 - Healthy (green)
#F59E0B - Caution (amber)
#EF4444 - Warning (red)

Forces:
#10B981 - Positive (green)
#EF4444 - Negative (red)

Accent:
#00D4FF - Cyan highlights
#F59E0B - Mockup indicator
```

---

## 1. Header Component

```
Height: 64px
Padding: 0 24px
Background: #12121A
Border: 1px bottom #1F2937

┌──────────────────────────────────────────────┐
│ ADI Token Health    Last update: 14:32:05 UTC│  ← 64px height
└──────────────────────────────────────────────┘
   ↑                                    ↑
   20px bold #FFF                       11px mono #6B7280
```

---

## 2. StateCard Component

```
Padding: 40px 24px
Background: #12121A
Border-radius: 8px
Text-align: center

┌────────────────────────────────────────┐
│          [ HEALTHY ]                   │ ← Badge: 12px, #10B981/20 bg
│                                        │
│     Utility-Driven Stability           │ ← 48px, bold, #10B981
│     ────────────────────────           │
│                                        │
│     ●●●●●●●●○○ 78% confidence         │ ← 12px circles, state color
│                                        │
│     Last transition: 3 days ago        │ ← 11px, #6B7280
│     Duration in state: 12 days         │
└────────────────────────────────────────┘

Badge pills:
  bg-[#10B981]/20 text-[#10B981]  (healthy)
  bg-[#F59E0B]/20 text-[#F59E0B]  (caution)
  bg-[#EF4444]/20 text-[#EF4444]  (warning)

Confidence circles:
  Filled: state category color
  Empty: #1A1A24
  Size: 12px diameter (w-3 h-3)
  Gap: 8px
```

---

## 3. MetricsCard Component

```
Padding: 20px
Background: #12121A
Border: 1px #1F2937
Border-radius: 8px
Min-height: 140px

┌─────────────────────────┐
│ PRICE                   │ ← 11px uppercase, #9CA3AF
│                         │
│ $2.61                   │ ← 32px mono, #FFF
│                         │
│ 24h: +8.6%  ▲          │ ← 14px, green if positive
│ 7d:  +13.2% ▲          │
└─────────────────────────┘

Label: text-xs uppercase tracking-wide
Value: text-3xl font-mono
Details: text-sm
```

---

## 4. ForceMap Component

```
Padding: 24px
Background: #12121A

Individual Force Bar:
┌────────────────────────────────────────────────┐
│ Market Pressure  ████████░░░░░░░░░░░░  -0.30  │
└────────────────────────────────────────────────┘
  ↑                ↑                      ↑
  160px width      Bars from center      64px right-aligned
  14px text        12px height            14px mono

Force bar structure:
- Container: 100% width, flex
- Name: w-40 (160px)
- Bar area: flex-1 (fills space)
- Value: w-16 (64px), text-right

Bar colors:
  Negative: linear-gradient(to left, #EF4444, #B91C1C)
  Positive: linear-gradient(to right, #10B981, #059669)

Center line:
  Position: absolute, left: 50%
  Width: 1px
  Color: #374151

Mockup indicator:
  8px amber dot before name
  Color: #F59E0B

Net Force Bar:
┌────────────────────────────────────────────────┐
│ Net Force        ░░░░░░░░░░░░███░░░░░  +0.25 ►│
└────────────────────────────────────────────────┘
  Height: 16px (h-4)
  Opacity: 80%
  Arrow: ► at end
```

---

## 5. TransitionsPanel Component

```
Padding: 24px
Background: #12121A

Grid: 3 columns on desktop, 1 on mobile
Gap: 16px

Transition Card:
┌──────────────────────┐
│ Healthy Expansion    │ ← 20px bold, #FFF
│                      │
│ ████████░░  35%      │ ← 24px bar, category color at 60%
│                      │
│ TRIGGER              │ ← 11px uppercase, #6B7280
│ Volume growth        │ ← 14px, #9CA3AF
│                      │
│ WINDOW               │
│ 2-4 weeks            │
│                      │
│ [ 🟢 Healthy ]       │ ← Badge at bottom
└──────────────────────┘
  ↑
  2px border, category color

Card specs:
  Padding: 16px
  Background: #1A1A24
  Border: 2px solid {category-color}
  Border-radius: 6px
  
Probability bar:
  Height: 24px
  Background: #12121A
  Fill: category color at 60% opacity
  Text: white, right-aligned, 8px padding
```

---

## 6. EmissionChart Component

```
Padding: 24px
Background: #12121A
Chart height: 300px

Line color: #00D4FF (cyan)
Area fill: linear-gradient from #00D4FF/40 to transparent
Grid: dashed #1F2937
Axis text: 11px, #6B7280

Current marker:
  Vertical dashed line: #00D4FF
  Label: "You are here" in cyan
  Position: at current year

Legend below chart:
  14px, #9CA3AF
  Separator: | with spacing
```

---

## Spacing System

```
4px   (space-1)  - tight gaps
8px   (space-2)  - element spacing
12px  (space-3)  - small gaps
16px  (space-4)  - card gaps
24px  (space-6)  - card padding
32px  (space-8)  - section gaps
48px  (space-12) - large sections
```

---

## Typography Scale

```
Hero:    48px, bold, line-height 1.1
H1:      32px, bold, line-height 1.2
H2:      24px, semibold, line-height 1.3
H3:      20px, semibold, line-height 1.4

Body-lg: 16px, regular, line-height 1.5
Body:    14px, regular, line-height 1.5
Body-sm: 12px, regular, line-height 1.4

Label:   13px, medium, line-height 1.4
Caption: 11px, regular, line-height 1.3

All use Inter font family
Numbers use SF Mono or Consolas
```

---

## Responsive Breakpoints

```
Mobile:  < 768px
  - Single column layout
  - Force bars: 200px width
  - Reduced padding

Tablet:  768px - 1023px
  - Metrics: 3 columns
  - Transitions: 2 columns

Desktop: ≥ 1024px
  - Metrics: 3 columns
  - Transitions: 3 columns
  - Force bars: 300px width
  - Full padding
```

---

## Interactive States

```
Card hover:
  border-color: #374151 (from #1F2937)
  transition: 0.2s ease

Transition card hover:
  border-opacity: 100% (from 60%)
  background: +5% lighter
  cursor: pointer

Force bar hover:
  opacity: 0.8
  show tooltip with exact value
```

---

## Common Patterns

### Center-aligned content
```jsx
<div className="text-center">
  <div className="flex items-center justify-center gap-2">
```

### Flex row with space between
```jsx
<div className="flex items-center justify-between">
```

### Grid that stacks on mobile
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```

### Monospace numbers
```jsx
<span className="font-mono">2.61</span>
```

### State-colored text
```jsx
<span className="text-state-healthy">Healthy</span>
```

### Mockup indicator
```jsx
<div className="flex items-center gap-2">
  {isMockup && <span className="w-2 h-2 bg-mockup-badge rounded-full" />}
  <span>Force Name</span>
</div>
```

---

## Quick Copy-Paste Snippets

### Category badge
```jsx
const badgeStyles = {
  healthy: 'bg-state-healthy/20 text-state-healthy',
  caution: 'bg-state-caution/20 text-state-caution',
  warning: 'bg-state-warning/20 text-state-warning'
};

<span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeStyles[category]}`}>
  {category.toUpperCase()}
</span>
```

### Percentage with arrow
```jsx
<span className={value >= 0 ? 'text-force-positive' : 'text-force-negative'}>
  {value >= 0 ? '+' : ''}{value.toFixed(1)}%
  {' '}
  {value >= 0 ? '▲' : '▼'}
</span>
```

### Card base
```jsx
<div className="bg-bg-secondary rounded-lg border border-border-subtle p-6">
```

### Section gap
```jsx
<main className="space-y-8">
```

---

*Quick reference for developers*
*See UI-SPECIFICATION.md for full details*
