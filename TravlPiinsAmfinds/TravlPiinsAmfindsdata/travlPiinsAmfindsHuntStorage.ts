import AsyncStorage from '@react-native-async-storage/async-storage';

const travlPiinsAmfindsHuntPhotosKey = '@travlPiinsAmfinds/huntBoardPhotos/v1';

export type TravlPiinsAmfindsHuntPhoto = {
  travlPiinsAmfindsId: string;
  travlPiinsAmfindsTaskId: string;
  travlPiinsAmfindsUri: string;
  travlPiinsAmfindsCreatedAt: number;
};

export async function travlPiinsAmfindsLoadHuntPhotos(): Promise<
  TravlPiinsAmfindsHuntPhoto[]
> {
  try {
    const raw = await AsyncStorage.getItem(travlPiinsAmfindsHuntPhotosKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TravlPiinsAmfindsHuntPhoto[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function travlPiinsAmfindsSaveHuntPhotos(
  photos: TravlPiinsAmfindsHuntPhoto[],
): Promise<void> {
  await AsyncStorage.setItem(
    travlPiinsAmfindsHuntPhotosKey,
    JSON.stringify(photos),
  );
}

export function travlPiinsAmfindsHuntCompletedTaskIds(
  photos: TravlPiinsAmfindsHuntPhoto[],
): Set<string> {
  return new Set(photos.map(p => p.travlPiinsAmfindsTaskId));
}
