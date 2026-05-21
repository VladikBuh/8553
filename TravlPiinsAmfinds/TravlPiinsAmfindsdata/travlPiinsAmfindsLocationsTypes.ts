import {ImageSourcePropType} from 'react-native';

export type travlPiinsAmfindsExploreChip =
  | 'All'
  | 'Island'
  | 'Historic'
  | 'Adventure'
  | 'Luxury';

export type travlPiinsAmfindsLocationRow = {
  travlPiinsAmfindsId: string;
  travlPiinsAmfindsTitle: string;
  travlPiinsAmfindsImage: ImageSourcePropType;
  travlPiinsAmfindsCountry: string;
  travlPiinsAmfindsCity: string;
  travlPiinsAmfindsRegion: string;
  travlPiinsAmfindsLat: number;
  travlPiinsAmfindsLng: number;
  travlPiinsAmfindsTags: string[];

  travlPiinsAmfindsChips: Exclude<travlPiinsAmfindsExploreChip, 'All'>[];
  travlPiinsAmfindsDescription: string;
};
