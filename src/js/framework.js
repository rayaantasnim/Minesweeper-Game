/**
 * Central Logic & Procedural Telemetry Layer
 * Minesweeper Lite (Lottery Trap)
 * Authorized by Rayaan Tasnim | Powered by IDAI Universe
 */

// Exactly 20 distinct Chess-style rapid commentary items divided across 4 distinct categories
export const CHESS_COMMENTARY = [
  // Speed Category (1 - 5)
  { id: 1, category: 'Speed', text: 'Supersonic Solve!', icon: '⚡' },
  { id: 2, category: 'Speed', text: 'Lightning Reflexes!', icon: '⚡' },
  { id: 3, category: 'Speed', text: 'Rapid Fire Gambit!', icon: '⚡' },
  { id: 4, category: 'Speed', text: 'Velocity Mastery!', icon: '⚡' },
  { id: 5, category: 'Speed', text: 'Blistering Tempo!', icon: '⚡' },

  // Accuracy Category (6 - 10)
  { id: 6, category: 'Accuracy', text: 'Brilliant Move!', icon: '🎯' },
  { id: 7, category: 'Accuracy', text: 'Precision Calculated!', icon: '🎯' },
  { id: 8, category: 'Accuracy', text: 'Grandmaster Insight!', icon: '🎯' },
  { id: 9, category: 'Accuracy', text: 'Flawless Execution!', icon: '🎯' },
  { id: 10, category: 'Accuracy', text: 'Optimal Calculation!', icon: '🎯' },

  // Streak Category (11 - 15)
  { id: 11, category: 'Streak', text: 'On Fire! 🔥', icon: '🔥' },
  { id: 12, category: 'Streak', text: 'Unstoppable Momentum!', icon: '🔥' },
  { id: 13, category: 'Streak', text: 'Cascading Advantage!', icon: '🔥' },
  { id: 14, category: 'Streak', text: 'Immortal Strategy!', icon: '🔥' },
  { id: 15, category: 'Streak', text: 'Dominant Waveform!', icon: '🔥' },

  // Recovery Category (16 - 20)
  { id: 16, category: 'Recovery', text: 'Tactical Recovery!', icon: '🛡️' },
  { id: 17, category: 'Recovery', text: 'Counter-Gambit Pivot!', icon: '🛡️' },
  { id: 18, category: 'Recovery', text: 'Calculated Resilience!', icon: '🛡️' },
  { id: 19, category: 'Recovery', text: 'Fortress Maneuver!', icon: '🛡️' },
  { id: 20, category: 'Recovery', text: 'Deep Defense Turnaround!', icon: '🛡️' },
];

/**
 * Standard game configuration constants
 */
export const GRID_CONFIG = {
  TOTAL_TILES: 16, // 4x4 matrix
  MINE_COUNT: 2,
  SAFE_COINS_COUNT: 14,
  PAR_TIME_SECONDS: 25,
};

/**
 * System ranking thresholds and design tokens
 */
export const SYSTEM_RANKINGS = [
  {
    minScore: 95,
    maxScore: 100,
    title: 'QUANTUM EDGE',
    grade: 'SS+',
    color: '#06b6d4',
    badgeClass: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    description: 'Flawless spatial acuity, sub-par temporal velocity, zero inefficiency penalties recorded.',
  },
  {
    minScore: 85,
    maxScore: 94,
    title: 'APEX VECTOR',
    grade: 'S',
    color: '#0284c7',
    badgeClass: 'text-sky-600 bg-sky-50 border-sky-200',
    description: 'High-tier computational consistency. Minor temporal drift without strategic compromise.',
  },
  {
    minScore: 70,
    maxScore: 84,
    title: 'HYPER MATRIX',
    grade: 'A',
    color: '#10b981',
    badgeClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    description: 'Solid node sequence with controlled tactical margins. Good spatial mapping.',
  },
  {
    minScore: 50,
    maxScore: 69,
    title: 'LOGIC CORE',
    grade: 'B',
    color: '#f59e0b',
    badgeClass: 'text-amber-600 bg-amber-50 border-amber-200',
    description: 'Standard baseline traversal. Detectable pause latency and cautious cell evaluation.',
  },
  {
    minScore: 30,
    maxScore: 49,
    title: 'ALPHA NODE',
    grade: 'C',
    color: '#f97316',
    badgeClass: 'text-orange-600 bg-orange-50 border-orange-200',
    description: 'Early tactical retreat or heavy temporal deduction incurred during matrix exploration.',
  },
  {
    minScore: 0,
    maxScore: 29,
    title: 'STATIC DRIFT',
    grade: 'D',
    color: '#f43f5e',
    badgeClass: 'text-rose-600 bg-rose-50 border-rose-200',
    description: 'Catastrophic anomaly or premature mine detonation terminating the active matrix loop.',
  },
];

