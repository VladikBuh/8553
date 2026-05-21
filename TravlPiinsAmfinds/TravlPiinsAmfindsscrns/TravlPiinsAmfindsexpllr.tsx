import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo, useRef, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  travlPiinsAmfindsExploreChipRow,
  travlPiinsAmfindsLocationsList,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsLocationsData';
import type {
  travlPiinsAmfindsExploreChip,
  travlPiinsAmfindsLocationRow,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsLocationsTypes';
import type {TravlPiinsAmfindsExploreStackParamList} from '../TravlPiinsAmfindsnavg/TravlPiinsAmfindsexpllrstack';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsInner = '#373737';
const travlPiinsAmfindsBorder = '#3B3737';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';

function travlPiinsAmfindsSnippet(
  travlPiinsAmfindsText: string,
  travlPiinsAmfindsLen: number,
) {
  const t = travlPiinsAmfindsText.trim();
  if (t.length <= travlPiinsAmfindsLen) {
    return t;
  }
  return `${t.slice(0, travlPiinsAmfindsLen).trim()}…`;
}

const TravlPiinsAmfindsexpllr = (): React.JSX.Element => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const travlPiinsAmfindsNavigation =
    useNavigation<
      StackNavigationProp<
        TravlPiinsAmfindsExploreStackParamList,
        'TravlPiinsAmfindsexpllrList'
      >
    >();
  const travlPiinsAmfindsListScrollRef = useRef<ScrollView>(null);
  const [travlPiinsAmfindsAllDestY, settravlPiinsAmfindsAllDestY] = useState(0);
  const [travlPiinsAmfindsSearch, settravlPiinsAmfindsSearch] = useState('');
  const [travlPiinsAmfindsChip, settravlPiinsAmfindsChip] =
    useState<travlPiinsAmfindsExploreChip>('All');

  const travlPiinsAmfindsFiltered = useMemo(() => {
    const q = travlPiinsAmfindsSearch.trim().toLowerCase();
    return travlPiinsAmfindsLocationsList.filter(loc => {
      if (
        travlPiinsAmfindsChip !== 'All' &&
        !loc.travlPiinsAmfindsChips.includes(travlPiinsAmfindsChip)
      ) {
        return false;
      }
      if (!q) {
        return true;
      }
      const hay = [
        loc.travlPiinsAmfindsTitle,
        loc.travlPiinsAmfindsCountry,
        loc.travlPiinsAmfindsCity,
        loc.travlPiinsAmfindsRegion,
        ...loc.travlPiinsAmfindsTags,
        loc.travlPiinsAmfindsDescription,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [travlPiinsAmfindsSearch, travlPiinsAmfindsChip]);

  const travlPiinsAmfindsTopPick = useMemo(
    () => travlPiinsAmfindsFiltered.slice(0, 8),
    [travlPiinsAmfindsFiltered],
  );

  const travlPiinsAmfindsOpenDetail = (travlPiinsAmfindsId: string) => {
    travlPiinsAmfindsNavigation.navigate('TravlPiinsAmfindsexpllrdetail', {
      travlPiinsAmfindsId,
    });
  };

  const travlPiinsAmfindsOnFilter = () => {
    Alert.alert('Filters', 'Use category chips or the search field.');
  };

  const travlPiinsAmfindsSeeAllTop = () => {
    travlPiinsAmfindsListScrollRef.current?.scrollTo({
      y: Math.max(0, travlPiinsAmfindsAllDestY - 12),
      animated: true,
    });
  };

  const travlPiinsAmfindsRenderListCard = (
    item: travlPiinsAmfindsLocationRow,
  ) => (
    <Pressable
      key={item.travlPiinsAmfindsId}
      onPress={() => travlPiinsAmfindsOpenDetail(item.travlPiinsAmfindsId)}
      style={({pressed}) => [
        styles.travlPiinsAmfindsRowCard,
        pressed && styles.travlPiinsAmfindsPressed,
      ]}>
      <Image
        source={item.travlPiinsAmfindsImage}
        style={styles.travlPiinsAmfindsRowThumb}
      />
      <View style={styles.travlPiinsAmfindsRowContent}>
        <Text style={styles.travlPiinsAmfindsRowTitle}>
          {item.travlPiinsAmfindsTitle}
        </Text>
        <View style={styles.travlPiinsAmfindsRowSub}>
          <Image source={require('../../assets/imgs/locationPin.png')} />
          <Text style={styles.travlPiinsAmfindsRowCountry}>
            {item.travlPiinsAmfindsCountry}
          </Text>
        </View>
        <Text style={styles.travlPiinsAmfindsRowDesc} numberOfLines={2}>
          {travlPiinsAmfindsSnippet(item.travlPiinsAmfindsDescription, 110)}
        </Text>
        <View style={styles.travlPiinsAmfindsRowTags}>
          {item.travlPiinsAmfindsTags.slice(0, 3).map(t => (
            <View key={t} style={styles.travlPiinsAmfindsRowTag}>
              <Text style={styles.travlPiinsAmfindsRowTagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );

  return (
    <TravlPiinsAmfindslayt
      scrollRef={travlPiinsAmfindsListScrollRef}
      bounce={false}>
      <View
        style={[
          styles.travlPiinsAmfindsRoot,
          {
            paddingTop: travlPiinsAmfindsInsets.top,
            paddingBottom: 24 + travlPiinsAmfindsInsets.bottom,
          },
        ]}>
        <View style={styles.travlPiinsAmfindsListHeader}>
          <View style={styles.travlPiinsAmfindsListTitleRow}>
            <View>
              <Text style={styles.travlPiinsAmfindsListSubtitle}>
                Explore the World
              </Text>
              <Text style={styles.travlPiinsAmfindsListTitle}>
                Amazing Finds
              </Text>
            </View>
            <View style={styles.travlPiinsAmfindsFilterBtn}>
              <Image
                source={require('../../assets/imgs/homeIcon.png')}
              />
            </View>
          </View>
          <View style={styles.travlPiinsAmfindsSearchRow}>
            <Image source={require('../../assets/imgs/searchIcon.png')} />
            <TextInput
              value={travlPiinsAmfindsSearch}
              onChangeText={settravlPiinsAmfindsSearch}
              placeholder="Search destinations, countries..."
              placeholderTextColor="rgba(237,243,252,0.5)"
              style={styles.travlPiinsAmfindsSearchInput}
            />
          </View>
        </View>

        <View style={styles.travlPiinsAmfindsTopSection}>
          <View style={styles.travlPiinsAmfindsTopHeader}>
            <View style={styles.travlPiinsAmfindsTopHeaderLeft}>
              <Image
                source={require('../../assets/imgs/ratingIcon.png')}
              />
              <Text style={styles.travlPiinsAmfindsTopTitle}>
                Top Locations
              </Text>
            </View>
            <Pressable onPress={travlPiinsAmfindsSeeAllTop}>
              <Text style={styles.travlPiinsAmfindsSeeAll}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.travlPiinsAmfindsTopScroll}>
            {travlPiinsAmfindsTopPick.map(item => (
              <Pressable
                key={item.travlPiinsAmfindsId}
                onPress={() =>
                  travlPiinsAmfindsOpenDetail(item.travlPiinsAmfindsId)
                }
                style={({pressed}) => [
                  styles.travlPiinsAmfindsTopCard,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <ImageBackground
                  source={item.travlPiinsAmfindsImage}
                  style={styles.travlPiinsAmfindsTopCardBg}
                  imageStyle={styles.travlPiinsAmfindsTopCardImg}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(7,21,42,0.92)']}
                    locations={[0.3, 1]}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.travlPiinsAmfindsTopCardText}>
                    <Text style={styles.travlPiinsAmfindsTopCardTitle}>
                      {item.travlPiinsAmfindsTitle}
                    </Text>
                    <Text style={styles.travlPiinsAmfindsTopCardCountry}>
                      {item.travlPiinsAmfindsCountry}
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.travlPiinsAmfindsChipsScroll}>
          {travlPiinsAmfindsExploreChipRow.map(chip => {
            const travlPiinsAmfindsOn = travlPiinsAmfindsChip === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => settravlPiinsAmfindsChip(chip)}
                style={[
                  styles.travlPiinsAmfindsChip,
                  travlPiinsAmfindsOn
                    ? styles.travlPiinsAmfindsChipOn
                    : styles.travlPiinsAmfindsChipOff,
                ]}>
                <Text
                  style={
                    travlPiinsAmfindsOn
                      ? styles.travlPiinsAmfindsChipTextOn
                      : styles.travlPiinsAmfindsChipTextOff
                  }>
                  {chip}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View
          onLayout={e => settravlPiinsAmfindsAllDestY(e.nativeEvent.layout.y)}>
          <Text style={styles.travlPiinsAmfindsAllTitle}>All Destinations</Text>
        </View>
        {travlPiinsAmfindsFiltered.map(travlPiinsAmfindsRenderListCard)}
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsexpllr;

const styles = StyleSheet.create({
  travlPiinsAmfindsRoot: {flex: 1},
  travlPiinsAmfindsPressed: {opacity: 0.9},
  travlPiinsAmfindsListHeader: {paddingHorizontal: 20, paddingTop: 16, gap: 16},
  travlPiinsAmfindsListTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  travlPiinsAmfindsListSubtitle: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  travlPiinsAmfindsListTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 2,
  },
  travlPiinsAmfindsFilterBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsInner,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    paddingHorizontal: 17,
    paddingVertical: 13,
  },
  travlPiinsAmfindsSearchInput: {
    flex: 1,
    color: travlPiinsAmfindsTitleC,
    fontSize: 15,
  },
  travlPiinsAmfindsTopSection: {marginTop: 20, gap: 12},
  travlPiinsAmfindsTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  travlPiinsAmfindsTopHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travlPiinsAmfindsTopTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsSeeAll: {
    color: travlPiinsAmfindsOrange,
    fontSize: 13,
    fontWeight: '600',
  },
  travlPiinsAmfindsTopScroll: {paddingLeft: 20, paddingRight: 8, gap: 14},
  travlPiinsAmfindsTopCard: {
    width: 160,
    height: 200,
    borderRadius: 18,
    overflow: 'hidden',
  },
  travlPiinsAmfindsTopCardBg: {flex: 1, justifyContent: 'flex-end'},
  travlPiinsAmfindsTopCardImg: {borderRadius: 18},
  travlPiinsAmfindsTopCardText: {
    padding: 12,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  travlPiinsAmfindsTopCardTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  travlPiinsAmfindsTopCardCountry: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 4,
  },
  travlPiinsAmfindsChipsScroll: {paddingHorizontal: 20, paddingTop: 20, gap: 8},
  travlPiinsAmfindsChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 4,
  },
  travlPiinsAmfindsChipOn: {backgroundColor: travlPiinsAmfindsOrange},
  travlPiinsAmfindsChipOff: {
    backgroundColor: travlPiinsAmfindsInner,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsChipTextOn: {color: '#111', fontSize: 13, fontWeight: '600'},
  travlPiinsAmfindsChipTextOff: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  travlPiinsAmfindsAllTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  travlPiinsAmfindsRowCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 14,
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#3B3737',
  },
  travlPiinsAmfindsRowThumb: {
    width: 92,
    height: 92,
    borderRadius: 16,
    backgroundColor: travlPiinsAmfindsInner,
  },
  travlPiinsAmfindsRowContent: {flex: 1, gap: 4},
  travlPiinsAmfindsRowTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsRowSub: {flexDirection: 'row', alignItems: 'center', gap: 4},
  travlPiinsAmfindsRowCountry: {color: travlPiinsAmfindsMuted, fontSize: 12},
  travlPiinsAmfindsRowDesc: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  travlPiinsAmfindsRowTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  travlPiinsAmfindsRowTag: {
    backgroundColor: '#373737',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsRowTagText: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '600',
  },
});
