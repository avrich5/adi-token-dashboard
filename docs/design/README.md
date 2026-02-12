# UI/UX Package for Developer — README

## What You're Getting

This design package contains everything needed to implement the ADI Token Health Dashboard UI. Read this first to understand the structure.

---

## Document Structure

### 1. **UI-SPECIFICATION.md** ← START HERE
**What:** Complete visual design system
**When to use:** Reference for all visual decisions
**Key sections:**
- Color system with exact hex codes
- Typography scale and usage
- Component specifications with measurements
- Layout and spacing rules
- Accessibility guidelines

**Think of this as:** Your visual "source of truth"

---

### 2. **IMPLEMENTATION-GUIDE.md** ← CODE EXAMPLES
**What:** Step-by-step implementation with React code
**When to use:** When actually writing code
**Key sections:**
- Tailwind config setup
- Component implementation with full JSX
- API integration patterns
- Mobile responsive patterns
- Performance optimization tips

**Think of this as:** Your coding handbook with copy-paste snippets

---

### 3. **VISUAL-REFERENCE.md** ← QUICK LOOKUP
**What:** Quick visual reference with measurements
**When to use:** When you need to check a specific measurement
**Key sections:**
- Component dimensions (height, padding, etc.)
- Color palette for copy-paste
- Typography sizes
- Common patterns and snippets

**Think of this as:** Your cheat sheet

---

## How to Use This Package

### Phase 1: Setup (30 minutes)
1. Read `UI-SPECIFICATION.md` sections:
   - Color System
   - Typography
   - Spacing System
2. Follow `IMPLEMENTATION-GUIDE.md`:
   - Install dependencies
   - Configure Tailwind
   - Set up global CSS

### Phase 2: Core Implementation (Week 1)
1. Build Header + StateCard
   - Reference: `VISUAL-REFERENCE.md` sections 1-2
   - Code: `IMPLEMENTATION-GUIDE.md` Components 1-2
2. Build MetricsRow
   - Reference: `VISUAL-REFERENCE.md` section 3
   - Code: `IMPLEMENTATION-GUIDE.md` Component 3

### Phase 3: Complex Components (Week 2)
1. Build ForceMap
   - Reference: `VISUAL-REFERENCE.md` section 4
   - Code: `IMPLEMENTATION-GUIDE.md` Component 4
   - **This is the hardest component** — take your time
2. Build TransitionsPanel
   - Reference: `VISUAL-REFERENCE.md` section 5
   - Code: `IMPLEMENTATION-GUIDE.md` Component 5

### Phase 4: Polish (Week 3)
1. Add EmissionChart (optional)
2. Implement loading/error states
3. Test responsive layout
4. Add smooth animations

---

## Key Principles (Read This!)

### 1. This is NOT a Trading Dashboard
- ❌ No green/red price alerts
- ❌ No "buy/sell" signals
- ❌ No speculation aesthetics
- ✅ Clean, professional, data-dense
- ✅ Governance-level intelligence
- ✅ Explainable, reproducible reasoning

### 2. Mockup Data Must Be Clearly Marked
- Every mockup value gets amber indicator (⚠ or dot)
- Footer disclaimers on every section with mockup data
- Users must understand what's real vs estimated

### 3. Mobile-First But Desktop-Optimized
- Layout must work on iPhone SE (375px)
- But primary use case is desktop analysis
- Test on all devices

### 4. Dark Theme Only (For Now)
- Background: #0A0A0F (very dark blue)
- Cards: #12121A (slightly lighter)
- No light theme in MVP

---

## Quick Win Tips

### Start Simple
Begin with static data to get layout right:
```jsx
const mockData = {
  state: {
    id: 2,
    name: "Utility-Driven Stability",
    category: "healthy",
    confidence: 0.78
  },
  // ... rest of mock data
};
```

### Use Tailwind's Defaults
Don't fight the framework:
```jsx
// ✅ Good
<div className="p-6 rounded-lg">

// ❌ Avoid
<div style={{ padding: '24px', borderRadius: '8px' }}>
```

### Copy-Paste First, Refine Later
The IMPLEMENTATION-GUIDE has full component code.
Copy it, get it working, then refine.