/**
 * Maps any score 0-100 to the system ranking object
 */
export function getSystemRanking(score) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));
  for (const rank of SYSTEM_RANKINGS) {
    if (boundedScore >= rank.minScore && boundedScore <= rank.maxScore) {
      return rank;
    }
  }
  return SYSTEM_RANKINGS[SYSTEM_RANKINGS.length - 1];
}

/**
 * Strict time counter format:
 * Dynamic fractional seconds structure: e.g. "0 minutes 42.18 seconds" or "1 minutes 15.62 seconds"
 */
export function formatFractionalDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = (safeSeconds % 60).toFixed(2);
  return `${minutes} minutes ${remainingSeconds} seconds`;
}

/**
 * Calculates telemetry metrics based on runtime parameters:
 * Points Gained = Max(0, 100 - TimePenalty - InefficiencyPenalty)
 * - Time Penalty: Deduct 1 point for every 2 seconds spent past a standard par window of 25 seconds.
 * - Inefficiency Penalty: Deduct 5 points for each safe tile missed if the player chooses to exit early, or flat penalty for wrong path evaluations.
 */
export function calculateTelemetryMatrix({
  durationSeconds = 0,
  safeTilesUncovered = 0,
  detonated = false,
  totalSafeTiles = GRID_CONFIG.SAFE_COINS_COUNT,
  totalClicks = 0,
  maxStreak = 0,
}) {
  const parTime = GRID_CONFIG.PAR_TIME_SECONDS;
  const timeOverPar = Math.max(0, durationSeconds - parTime);
  const timePenalty = Math.floor(timeOverPar / 2);

  const missedSafeTiles = Math.max(0, totalSafeTiles - safeTilesUncovered);
  // 5 points penalty per missed safe tile. If detonated, an immediate flat penalty of 40 points applies
  const inefficiencyPenalty = detonated
    ? 40 + missedSafeTiles * 4
    : missedSafeTiles * 5;

  const rawScore = 100 - timePenalty - inefficiencyPenalty;
  const finalScore = Math.max(0, Math.min(100, rawScore));

  const totalAttempts = Math.max(1, totalClicks);
  const accuracy = Math.min(100, (safeTilesUncovered / (detonated ? safeTilesUncovered + 1 : safeTilesUncovered)) * 100);
  const accuracyFormatted = Number.isFinite(accuracy) ? accuracy.toFixed(1) : '0.0';

  const ranking = getSystemRanking(finalScore);

  return {
    finalScore,
    rawScore,
    durationSeconds,
    durationFormatted: formatFractionalDuration(durationSeconds),
    timePenalty,
    inefficiencyPenalty,
    safeTilesUncovered,
    totalSafeTiles,
    missedSafeTiles,
    detonated,
    totalClicks,
    maxStreak,
    accuracy: accuracyFormatted,
    ranking,
  };
}

/**
 * Procedural Suggestion Generator:
 * Dynamically construct feedback paragraphs referencing runtime time metrics and click parameters on the fly.
 * No pre-written text blocks!
 */
