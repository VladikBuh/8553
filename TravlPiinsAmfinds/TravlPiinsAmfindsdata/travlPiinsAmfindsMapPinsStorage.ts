import AsyncStorage from '@react-native-async-storage/async-storage';

const travlPiinsAmfindsCustomPinsKey =
  '@travlPiinsAmfinds/customMapPins/v1';

export type TravlPiinsAmfindsCustomMapPin = {
  travlPiinsAmfindsId: string;
  travlPiinsAmfindsTitle: string;
  travlPiinsAmfindsDescription: string;
  travlPiinsAmfindsLat: number;
  travlPiinsAmfindsLng: number;
  travlPiinsAmfindsStatus: 'want' | 'visited';
  travlPiinsAmfindsCreatedAt: number;
};

export async function travlPiinsAmfindsLoadCustomPins(): Promise<
  TravlPiinsAmfindsCustomMapPin[]
> {
  try {
    const raw = await AsyncStorage.getItem(travlPiinsAmfindsCustomPinsKey);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as TravlPiinsAmfindsCustomMapPin[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function travlPiinsAmfindsSaveCustomPins(
  pins: TravlPiinsAmfindsCustomMapPin[],
): Promise<void> {
  await AsyncStorage.setItem(
    travlPiinsAmfindsCustomPinsKey,
    JSON.stringify(pins),
  );
}
