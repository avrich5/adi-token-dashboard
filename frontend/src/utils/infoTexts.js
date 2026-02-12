export const INFO_TEXTS = {
  stateCard:
    `The State is a computed classification, not an opinion. It is selected from a finite taxonomy of 12 states defined within the ADI Pattern Genome. The state is determined by mapping structured context data (price dynamics, volume, resistance, emission schedule) through deterministic rules. Health Index combines state confidence with resistance — it reflects how strongly the current state is supported by actual market conditions. A high health value means the state is well-grounded; a low value signals fragility or transitional conditions.`,

  price:
    `Current $ADI token price from CMC aggregated feed. The 7-day change indicates short-term directional momentum. Price alone does not determine state — it is one input among several context fields used for state classification.`,

  volume:
    `Total trading volume across tracked exchanges in the last 24 hours. Volume is a critical input for resistance calculation and liquidity stress detection. The ratio vs 7-day average helps distinguish normal activity from anomalous regimes. Consistently low volume relative to market cap signals thin market conditions.`,

  marketCap:
    `Fully diluted valuation based on total token supply of 51M $ADI. Market cap provides the denominator for resistance and liquidity metrics. It represents the theoretical total value if all tokens were in circulation at current price — not the actual free-float capitalization.`,

  resistance:
    `Resistance Index measures how much capital is required to move the token price significantly. It is computed as volume_usd / (fully_diluted_value × 0.05). Low resistance means the market is thin — small trades can cause disproportionate price movement. This is the single most important fragility indicator for illiquid tokens. Values below 0.01 indicate critical liquidity stress regardless of price direction.`,

  forcesPanel:
    `Forces represent directional pressures acting on the token economy. Each force is a normalized value from −1 to +1. Positive values push toward expansion or stability; negative values push toward contraction or stress. Market Pressure and Emission Pressure are computed from real data. Forces marked with ● are estimated from mockup models and will be replaced with real data sources as the ecosystem matures. The net balance of forces is the primary driver of state transitions.`,

  transitionsPanel:
    `Probable transitions are computed from the current force configuration using a scenario model. Each transition shows a target state, its probability, and the trigger condition. These are not predictions — they represent the most likely state changes given current pressures. The model evaluates all force combinations to identify which states the economy could move toward and under what conditions.`,

  timeline:
    `The State Timeline shows the historical sequence of classified states overlaid with price and resistance data. Background color zones correspond to state categories: green for healthy, amber for caution, red for warning. This visualization reveals how state transitions correlate with market events and whether the classification system captures regime changes accurately. The timeline is the primary tool for retrospective validation of the state model.`,

  stateRibbon:
    `The state ribbon is a compressed view of state history. Each colored segment represents a contiguous period in a single state. Segment width is proportional to duration in days. This allows instant visual assessment of state stability — long segments indicate persistent regimes, frequent short segments indicate instability or transitional dynamics.`,

  resistanceLegend:
    `The dashed cyan line shows the Resistance Index over time, plotted on a 0–1 scale (right axis). Resistance is the key measure of market depth relative to token valuation. Periods where resistance drops near zero correspond to liquidity stress conditions — the market becomes fragile and susceptible to manipulation or cascading sell-offs. Resistance and price often diverge: price may appear stable while resistance deteriorates, creating hidden fragility.`,

  forcesTimeline:
    `Force Decomposition shows how each directional pressure evolves over time. Positive forces stack upward (green area), negative forces stack downward. The zero line separates expansionary from contractionary pressure. This chart reveals which forces dominate in each period and how their balance shifts. Mockup forces (lower opacity) are estimated — their patterns are directionally correct but magnitudes are approximate until real data sources are connected.`,

  scenariosValidation:
    `Scenario Validation tests the predictive quality of the state model. Each day, the system generates all possible force combinations (3 levels × 5 forces = 243 scenarios), classifies the resulting states, and ranks them by probability. The next day's actual state is compared against predictions. A validated scenario becomes a knowledge unit — a confirmed causal link between force configuration and outcome. This is not forecasting for trading; it is systematic calibration of the state model.`,

  knowledgeBar:
    `The knowledge bar tracks cumulative validated scenarios as a fraction of all validatable days. Each validated unit represents a day where the predicted state transition matched the observed outcome. This growing pool of confirmed causal patterns forms the economic memory of the system — the foundation for increasingly reliable state classification and governance decision support.`,

  summaryBadges:
    `Validated units: total confirmed scenario-outcome matches. Hit rate: percentage of days where at least one top-3 scenario matched the actual next-day state. Scenarios/day: number of force combinations evaluated per day (default: 243 = full permutation of 5 forces at 3 levels each). These metrics measure the maturity and reliability of the state classification system, not market prediction accuracy.`,
};
