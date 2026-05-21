import type {ImageSourcePropType} from 'react-native';

const travlPiinsAmfindsPlaceholder: ImageSourcePropType = require('../../assets/imgs/appBackground.png');

export const travlPiinsAmfindsLocationImageMap: Partial<
  Record<string, ImageSourcePropType>
> = {};

export function travlPiinsAmfindsResolveLocationImage(
  travlPiinsAmfindsId: string,
): ImageSourcePropType {
  return (
    travlPiinsAmfindsLocationImageMap[travlPiinsAmfindsId] ??
    travlPiinsAmfindsPlaceholder
  );
}
