import {StyleSheet} from 'react-native';

const travlPiinsAmfindstabBarBase = StyleSheet.create({
  bar: {
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 10,
    paddingHorizontal: 6,
    borderTopWidth: 1,
    borderColor: '#3B3737',
    borderTopColor: '#3B3737',
  },
});

export function travlPiinsAmfindsGetTabBarStyle(bottomInset: number) {
  return [
    travlPiinsAmfindstabBarBase.bar,
    {
      height: 88,
      paddingBottom: Math.max(bottomInset, 10),
    },
  ];
}
