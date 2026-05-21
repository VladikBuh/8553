import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ImageStyle,
  type StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useTravlPiinsAmfindsexpllrctx} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsexpllrctx';
import {travlPiinsAmfindsFindLocation} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsLocationsData';
import {travlPiinsAmfindsexpllrDetailFigma} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsexpllrFigmaAssets';
import {travlPiinsAmfindsGetTabBarStyle} from '../TravlPiinsAmfindsnavg/travlPiinsAmfindstabBarStyle';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';

type TravlPiinsAmfindsDetailRoute = RouteProp<
  {TravlPiinsAmfindsexpllrdetail: {travlPiinsAmfindsId: string}},
  'TravlPiinsAmfindsexpllrdetail'
>;

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsGreen = '#26D07C';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsInner = '#373737';
const travlPiinsAmfindsBorder = '#3B3737';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';

function TravlPiinsAmfindsFigmaIcon({
  travlPiinsAmfindsUri,
  travlPiinsAmfindsSize,
  travlPiinsAmfindsStyle,
}: {
  travlPiinsAmfindsUri: string;
  travlPiinsAmfindsSize: number;
  travlPiinsAmfindsStyle?: StyleProp<ImageStyle>;
}) {
  return (
    <Image
      source={{uri: travlPiinsAmfindsUri}}
      style={[
        {width: travlPiinsAmfindsSize, height: travlPiinsAmfindsSize},
        travlPiinsAmfindsStyle,
      ]}
      resizeMode="contain"
    />
  );
}

