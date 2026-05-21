import AsyncStorage from '@react-native-async-storage/async-storage';

const travlPiinsAmfindsQuizBestKey = '@travlPiinsAmfinds/quizBest/v1';

export type TravlPiinsAmfindsQuizBest = {
  travlPiinsAmfindsBestScore: number;
  travlPiinsAmfindsBestTimeSec: number;
};

export async function travlPiinsAmfindsLoadQuizBest(): Promise<TravlPiinsAmfindsQuizBest | null> {
  try {
    const raw = await AsyncStorage.getItem(travlPiinsAmfindsQuizBestKey);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as TravlPiinsAmfindsQuizBest;
    if (
      typeof parsed.travlPiinsAmfindsBestScore === 'number' &&
      typeof parsed.travlPiinsAmfindsBestTimeSec === 'number'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function travlPiinsAmfindsSaveQuizBest(
  best: TravlPiinsAmfindsQuizBest,
): Promise<void> {
  await AsyncStorage.setItem(travlPiinsAmfindsQuizBestKey, JSON.stringify(best));
}

export async function travlPiinsAmfindsUpdateQuizBest(
  score: number,
  timeSec: number,
): Promise<TravlPiinsAmfindsQuizBest> {
  const prev = await travlPiinsAmfindsLoadQuizBest();
  const next: TravlPiinsAmfindsQuizBest = prev
    ? {...prev}
    : {travlPiinsAmfindsBestScore: 0, travlPiinsAmfindsBestTimeSec: timeSec};

  if (score > next.travlPiinsAmfindsBestScore) {
    next.travlPiinsAmfindsBestScore = score;
    next.travlPiinsAmfindsBestTimeSec = timeSec;
  } else if (
    score === next.travlPiinsAmfindsBestScore &&
    timeSec < next.travlPiinsAmfindsBestTimeSec
  ) {
    next.travlPiinsAmfindsBestTimeSec = timeSec;
  }

  await travlPiinsAmfindsSaveQuizBest(next);
  return next;
}