### Don't Over-Engineer
- Single-page app (no routing)
- No state management library needed
- JSON files instead of database
- Polling instead of WebSocket

---

## Common Questions

**Q: Where do I start?**
A: Read UI-SPECIFICATION.md, then follow IMPLEMENTATION-GUIDE.md section "Quick Start: Visual Setup"

**Q: How exact do measurements need to be?**
A: Very. This is data-dense UI. Use exact spacing from VISUAL-REFERENCE.md

**Q: Can I change colors?**
A: No. Colors are semantic (healthy=green, warning=red, etc). Changing them breaks meaning.

**Q: What if I'm stuck on ForceMap?**
A: It's the hardest component. Break it down:
1. Get single bar working
2. Add center line
3. Add positive/negative logic
4. Add net force bar
5. Test with different values

**Q: Do I need to implement EmissionChart in v1?**
A: No. It's nice-to-have. Focus on StateCard, MetricsRow, ForceMap, Transitions first.

**Q: Where are backend API specs?**
A: In `/docs/03-development-plan.md` and `/docs/PROMPT-developer.md`

---

## File Structure You'll Create

```
src/
├── App.jsx                      ← Main container
├── components/
│   ├── Header.jsx               ← Top bar with title + timestamp
│   ├── StateCard.jsx            ← Hero section with current state
│   ├── MetricsCard.jsx          ← Reusable card for price/resistance/emission
│   ├── ForceMap.jsx             ← Horizontal bars (hardest component)
│   ├── TransitionsPanel.jsx    ← 3 cards with possible next states
│   └── EmissionChart.jsx        ← Line chart (optional for v1)
├── index.css                    ← Tailwind imports + global styles
└── api.js                       ← Fetch helper (optional)

Config files to read (not create):
/config/vesting_schedule.json
/config/forces_mockup.json
/config/transitions_mockup.json
```

---

## Testing Checklist

Before calling it "done":

### Visual
- [ ] Dark theme (#0A0A0F background)
- [ ] State name is 48px and colored by category
- [ ] Force bars extend from center (negative left, positive right)
- [ ] Mockup indicators visible on 3 forces
- [ ] Transition cards have colored borders
- [ ] All text is readable (not too small, good contrast)

### Responsive
- [ ] Works on iPhone SE (375px width)
- [ ] Works on iPad (768px width)
- [ ] Works on 1080p desktop (1920px width)
- [ ] MetricsRow stacks on mobile
- [ ] TransitionsPanel stacks on mobile

### Functional
- [ ] Data loads from backend
- [ ] Auto-refreshes every 60 seconds
- [ ] Loading state shows before data arrives
- [ ] Error state shows if API fails
- [ ] Timestamp updates on refresh

### Accessibility
- [ ] Can tab through interactive elements
- [ ] Focus is visible (outline)
- [ ] All text meets contrast requirements
- [ ] Screen reader labels present

---

## Support

If stuck or confused:

1. **Check existing docs:**
   - UI-SPECIFICATION.md for visual questions
   - IMPLEMENTATION-GUIDE.md for code questions
   - VISUAL-REFERENCE.md for quick measurements

2. **Common issues:**
   - "Force bars not centering" → Check `left-1/2` / `right-1/2` positioning
   - "Colors not working" → Check tailwind.config.js extends
   - "Font looks wrong" → Verify Inter is loaded from Google Fonts
   - "Layout breaks on mobile" → Check `grid-cols-1 md:grid-cols-3` pattern

3. **Backend integration:**
   - See `/docs/PROMPT-developer.md` for API contract
   - See `/docs/03-development-plan.md` for backend details

---

## Design Philosophy

This dashboard is **NOT**:
- A trading platform (no buy/sell signals)
- A price ticker (not focused on current price)
- A speculation tool (no predictions)

This dashboard **IS**:
- An Intelligence Semantic Layer
- A capacity planning tool for token unlocks
- A governance decision-support system
- A state transition modeling interface

Design reflects this: clean, professional, explainable.

---

## Version History

**v1.0** — February 2025
- Initial design package
- 6 core components specified
- Dark theme only
- Desktop-first, mobile-responsive

---

*Good luck! Build something that makes stakeholders confident in their decisions.*
