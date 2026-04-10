import { useUserData } from "./useUserData";

const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

const KIND_ORDER = ["intensity", "speed", "strength", "endurance", "energy", "cardio"];
const KIND_TRANSLATIONS = {
  cardio: "Cardio",
  energy: "Énergie",
  endurance: "Endurance",
  strength: "Force",
  speed: "Vitesse",
  intensity: "Intensité",
};

function formatUserInfo(raw) {
  if (!raw?.data) return null;
  const { userInfos, keyData, score, todayScore } = raw.data;
  return {
    firstName: userInfos.firstName,
    score: score ?? todayScore ?? 0,
    keyData: {
      calorieCount: keyData.calorieCount,
      proteinCount: keyData.proteinCount,
      carbohydrateCount: keyData.carbohydrateCount,
      lipidCount: keyData.lipidCount,
    },
  };
}

function formatActivitySessions(raw) {
  if (!raw?.data?.sessions) return null;
  return raw.data.sessions.map((s) => ({
    day: s.day,
    kilogram: s.kilogram,
    calories: s.calories,
  }));
}

function formatAverageSessions(raw) {
  if (!raw?.data?.sessions) return null;
  return raw.data.sessions.map((s, idx) => ({
    day: DAY_LABELS[idx % 7],
    index: idx,
    sessionLength: s.sessionLength,
  }));
}

function formatPerformance(raw) {
  if (!raw?.data) return null;
  const { kind, data } = raw.data;
  return KIND_ORDER.map((kindName) => {
    const kindId = Object.keys(kind).find((k) => kind[k] === kindName);
    const entry = data.find((d) => String(d.kind) === String(kindId));
    return {
      subject: KIND_TRANSLATIONS[kindName],
      value: entry?.value ?? 0,
    };
  });
}

export function useDashboardData(userId) {
  const { data: rawUser, loading: loadingUser } = useUserData(userId, "");
  const { data: rawActivity, loading: loadingActivity } = useUserData(userId, "/activity");
  const { data: rawAverage, loading: loadingAverage } = useUserData(userId, "/average-sessions");
  const { data: rawPerformance, loading: loadingPerformance } = useUserData(userId, "/performance");

  const loading = loadingUser || loadingActivity || loadingAverage || loadingPerformance;

  return {
    loading,
    userInfo: formatUserInfo(rawUser),
    activitySessions: formatActivitySessions(rawActivity),
    averageSessions: formatAverageSessions(rawAverage),
    performanceData: formatPerformance(rawPerformance),
  };
}