const TravlPiinsAmfindsexpllrdetail = (): React.JSX.Element | null => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<TravlPiinsAmfindsDetailRoute>();
  const {travlPiinsAmfindsId} = route.params;
  const loc = travlPiinsAmfindsFindLocation(travlPiinsAmfindsId);

  const {
    travlPiinsAmfindsMarkById,
    settravlPiinsAmfindsMarkById,
    travlPiinsAmfindsNotesById,
    settravlPiinsAmfindsNotesById,
    travlPiinsAmfindsNoteDraftById,
    settravlPiinsAmfindsNoteDraftById,
  } = useTravlPiinsAmfindsexpllrctx();

  const [travlPiinsAmfindsAboutExpanded, settravlPiinsAmfindsAboutExpanded] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      const tabNav = navigation.getParent();
      tabNav?.setOptions({tabBarStyle: {display: 'none'}});
      return () =>
        tabNav?.setOptions({
          tabBarStyle: travlPiinsAmfindsGetTabBarStyle(
            travlPiinsAmfindsInsets.bottom,
          ),
        });
    }, [navigation, travlPiinsAmfindsInsets.bottom]),
  );

  useEffect(() => {
    if (!loc) {
      navigation.goBack();
    }
  }, [loc, navigation]);

  if (!loc) {
    return null;
  }

  const travlPiinsAmfindsMark =
    travlPiinsAmfindsMarkById[loc.travlPiinsAmfindsId] ?? 'none';
  const travlPiinsAmfindsNotes =
    travlPiinsAmfindsNotesById[loc.travlPiinsAmfindsId] ?? [];
  const travlPiinsAmfindsDraft =
    travlPiinsAmfindsNoteDraftById[loc.travlPiinsAmfindsId] ?? '';

  const travlPiinsAmfindsSetMark = (m: 'want' | 'visited') => {
    settravlPiinsAmfindsMarkById(prev => {
      const cur = prev[loc.travlPiinsAmfindsId] ?? 'none';
      const next = cur === m ? 'none' : m;
      return {...prev, [loc.travlPiinsAmfindsId]: next};
    });
  };

  const travlPiinsAmfindsAddNote = () => {
    const t = travlPiinsAmfindsDraft.trim();
    if (!t) {
      return;
    }
    const n = {
      travlPiinsAmfindsNoteId: `${Date.now()}`,
      travlPiinsAmfindsText: t,
      travlPiinsAmfindsAt: Date.now(),
    };
    settravlPiinsAmfindsNotesById(prev => ({
      ...prev,
      [loc.travlPiinsAmfindsId]: [...(prev[loc.travlPiinsAmfindsId] ?? []), n],
    }));
    settravlPiinsAmfindsNoteDraftById(prev => ({
      ...prev,
      [loc.travlPiinsAmfindsId]: '',
    }));
  };

  const travlPiinsAmfindsRemoveNote = (travlPiinsAmfindsNoteId: string) => {
    settravlPiinsAmfindsNotesById(prev => ({
      ...prev,
      [loc.travlPiinsAmfindsId]: (prev[loc.travlPiinsAmfindsId] ?? []).filter(
        x => x.travlPiinsAmfindsNoteId !== travlPiinsAmfindsNoteId,
      ),
    }));
  };

  const travlPiinsAmfindsSharePlace = async () => {
    try {
      await Share.share({
        message: `${loc.travlPiinsAmfindsTitle} — ${loc.travlPiinsAmfindsCountry}`,
        title: loc.travlPiinsAmfindsTitle,
      });
    } catch {
      console.log('Error sharing place');
    }
  };

  const travlPiinsAmfindsOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${loc.travlPiinsAmfindsLat},${loc.travlPiinsAmfindsLng}`;
    Linking.openURL(url);
  };

  return (
    <TravlPiinsAmfindslayt bounce={false}>
      <View style={{paddingBottom: 50}}>
        <View style={styles.travlPiinsAmfindsHeroWrap}>
          <ImageBackground
            source={loc.travlPiinsAmfindsImage}
            style={styles.travlPiinsAmfindsHeroImg}
            resizeMode="cover">
            <LinearGradient
              colors={[
                'rgba(7,21,42,0.5)',
                'rgba(0,0,0,0)',
                'rgba(0, 0, 0, 0.9)',
              ]}
              locations={[0, 0.4, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.travlPiinsAmfindsHeroNav}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsCircleBtn,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={require('../../assets/imgs/backIcon.png')}
                />
              </Pressable>
              <Pressable
                onPress={travlPiinsAmfindsSharePlace}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsCircleBtn,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={require('../../assets/imgs/shareIcon.png')}
                />
              </Pressable>
            </View>

            <View style={styles.travlPiinsAmfindsHeroTitles}>
              <Text style={styles.travlPiinsAmfindsDetailTitle}>
                {loc.travlPiinsAmfindsTitle}
              </Text>
              <View style={styles.travlPiinsAmfindsHeroCountryRow}>
                <Image
                  source={require('../../assets/imgs/locationPin.png')}
                />
                <Text style={styles.travlPiinsAmfindsHeroCountry}>
                  {loc.travlPiinsAmfindsCountry}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.travlPiinsAmfindsDetailBody}>
          <View style={styles.travlPiinsAmfindsMarkCard}>
            <Text style={styles.travlPiinsAmfindsMarkLabel}>
              MARK THIS PLACE
            </Text>
            <View style={styles.travlPiinsAmfindsMarkRow}>
              <Pressable
                onPress={() => travlPiinsAmfindsSetMark('want')}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsMarkBtn,
                  travlPiinsAmfindsMark === 'want'
                    ? styles.travlPiinsAmfindsMarkWantOn
                    : styles.travlPiinsAmfindsMarkOff,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={
                    travlPiinsAmfindsMark === 'want'
                      ? require('../../assets/imgs/likedIcon.png')
                      : require('../../assets/imgs/likeIcon.png')
                  }
                />
                <Text
                  style={
                    travlPiinsAmfindsMark === 'want'
                      ? styles.travlPiinsAmfindsMarkBtnTextOn
                      : styles.travlPiinsAmfindsMarkBtnTextOff
                  }>
                  Want to Visit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => travlPiinsAmfindsSetMark('visited')}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsMarkBtn,
                  travlPiinsAmfindsMark === 'visited'
                    ? styles.travlPiinsAmfindsMarkVisitedOn
                    : styles.travlPiinsAmfindsMarkOff,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={
                    travlPiinsAmfindsMark === 'visited'
                      ? require('../../assets/imgs/visitedIcon.png')
                      : require('../../assets/imgs/visitIcon.png')
                  }
                />
                <Text
                  style={
                    travlPiinsAmfindsMark === 'visited'
                      ? styles.travlPiinsAmfindsMarkVisitedTextOn
                      : styles.travlPiinsAmfindsMarkBtnTextOff
                  }>
                  Visited
                </Text>
              </Pressable>
            </View>
            {travlPiinsAmfindsMark === 'want' ? (
              <Text style={styles.travlPiinsAmfindsMarkStatusWant}>
                ♥ Added to Want to Visit!
              </Text>
            ) : null}
            {travlPiinsAmfindsMark === 'visited' ? (
              <Text style={styles.travlPiinsAmfindsMarkStatusVisited}>
                ✓ Marked as Visited!
              </Text>
            ) : null}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.travlPiinsAmfindsTagRow}>
              {loc.travlPiinsAmfindsTags.map(tag => (
                <View key={tag} style={styles.travlPiinsAmfindsTagPill}>
                  <Text style={styles.travlPiinsAmfindsTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.travlPiinsAmfindsRegionRow}>
            <TravlPiinsAmfindsFigmaIcon
              travlPiinsAmfindsUri={
                travlPiinsAmfindsexpllrDetailFigma.travlPiinsAmfindsPinRegion
                  .uri
              }
              travlPiinsAmfindsSize={14}
            />
            <Text style={styles.travlPiinsAmfindsRegionText}>
              {loc.travlPiinsAmfindsRegion}
            </Text>
          </View>

          <View style={styles.travlPiinsAmfindsAboutCard}>
            <Text style={styles.travlPiinsAmfindsAboutTitle}>
              About this place
            </Text>
            <Text
              style={styles.travlPiinsAmfindsAboutBody}
              numberOfLines={travlPiinsAmfindsAboutExpanded ? undefined : 4}>
              {loc.travlPiinsAmfindsDescription}
            </Text>
            <Pressable
              onPress={() => settravlPiinsAmfindsAboutExpanded(e => !e)}>
              <Text style={styles.travlPiinsAmfindsReadMore}>
                {travlPiinsAmfindsAboutExpanded ? 'Show less' : 'Read more'}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={travlPiinsAmfindsOpenMaps}
            style={({pressed}) => [
              styles.travlPiinsAmfindsMapBtn,
              pressed && styles.travlPiinsAmfindsPressed,
            ]}>
            <TravlPiinsAmfindsFigmaIcon
              travlPiinsAmfindsUri={
                travlPiinsAmfindsexpllrDetailFigma.travlPiinsAmfindsMap.uri
              }
              travlPiinsAmfindsSize={20}
            />
            <Text style={styles.travlPiinsAmfindsMapBtnText}>View on Map</Text>
          </Pressable>

          <View style={styles.travlPiinsAmfindsNotesCard}>
            <View style={styles.travlPiinsAmfindsNotesHeader}>
              <Image
                source={require('../../assets/imgs/noteIcon.png')}
              />
              <Text style={styles.travlPiinsAmfindsNotesTitle}>Notes</Text>
              <View style={styles.travlPiinsAmfindsNotesBadge}>
                <Text style={styles.travlPiinsAmfindsNotesBadgeText}>
                  {travlPiinsAmfindsNotes.length}
                </Text>
              </View>
            </View>

            <View style={styles.travlPiinsAmfindsNoteInputRow}>
              <View style={styles.travlPiinsAmfindsAvatar}>
                <Text style={styles.travlPiinsAmfindsAvatarText}>YO</Text>
              </View>
              <TextInput
                value={travlPiinsAmfindsDraft}
                onChangeText={t =>
                  settravlPiinsAmfindsNoteDraftById(prev => ({
                    ...prev,
                    [loc.travlPiinsAmfindsId]: t,
                  }))
                }
                placeholder="Share your thoughts..."
                placeholderTextColor="rgba(237,243,252,0.5)"
                style={styles.travlPiinsAmfindsNoteInput}
              />
              <Pressable
                onPress={travlPiinsAmfindsAddNote}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsSendBtn,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={require('../../assets/imgs/shareListIcon.png')}
                />
              </Pressable>
            </View>

            {travlPiinsAmfindsNotes.map(note => (
              <View
                key={note.travlPiinsAmfindsNoteId}
                style={styles.travlPiinsAmfindsNoteItem}>
                <View style={styles.travlPiinsAmfindsAvatarLg}>
                  <Text style={styles.travlPiinsAmfindsAvatarTextLg}>YO</Text>
                </View>
                <View style={styles.travlPiinsAmfindsNoteBody}>
                  <View style={styles.travlPiinsAmfindsNoteMeta}>
                    <Text style={styles.travlPiinsAmfindsNoteYou}>
                      You{'  '}
                      <Text style={styles.travlPiinsAmfindsNoteTime}>
                        Just now
                      </Text>
                    </Text>
                    <Pressable
                      onPress={() =>
                        travlPiinsAmfindsRemoveNote(
                          note.travlPiinsAmfindsNoteId,
                        )
                      }>
                      <Image
                        source={require('../../assets/imgs/deleteIcon.png')}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.travlPiinsAmfindsNoteContent}>
                    {note.travlPiinsAmfindsText}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsexpllrdetail;

const styles = StyleSheet.create({
  travlPiinsAmfindsPressed: {opacity: 0.9},
  travlPiinsAmfindsHeroWrap: {height: 320},
  travlPiinsAmfindsHeroImg: {flex: 1, justifyContent: 'space-between'},
  travlPiinsAmfindsHeroNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 58,
  },
  travlPiinsAmfindsCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsCard,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsHeroTitles: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  travlPiinsAmfindsDetailTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 30,
    fontWeight: '800',
  },
  travlPiinsAmfindsHeroCountryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  travlPiinsAmfindsHeroCountry: {color: travlPiinsAmfindsMuted, fontSize: 13},
  travlPiinsAmfindsDetailBody: {paddingHorizontal: 20, paddingTop: 20, gap: 20},
  travlPiinsAmfindsMarkCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 16,
    gap: 12,
  },
  travlPiinsAmfindsMarkLabel: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  travlPiinsAmfindsMarkRow: {flexDirection: 'row', gap: 10},
  travlPiinsAmfindsMarkBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },
  travlPiinsAmfindsMarkOff: {
    backgroundColor: travlPiinsAmfindsInner,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsMarkWantOn: {backgroundColor: travlPiinsAmfindsOrange},
  travlPiinsAmfindsMarkVisitedOn: {backgroundColor: travlPiinsAmfindsGreen},
  travlPiinsAmfindsMarkBtnTextOn: {
    color: '#111',
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsMarkVisitedTextOn: {
    color: '#07152a',
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsMarkBtnTextOff: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsMarkStatusWant: {
    color: travlPiinsAmfindsOrange,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  travlPiinsAmfindsMarkStatusVisited: {
    color: travlPiinsAmfindsGreen,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  travlPiinsAmfindsIconMuted: {opacity: 0.55},
  travlPiinsAmfindsTagRow: {flexDirection: 'row', gap: 8, paddingHorizontal: 4},
  travlPiinsAmfindsTagPill: {
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,196,168,0.19)',
  },
  travlPiinsAmfindsTagText: {
    color: travlPiinsAmfindsOrange,
    fontSize: 12,
    fontWeight: '600',
  },
  travlPiinsAmfindsRegionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travlPiinsAmfindsRegionText: {color: travlPiinsAmfindsMuted, fontSize: 13},
  travlPiinsAmfindsAboutCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 18,
    gap: 8,
  },
  travlPiinsAmfindsAboutTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsAboutBody: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    lineHeight: 23,
  },
  travlPiinsAmfindsReadMore: {
    color: travlPiinsAmfindsOrange,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  travlPiinsAmfindsMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: travlPiinsAmfindsOrange,
    borderRadius: 16,
    paddingVertical: 16,
  },
  travlPiinsAmfindsMapBtnText: {color: '#111', fontSize: 16, fontWeight: '700'},
  travlPiinsAmfindsNotesCard: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 19,
    gap: 16,
  },
  travlPiinsAmfindsNotesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  travlPiinsAmfindsNotesTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsNotesBadge: {
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  travlPiinsAmfindsNotesBadgeText: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  travlPiinsAmfindsNoteInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  travlPiinsAmfindsAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: travlPiinsAmfindsOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsAvatarText: {color: '#111', fontSize: 12, fontWeight: '700'},
  travlPiinsAmfindsNoteInput: {
    flex: 1,
    color: travlPiinsAmfindsTitleC,
    fontSize: 14,
  },
  travlPiinsAmfindsSendBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: travlPiinsAmfindsOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsNoteItem: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 14,
  },
  travlPiinsAmfindsAvatarLg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: travlPiinsAmfindsOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsAvatarTextLg: {
    color: '#07152a',
    fontSize: 12,
    fontWeight: '700',
  },
  travlPiinsAmfindsNoteBody: {flex: 1, gap: 4},
  travlPiinsAmfindsNoteMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  travlPiinsAmfindsNoteYou: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 13,
    fontWeight: '700',
  },
  travlPiinsAmfindsNoteTime: {
    color: travlPiinsAmfindsMuted,
    fontSize: 11,
    fontWeight: '400',
  },
  travlPiinsAmfindsNoteDelete: {fontSize: 16},
  travlPiinsAmfindsNoteContent: {color: travlPiinsAmfindsTitleC, fontSize: 13},
});