export function generateProceduralSuggestion(telemetry) {
  const {
    durationSeconds,
    safeTilesUncovered,
    totalSafeTiles,
    detonated,
    timePenalty,
    inefficiencyPenalty,
    finalScore,
    maxStreak,
    ranking,
    accuracy,
  } = telemetry;

  const tempoRate = safeTilesUncovered > 0
    ? (durationSeconds / safeTilesUncovered).toFixed(2)
    : '0.00';

  const parDelta = (durationSeconds - GRID_CONFIG.PAR_TIME_SECONDS).toFixed(2);
  const timeClause = Number(parDelta) <= 0
    ? `Operating ${Math.abs(Number(parDelta))} seconds underneath the 25.00s par threshold preserved zero temporal friction (-0 pts).`
    : `A temporal lag of ${parDelta}s over baseline incurred a calculated deduction of -${timePenalty} point${timePenalty === 1 ? '' : 's'}.`;

  let eventAnalysis = '';
  if (detonated) {
    eventAnalysis = `Terminal detonation at safe node count ${safeTilesUncovered}/${totalSafeTiles} interrupted path convergence, inflicting a severe inefficiency penalty of -${inefficiencyPenalty} points.`;
  } else if (safeTilesUncovered === totalSafeTiles) {
    eventAnalysis = `Total matrix clearance realized with flawless 14/14 golden coin retrieval, eliminating all spatial deficit penalties.`;
  } else {
    eventAnalysis = `Tactical extraction conducted with ${safeTilesUncovered} safe coins collected, intentionally deferring ${totalSafeTiles - safeTilesUncovered} unverified cells for -${inefficiencyPenalty} points.`;
  }

  const streakAnalysis = maxStreak >= 5
    ? `A peak unbroken cadence streak of ${maxStreak} consecutive discoveries demonstrated high positional predictive power.`
    : `Maximum safe streak peaked at ${maxStreak} nodes, indicating deliberate inspection intervals averaging ${tempoRate} seconds per cell.`;

  let tacticalRecommendation = '';
  if (finalScore >= 85) {
    tacticalRecommendation = `Calibration confirms top-tier execution within the ${ranking.title} spectrum. To reach absolute 100/100, optimize your initial exploratory sweeps to clear all safe quadrants under 20.00 seconds.`;
  } else if (finalScore >= 50) {
    tacticalRecommendation = `Elevate sequence velocity to bypass the 25-second par boundary while utilizing perimeter-first corner probing to mitigate 2-mine cluster traps without surrendering the safe coin yield.`;
  } else {
    tacticalRecommendation = `Prioritize defensive probability mapping over speed: isolate corners first to establish safe anchor channels before cascading into interior nodes.`;
  }

  return `${eventAnalysis} ${timeClause} ${streakAnalysis} Runtime pacing registered at an accuracy rating of ${accuracy}% with average node resolution of ${tempoRate}s. ${tacticalRecommendation}`;
}

/**
 * Clipboard Payload Engine:
 * Copies a plain text summary report to the user's clipboard using actual line breaks
 * (no literal "\n" strings printed in the output text), ending exactly with:
 * Certified by Rayaan Tasnim
 * Powered by IDAI Universe
 * © All rights reserved
 */
export function buildClipboardPayload(telemetry, suggestion) {
  const lines = [
    '========================================',
    'MINESWEEPER LITE · LOTTERY TRAP TELEMETRY',
    '========================================',
    `Evaluation Rank  : ${telemetry.ranking.title} [Grade: ${telemetry.ranking.grade}]`,
    `Performance Score: ${telemetry.finalScore} / 100`,
    `Elapsed Duration : ${telemetry.durationFormatted}`,
    `Accuracy Rating  : ${telemetry.accuracy}% (${telemetry.safeTilesUncovered}/${telemetry.totalSafeTiles} coins)`,
    `Session Status   : ${telemetry.detonated ? 'TRAP DETONATED (Defeat)' : telemetry.safeTilesUncovered === telemetry.totalSafeTiles ? 'FULL CLEARANCE (Victory)' : 'TACTICAL CASH-OUT (Extracted)'}`,
    `Peak Safe Streak : ${telemetry.maxStreak} Consecutive Nodes`,
    `Temporal Penalty : -${telemetry.timePenalty} pts`,
    `Tactical Deficit : -${telemetry.inefficiencyPenalty} pts`,
    '----------------------------------------',
    'PROCEDURAL ANALYSIS:',
    suggestion,
    '----------------------------------------',
    'Certified by Rayaan Tasnim',
    'Powered by IDAI Universe',
    '© All rights reserved',
  ];

  return lines.join('\r\n');
}

/**
 * Storage helpers for cross-page static navigation
 */
const STORAGE_KEY = 'minesweeper_lite_session_telemetry';

export function saveSessionTelemetry(telemetry) {
  try {
    const serialized = JSON.stringify(telemetry);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export function loadSessionTelemetry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage load failed:', e);
    return null;
  }
}

/**
 * Selects a chess commentary item based on click telemetry
 */
export function selectChessReaction({ speedSeconds = 1, isStreak = false, streakCount = 1, isRecovery = false }) {
  let pool = CHESS_COMMENTARY;
  if (isStreak && streakCount >= 3) {
    pool = CHESS_COMMENTARY.filter(item => item.category === 'Streak');
  } else if (speedSeconds < 1.2) {
    pool = CHESS_COMMENTARY.filter(item => item.category === 'Speed');
  } else if (isRecovery) {
    pool = CHESS_COMMENTARY.filter(item => item.category === 'Recovery');
  } else {
    pool = CHESS_COMMENTARY.filter(item => item.category === 'Accuracy');
  }
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex] || CHESS_COMMENTARY[0];
}
