import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, type Region} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {TravlPiinsAmfindsMapStackParamList} from '../TravlPiinsAmfindsnavg/TravlPiinsAmfindsexpllrstack';
import {
  travlPiinsAmfindsLoadCustomPins,
  travlPiinsAmfindsSaveCustomPins,
  type TravlPiinsAmfindsCustomMapPin,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsMapPinsStorage';
import {
  travlPiinsAmfindsFindLocation,
  travlPiinsAmfindsLocationsList,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsLocationsData';
import type {travlPiinsAmfindsLocationRow} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsLocationsTypes';
import {useTravlPiinsAmfindsexpllrctx} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsexpllrctx';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';
import Orientation from 'react-native-orientation-locker';

const travlPiinsAmfindsCOrange = '#F0A030';
const travlPiinsAmfindsCPurple = '#A78BFA';
const travlPiinsAmfindsCGreen = '#26D07C';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsInner = '#373737';
const travlPiinsAmfindsBorder = '#3B3737';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';
const travlPiinsAmfindsPinLine = '#111111';

const travlPiinsAmfindsMapDarkStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
];

const travlPiinsAmfindsInitialRegion: Region = {
  latitude: 44,
  longitude: 2.5,
  latitudeDelta: 20,
  longitudeDelta: 20,
};

const travlPiinsAmfindsFocusZoomDelta = 0.35;

type TravlPiinsAmfindsMapMainRoute = RouteProp<
  TravlPiinsAmfindsMapStackParamList,
  'TravlPiinsAmfindsmaapMain'
>;

function travlPiinsAmfindsSnippet(travlPiinsAmfindsText: string, len: number) {
  const t = travlPiinsAmfindsText.trim();
  if (t.length <= len) {
    return t;
  }
  return `${t.slice(0, len).trim()}…`;
}

function travlPiinsAmfindsCatalogPinColor(
  mark: 'none' | 'want' | 'visited',
): string {
  if (mark === 'want') {
    return travlPiinsAmfindsCPurple;
  }
  if (mark === 'visited') {
    return travlPiinsAmfindsCGreen;
  }
  return travlPiinsAmfindsCOrange;
}

function travlPiinsAmfindsAndroidPinHue(
  mark: 'none' | 'want' | 'visited',
): 'orange' | 'green' | 'violet' {
  if (mark === 'want') {
    return 'violet';
  }
  if (mark === 'visited') {
    return 'green';
  }
  return 'orange';
}

function travlPiinsAmfindsAndroidCustomPinHue(
  status: 'want' | 'visited',
): 'green' | 'violet' {
  return status === 'visited' ? 'green' : 'violet';
}

function TravlPiinsAmfindsMapPinBubble({
  travlPiinsAmfindsColor,
}: {
  travlPiinsAmfindsColor: string;
}) {
  return (
    <View style={styles.travlPiinsAmfindsPinWrap} pointerEvents="none">
      <View
        style={[
          styles.travlPiinsAmfindsPinHead,
          {backgroundColor: travlPiinsAmfindsColor},
        ]}
      />
      <View
        style={[
          styles.travlPiinsAmfindsPinStem,
          {backgroundColor: travlPiinsAmfindsColor},
        ]}
      />
    </View>
  );
}

const TravlPiinsAmfindsmaap = (): React.JSX.Element => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const travlPiinsAmfindsRoute = useRoute<TravlPiinsAmfindsMapMainRoute>();
  const travlPiinsAmfindsNavigation =
    useNavigation<
      StackNavigationProp<
        TravlPiinsAmfindsMapStackParamList,
        'TravlPiinsAmfindsmaapMain'
      >
    >();
  const travlPiinsAmfindsMapRef = useRef<MapView>(null);

  const {travlPiinsAmfindsMarkById} = useTravlPiinsAmfindsexpllrctx();

  const [travlPiinsAmfindsMapMode, settravlPiinsAmfindsMapMode] = useState<
    'world' | 'pins'
  >('world');
  const [travlPiinsAmfindsRegion, settravlPiinsAmfindsRegion] =
    useState<Region>(travlPiinsAmfindsInitialRegion);
  const [
    travlPiinsAmfindsSelectedCatalogId,
    settravlPiinsAmfindsSelectedCatalogId,
  ] = useState<string | null>(null);
  const [travlPiinsAmfindsCustomPins, settravlPiinsAmfindsCustomPins] =
    useState<TravlPiinsAmfindsCustomMapPin[]>([]);

  const [travlPiinsAmfindsAddOpen, settravlPiinsAmfindsAddOpen] =
    useState(false);
  const [travlPiinsAmfindsAddTitle, settravlPiinsAmfindsAddTitle] =
    useState('');
  const [travlPiinsAmfindsAddDesc, settravlPiinsAmfindsAddDesc] = useState('');
  const [travlPiinsAmfindsAddStatus, settravlPiinsAmfindsAddStatus] = useState<
    'want' | 'visited'
  >('want');
  const [travlPiinsAmfindsDraftCoord, settravlPiinsAmfindsDraftCoord] =
    useState({
      latitude: travlPiinsAmfindsInitialRegion.latitude,
      longitude: travlPiinsAmfindsInitialRegion.longitude,
    });

  const [travlPiinsAmfindsDeletePin, settravlPiinsAmfindsDeletePin] =
    useState<TravlPiinsAmfindsCustomMapPin | null>(null);

  useEffect(() => {
    let travlPiinsAmfindsCancelled = false;
    (async () => {
      const list = await travlPiinsAmfindsLoadCustomPins();
      if (!travlPiinsAmfindsCancelled) {
        settravlPiinsAmfindsCustomPins(list);
      }
    })().catch(() => {});
    return () => {
      travlPiinsAmfindsCancelled = true;
    };
  }, []);

  const travlPiinsAmfindsSelectedLoc = useMemo(
    () =>
      travlPiinsAmfindsSelectedCatalogId
        ? travlPiinsAmfindsFindLocation(travlPiinsAmfindsSelectedCatalogId)
        : undefined,
    [travlPiinsAmfindsSelectedCatalogId],
  );

  const travlPiinsAmfindsPersistPins = useCallback(
    async (next: TravlPiinsAmfindsCustomMapPin[]) => {
      settravlPiinsAmfindsCustomPins(next);
      await travlPiinsAmfindsSaveCustomPins(next);
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
      };
    }, []),
  );

  useEffect(() => {
    const travlPiinsAmfindsFocusId =
      travlPiinsAmfindsRoute.params?.travlPiinsAmfindsFocusId;
    if (!travlPiinsAmfindsFocusId) {
      return;
    }
    const loc = travlPiinsAmfindsFindLocation(travlPiinsAmfindsFocusId);
    if (!loc) {
      return;
    }
    const region: Region = {
      latitude: loc.travlPiinsAmfindsLat,
      longitude: loc.travlPiinsAmfindsLng,
      latitudeDelta: travlPiinsAmfindsFocusZoomDelta,
      longitudeDelta: travlPiinsAmfindsFocusZoomDelta,
    };
    settravlPiinsAmfindsMapMode('world');
    settravlPiinsAmfindsAddOpen(false);
    settravlPiinsAmfindsSelectedCatalogId(travlPiinsAmfindsFocusId);
    settravlPiinsAmfindsRegion(region);
    const travlPiinsAmfindsAnimTimer = setTimeout(() => {
      travlPiinsAmfindsMapRef.current?.animateToRegion(region, 450);
    }, 80);
    travlPiinsAmfindsNavigation.setParams({travlPiinsAmfindsFocusId: undefined});
    return () => clearTimeout(travlPiinsAmfindsAnimTimer);
  }, [
    travlPiinsAmfindsNavigation,
    travlPiinsAmfindsRoute.params?.travlPiinsAmfindsFocusId,
  ]);

  const travlPiinsAmfindsOpenAdd = useCallback(() => {
    settravlPiinsAmfindsSelectedCatalogId(null);
    settravlPiinsAmfindsAddTitle('');
    settravlPiinsAmfindsAddDesc('');
    settravlPiinsAmfindsAddStatus('want');
    settravlPiinsAmfindsDraftCoord({
      latitude: travlPiinsAmfindsRegion.latitude,
      longitude: travlPiinsAmfindsRegion.longitude,
    });
    settravlPiinsAmfindsAddOpen(true);
  }, [travlPiinsAmfindsRegion.latitude, travlPiinsAmfindsRegion.longitude]);

  const travlPiinsAmfindsSaveNewPin = useCallback(() => {
    const run = async () => {
      const t = travlPiinsAmfindsAddTitle.trim();
      if (!t) {
        return;
      }
      const pin: TravlPiinsAmfindsCustomMapPin = {
        travlPiinsAmfindsId: `custom-${Date.now()}`,
        travlPiinsAmfindsTitle: t,
        travlPiinsAmfindsDescription: travlPiinsAmfindsAddDesc.trim(),
        travlPiinsAmfindsLat: travlPiinsAmfindsDraftCoord.latitude,
        travlPiinsAmfindsLng: travlPiinsAmfindsDraftCoord.longitude,
        travlPiinsAmfindsStatus: travlPiinsAmfindsAddStatus,
        travlPiinsAmfindsCreatedAt: Date.now(),
      };
      const next = [...travlPiinsAmfindsCustomPins, pin];
      await travlPiinsAmfindsPersistPins(next);
      settravlPiinsAmfindsAddOpen(false);
    };
    run().catch(() => {});
  }, [
    travlPiinsAmfindsAddDesc,
    travlPiinsAmfindsAddStatus,
    travlPiinsAmfindsAddTitle,
    travlPiinsAmfindsCustomPins,
    travlPiinsAmfindsDraftCoord.latitude,
    travlPiinsAmfindsDraftCoord.longitude,
    travlPiinsAmfindsPersistPins,
  ]);

  const travlPiinsAmfindsConfirmDelete = useCallback(() => {
    const run = async () => {
      if (!travlPiinsAmfindsDeletePin) {
        return;
      }
      const next = travlPiinsAmfindsCustomPins.filter(
        p =>
          p.travlPiinsAmfindsId !==
          travlPiinsAmfindsDeletePin.travlPiinsAmfindsId,
      );
      await travlPiinsAmfindsPersistPins(next);
      settravlPiinsAmfindsDeletePin(null);
    };
    run().catch(() => {});
  }, [
    travlPiinsAmfindsCustomPins,
    travlPiinsAmfindsDeletePin,
    travlPiinsAmfindsPersistPins,
  ]);

  const travlPiinsAmfindsFormatAdded = useCallback((at: number) => {
    return `Added ${new Date(at).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}`;
  }, []);

  const travlPiinsAmfindsReadMore = useCallback(() => {
    if (!travlPiinsAmfindsSelectedCatalogId) {
      return;
    }
    travlPiinsAmfindsNavigation.navigate('TravlPiinsAmfindsexpllrdetail', {
      travlPiinsAmfindsId: travlPiinsAmfindsSelectedCatalogId,
    });
  }, [travlPiinsAmfindsNavigation, travlPiinsAmfindsSelectedCatalogId]);

  const travlPiinsAmfindsRenderCatalogMarkers = () =>
    travlPiinsAmfindsLocationsList.map((loc: travlPiinsAmfindsLocationRow) => {
      const m = travlPiinsAmfindsMarkById[loc.travlPiinsAmfindsId] ?? 'none';
      const color = travlPiinsAmfindsCatalogPinColor(m);
      return (
        <Marker
          key={loc.travlPiinsAmfindsId}
          coordinate={{
            latitude: loc.travlPiinsAmfindsLat,
            longitude: loc.travlPiinsAmfindsLng,
          }}
          pinColor={
            Platform.OS === 'android'
              ? travlPiinsAmfindsAndroidPinHue(m)
              : undefined
          }
          tracksViewChanges={Platform.OS !== 'android'}
          onPress={() => {
            settravlPiinsAmfindsSelectedCatalogId(loc.travlPiinsAmfindsId);
          }}>
          {Platform.OS === 'android' ? null : (
            <TravlPiinsAmfindsMapPinBubble travlPiinsAmfindsColor={color} />
          )}
        </Marker>
      );
    });

  const travlPiinsAmfindsRenderCustomMarkers = () =>
    travlPiinsAmfindsCustomPins.map(pin => {
      const color =
        pin.travlPiinsAmfindsStatus === 'visited'
          ? travlPiinsAmfindsCGreen
          : travlPiinsAmfindsCPurple;
      return (
        <Marker
          key={pin.travlPiinsAmfindsId}
          coordinate={{
            latitude: pin.travlPiinsAmfindsLat,
            longitude: pin.travlPiinsAmfindsLng,
          }}
          pinColor={
            Platform.OS === 'android'
              ? travlPiinsAmfindsAndroidCustomPinHue(pin.travlPiinsAmfindsStatus)
              : undefined
          }
          tracksViewChanges={Platform.OS !== 'android'}>
          {Platform.OS === 'android' ? null : (
            <TravlPiinsAmfindsMapPinBubble travlPiinsAmfindsColor={color} />
          )}
        </Marker>
      );
    });

  const travlPiinsAmfindsAddCanSave =
    travlPiinsAmfindsAddTitle.trim().length > 0;

  return (
    <TravlPiinsAmfindslayt>
      <View
        style={[
          styles.travlPiinsAmfindsRoot,
          {paddingTop: travlPiinsAmfindsInsets.top},
        ]}>
        <View style={styles.travlPiinsAmfindsHeader}>
          <Text style={styles.travlPiinsAmfindsH1}>Travel Map</Text>
          <View style={styles.travlPiinsAmfindsSeg}>
            <Pressable
              disabled={travlPiinsAmfindsAddOpen}
              onPress={() => settravlPiinsAmfindsMapMode('world')}
              style={[
                styles.travlPiinsAmfindsSegBtn,
                travlPiinsAmfindsMapMode === 'world' &&
                  styles.travlPiinsAmfindsSegOn,
              ]}>
              <Text
                style={[
                  styles.travlPiinsAmfindsSegTxt,
                  travlPiinsAmfindsMapMode === 'world'
                    ? styles.travlPiinsAmfindsSegTxtOn
                    : styles.travlPiinsAmfindsSegTxtOff,
                ]}>
                🗺️ World Map
              </Text>
            </Pressable>
            <Pressable
              disabled={travlPiinsAmfindsAddOpen}
              onPress={() => {
                settravlPiinsAmfindsMapMode('pins');
                settravlPiinsAmfindsSelectedCatalogId(null);
                settravlPiinsAmfindsAddOpen(false);
              }}
              style={[
                styles.travlPiinsAmfindsSegBtn,
                travlPiinsAmfindsMapMode === 'pins' &&
                  styles.travlPiinsAmfindsSegOn,
              ]}>
              <Text
                style={[
                  styles.travlPiinsAmfindsSegTxt,
                  travlPiinsAmfindsMapMode === 'pins'
                    ? styles.travlPiinsAmfindsSegTxtOn
                    : styles.travlPiinsAmfindsSegTxtOff,
                ]}>
                📌 My Pins ({travlPiinsAmfindsCustomPins.length})
              </Text>
            </Pressable>
          </View>
        </View>

        {travlPiinsAmfindsMapMode === 'world' ? (
          <View style={styles.travlPiinsAmfindsMapOuter}>
            {travlPiinsAmfindsAddOpen ? (
              <View style={styles.travlPiinsAmfindsMapHint}>
                <Text style={styles.travlPiinsAmfindsMapHintTxt}>
                  📍 Tap map to reposition pin
                </Text>
              </View>
            ) : null}
            <MapView
              ref={travlPiinsAmfindsMapRef}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
              userInterfaceStyle="dark"
              style={styles.travlPiinsAmfindsMap}
              initialRegion={travlPiinsAmfindsInitialRegion}
              onRegionChangeComplete={settravlPiinsAmfindsRegion}
              customMapStyle={travlPiinsAmfindsMapDarkStyle}
              onPress={e => {
                if (!travlPiinsAmfindsAddOpen) {
                  return;
                }
                const {latitude, longitude} = e.nativeEvent.coordinate;
                settravlPiinsAmfindsDraftCoord({latitude, longitude});
              }}>
              {travlPiinsAmfindsRenderCatalogMarkers()}
              {travlPiinsAmfindsRenderCustomMarkers()}
              {travlPiinsAmfindsAddOpen ? (
                <Marker
                  coordinate={travlPiinsAmfindsDraftCoord}
                  draggable
                  pinColor={Platform.OS === 'android' ? 'orange' : undefined}
                  onDragEnd={e =>
                    settravlPiinsAmfindsDraftCoord(e.nativeEvent.coordinate)
                  }
                  tracksViewChanges={Platform.OS !== 'android'}>
                  {Platform.OS === 'android' ? null : (
                    <View style={styles.travlPiinsAmfindsDraftDotOut}>
                      <View style={styles.travlPiinsAmfindsDraftDotIn} />
                    </View>
                  )}
                </Marker>
              ) : null}
            </MapView>

            <View style={styles.travlPiinsAmfindsLegend}>
              <View style={styles.travlPiinsAmfindsLegendRow}>
                <View
                  style={[
                    styles.travlPiinsAmfindsLegendDot,
                    {backgroundColor: travlPiinsAmfindsCOrange},
                  ]}
                />
                <Text style={styles.travlPiinsAmfindsLegendTxt}>Locations</Text>
              </View>
              <View style={styles.travlPiinsAmfindsLegendRow}>
                <View
                  style={[
                    styles.travlPiinsAmfindsLegendDot,
                    {backgroundColor: travlPiinsAmfindsCPurple},
                  ]}
                />
                <Text style={styles.travlPiinsAmfindsLegendTxt}>
                  Want to Visit
                </Text>
              </View>
              <View style={styles.travlPiinsAmfindsLegendRow}>
                <View
                  style={[
                    styles.travlPiinsAmfindsLegendDot,
                    {backgroundColor: travlPiinsAmfindsCGreen},
                  ]}
                />
                <Text style={styles.travlPiinsAmfindsLegendTxt}>Visited</Text>
              </View>
            </View>

            {!travlPiinsAmfindsAddOpen ? (
              <Pressable
                onPress={travlPiinsAmfindsOpenAdd}
                style={({pressed}) => [
                  styles.travlPiinsAmfindsFab,
                  pressed && styles.travlPiinsAmfindsPressed,
                ]}>
                <Image
                  source={require('../../assets/imgs/addPinIcon.png')}
                  style={styles.travlPiinsAmfindsFabPlus}
                />
              </Pressable>
            ) : null}

            {travlPiinsAmfindsSelectedLoc &&
            !travlPiinsAmfindsAddOpen &&
            travlPiinsAmfindsMapMode === 'world' ? (
              <View style={styles.travlPiinsAmfindsPreview}>
                <Image
                  source={travlPiinsAmfindsSelectedLoc.travlPiinsAmfindsImage}
                  style={styles.travlPiinsAmfindsPreviewImg}
                />
                <View style={styles.travlPiinsAmfindsPreviewBody}>
                  <Text style={styles.travlPiinsAmfindsPreviewTitle}>
                    {travlPiinsAmfindsSelectedLoc.travlPiinsAmfindsTitle}
                  </Text>
                  <View style={styles.travlPiinsAmfindsPreviewRow}>
                    <Image
                      source={require('../../assets/imgs/locationPin.png')}
                      style={styles.travlPiinsAmfindsPreviewPinIc}
                    />
                    <Text style={styles.travlPiinsAmfindsPreviewSub}>
                      {travlPiinsAmfindsSelectedLoc.travlPiinsAmfindsCountry}
                    </Text>
                  </View>
                  <Text
                    style={styles.travlPiinsAmfindsPreviewDesc}
                    numberOfLines={3}>
                    {travlPiinsAmfindsSnippet(
                      travlPiinsAmfindsSelectedLoc.travlPiinsAmfindsDescription,
                      120,
                    )}
                  </Text>
                  <Pressable onPress={travlPiinsAmfindsReadMore}>
                    <Text style={styles.travlPiinsAmfindsReadMore}>
                      Read more →
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => settravlPiinsAmfindsSelectedCatalogId(null)}
                  style={styles.travlPiinsAmfindsPreviewClose}>
                  <Text style={styles.travlPiinsAmfindsPreviewCloseTxt}>✕</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        ) : (
          <ScrollView
            style={styles.travlPiinsAmfindsPinsScroll}
            contentContainerStyle={{
              paddingBottom: 24 + travlPiinsAmfindsInsets.bottom,
            }}
            showsVerticalScrollIndicator={false}>
            {travlPiinsAmfindsCustomPins.length === 0 ? (
              <View style={styles.travlPiinsAmfindsEmpty}>
                <Text style={styles.travlPiinsAmfindsEmptyIcon}>📍</Text>
                <Text style={styles.travlPiinsAmfindsEmptyTitle}>
                  No custom pins yet
                </Text>
                <Text style={styles.travlPiinsAmfindsEmptySub}>
                  Switch to the World Map and tap + to add your first location.
                </Text>
                <Pressable
                  onPress={() => settravlPiinsAmfindsMapMode('world')}
                  style={({pressed}) => [
                    styles.travlPiinsAmfindsEmptyBtn,
                    pressed && styles.travlPiinsAmfindsPressed,
                  ]}>
                  <Text style={styles.travlPiinsAmfindsEmptyBtnTxt}>
                    Open Map
                  </Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={styles.travlPiinsAmfindsPinsCount}>
                  {travlPiinsAmfindsCustomPins.length} saved location
                  {travlPiinsAmfindsCustomPins.length === 1 ? '' : 's'}
                </Text>
                {travlPiinsAmfindsCustomPins.map(pin => (
                  <View
                    key={pin.travlPiinsAmfindsId}
                    style={styles.travlPiinsAmfindsPinCard}>
                    <View
                      style={[
                        styles.travlPiinsAmfindsPinCardIcon,
                        pin.travlPiinsAmfindsStatus === 'visited'
                          ? styles.travlPiinsAmfindsPinCardIconVis
                          : styles.travlPiinsAmfindsPinCardIconWant,
                      ]}>
                      <Text style={styles.travlPiinsAmfindsPinCardIcTxt}>
                        {pin.travlPiinsAmfindsStatus === 'visited' ? '✓' : '♡'}
                      </Text>
                    </View>
                    <View style={styles.travlPiinsAmfindsPinCardMid}>
                      <Text style={styles.travlPiinsAmfindsPinCardTitle}>
                        {pin.travlPiinsAmfindsTitle}
                      </Text>
                      <Text
                        style={[
                          styles.travlPiinsAmfindsPinCardStatus,
                          pin.travlPiinsAmfindsStatus === 'visited'
                            ? styles.travlPiinsAmfindsStVis
                            : styles.travlPiinsAmfindsStWant,
                        ]}>
                        {pin.travlPiinsAmfindsStatus === 'visited'
                          ? '✓ Visited'
                          : '💜 Want to Visit'}
                      </Text>
                      {pin.travlPiinsAmfindsDescription ? (
                        <Text
                          style={styles.travlPiinsAmfindsPinCardDesc}
                          numberOfLines={2}>
                          {pin.travlPiinsAmfindsDescription}
                        </Text>
                      ) : null}
                      <Text style={styles.travlPiinsAmfindsPinCardDate}>
                        {travlPiinsAmfindsFormatAdded(
                          pin.travlPiinsAmfindsCreatedAt,
                        )}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => settravlPiinsAmfindsDeletePin(pin)}
                      style={styles.travlPiinsAmfindsTrash}>
                      <Image
                        source={require('../../assets/imgs/deleteIcon.png')}
                      />
                    </Pressable>
                  </View>
                ))}
              </>
            )}
          </ScrollView>
        )}

        {travlPiinsAmfindsAddOpen && travlPiinsAmfindsMapMode === 'world' ? (
          <View
            style={styles.travlPiinsAmfindsAddOverlayRoot}
            pointerEvents="box-none">
            <View
              style={styles.travlPiinsAmfindsAddDim}
              pointerEvents="none"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            />
            <View
              style={styles.travlPiinsAmfindsAddSheetWrap}
              pointerEvents="box-none">
              <View
                style={[
                  styles.travlPiinsAmfindsSheet,
                  {paddingBottom: 16 + travlPiinsAmfindsInsets.bottom},
                ]}
                pointerEvents="auto">
                <View style={styles.travlPiinsAmfindsSheetGrabber} />
                <View style={styles.travlPiinsAmfindsSheetHead}>
                  <Text style={styles.travlPiinsAmfindsSheetTitle}>
                    Add Custom Location
                  </Text>
                  <Pressable onPress={() => settravlPiinsAmfindsAddOpen(false)}>
                    <Text style={styles.travlPiinsAmfindsSheetX}>✕</Text>
                  </Pressable>
                </View>
                <Text style={styles.travlPiinsAmfindsSheetHint}>
                  Tap anywhere on the map above to reposition the pin
                </Text>
                <TextInput
                  value={travlPiinsAmfindsAddTitle}
                  onChangeText={settravlPiinsAmfindsAddTitle}
                  placeholder="Location name *"
                  placeholderTextColor="rgba(237,243,252,0.45)"
                  style={styles.travlPiinsAmfindsInput}
                />
                <TextInput
                  value={travlPiinsAmfindsAddDesc}
                  onChangeText={settravlPiinsAmfindsAddDesc}
                  placeholder="Description (optional)"
                  placeholderTextColor="rgba(237,243,252,0.45)"
                  style={[
                    styles.travlPiinsAmfindsInput,
                    styles.travlPiinsAmfindsInputMulti,
                  ]}
                  multiline
                />
                <View style={styles.travlPiinsAmfindsStatusRow}>
                  <Pressable
                    onPress={() => settravlPiinsAmfindsAddStatus('want')}
                    style={[
                      styles.travlPiinsAmfindsStatusBtn,
                      travlPiinsAmfindsAddStatus === 'want'
                        ? styles.travlPiinsAmfindsStatusWantOn
                        : styles.travlPiinsAmfindsStatusOff,
                    ]}>
                    <Text
                      style={[
                        styles.travlPiinsAmfindsStatusBtnTxt,
                        travlPiinsAmfindsAddStatus === 'want'
                          ? styles.travlPiinsAmfindsStatusWantTxtOn
                          : styles.travlPiinsAmfindsStatusBtnTxtMuted,
                      ]}>
                      ♡ Want to Visit
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => settravlPiinsAmfindsAddStatus('visited')}
                    style={[
                      styles.travlPiinsAmfindsStatusBtn,
                      travlPiinsAmfindsAddStatus === 'visited'
                        ? styles.travlPiinsAmfindsStatusVisitedOn
                        : styles.travlPiinsAmfindsStatusOff,
                    ]}>
                    <Text
                      style={[
                        styles.travlPiinsAmfindsStatusBtnTxt,
                        travlPiinsAmfindsAddStatus === 'visited'
                          ? styles.travlPiinsAmfindsStatusVisitedTxtOn
                          : styles.travlPiinsAmfindsStatusBtnTxtMuted,
                      ]}>
                      ✓ Visited
                    </Text>
                  </Pressable>
                </View>
                <Pressable
                  onPress={travlPiinsAmfindsSaveNewPin}
                  disabled={!travlPiinsAmfindsAddCanSave}
                  style={({pressed}) => [
                    styles.travlPiinsAmfindsSaveBtn,
                    !travlPiinsAmfindsAddCanSave &&
                      styles.travlPiinsAmfindsSaveBtnDis,
                    pressed &&
                      travlPiinsAmfindsAddCanSave &&
                      styles.travlPiinsAmfindsPressed,
                  ]}>
                  <Text
                    style={[
                      styles.travlPiinsAmfindsSaveBtnTxt,
                      !travlPiinsAmfindsAddCanSave &&
                        styles.travlPiinsAmfindsSaveBtnTxtDis,
                    ]}>
                    Save Pin to Map
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}

        <Modal
          visible={travlPiinsAmfindsDeletePin !== null}
          transparent
          animationType="fade"
          onRequestClose={() => settravlPiinsAmfindsDeletePin(null)}>
          <View style={styles.travlPiinsAmfindsDelOverlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => settravlPiinsAmfindsDeletePin(null)}
            />
            <View style={styles.travlPiinsAmfindsDelCard}>
              <View style={styles.travlPiinsAmfindsDelIconWrap}>
                <Image source={require('../../assets/imgs/deleteHandle.png')} />
              </View>
              <Text style={styles.travlPiinsAmfindsDelTitle}>Delete Pin?</Text>
              <Text style={styles.travlPiinsAmfindsDelBody}>
                This pin will be permanently removed from your map.
              </Text>
              <View style={styles.travlPiinsAmfindsDelActions}>
                <Pressable
                  onPress={() => settravlPiinsAmfindsDeletePin(null)}
                  style={({pressed}) => [
                    styles.travlPiinsAmfindsDelCancel,
                    pressed && styles.travlPiinsAmfindsPressed,
                  ]}>
                  <Text style={styles.travlPiinsAmfindsDelCancelTxt}>
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={travlPiinsAmfindsConfirmDelete}
                  style={({pressed}) => [
                    styles.travlPiinsAmfindsDelDanger,
                    pressed && styles.travlPiinsAmfindsPressed,
                  ]}>
                  <Text style={styles.travlPiinsAmfindsDelDangerTxt}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsmaap;

const styles = StyleSheet.create({
  travlPiinsAmfindsRoot: {
    flex: 1,

    paddingBottom: 20,
  },
  travlPiinsAmfindsPressed: {opacity: 0.92},
  travlPiinsAmfindsHeader: {paddingHorizontal: 20, gap: 12, paddingBottom: 12},
  travlPiinsAmfindsH1: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.25,
  },
  travlPiinsAmfindsSeg: {
    flexDirection: 'row',
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 5,
    gap: 4,
  },
  travlPiinsAmfindsSegBtn: {
    flex: 1,
    borderRadius: 11,
    minHeight: 41,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  travlPiinsAmfindsSegOn: {backgroundColor: travlPiinsAmfindsCOrange},
  travlPiinsAmfindsSegTxt: {fontSize: 14, fontWeight: '700'},
  travlPiinsAmfindsSegTxtOn: {color: '#111'},
  travlPiinsAmfindsSegTxtOff: {color: travlPiinsAmfindsMuted},
  travlPiinsAmfindsMapOuter: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsMap: {flex: 1},
  travlPiinsAmfindsMapHint: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 5,
    backgroundColor: 'rgba(42,42,42,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsMapHintTxt: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 12,
    fontWeight: '600',
  },
  travlPiinsAmfindsPinWrap: {alignItems: 'center', width: 18},
  travlPiinsAmfindsPinHead: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: travlPiinsAmfindsPinLine,
  },
  travlPiinsAmfindsPinStem: {width: 2, height: 7, marginTop: -1},
  travlPiinsAmfindsDraftDotOut: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: 'rgba(38,208,124,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsDraftDotIn: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: travlPiinsAmfindsCGreen,
  },
  travlPiinsAmfindsLegend: {
    position: 'absolute',
    left: 12,
    bottom: 20,
    zIndex: 4,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    paddingHorizontal: 13,
    paddingVertical: 9,
    gap: 6,
  },
  travlPiinsAmfindsLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  travlPiinsAmfindsLegendDot: {width: 8, height: 8, borderRadius: 4},
  travlPiinsAmfindsLegendTxt: {
    color: travlPiinsAmfindsMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  travlPiinsAmfindsFab: {
    position: 'absolute',
    right: 14,
    bottom: 20,
    zIndex: 3,
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: travlPiinsAmfindsCOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsFabPlus: {
    color: '#111',
    fontSize: 28,
    fontWeight: '400',
    marginTop: -2,
  },
  travlPiinsAmfindsPreview: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 12,
    zIndex: 10,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    flexDirection: 'row',
    padding: 17,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -8},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
  travlPiinsAmfindsPreviewImg: {width: 64, height: 64, borderRadius: 12},
  travlPiinsAmfindsPreviewBody: {flex: 1, gap: 4},
  travlPiinsAmfindsPreviewTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  travlPiinsAmfindsPreviewPinIc: {width: 11, height: 11},
  travlPiinsAmfindsPreviewSub: {color: travlPiinsAmfindsMuted, fontSize: 12},
  travlPiinsAmfindsPreviewDesc: {
    color: travlPiinsAmfindsMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  travlPiinsAmfindsReadMore: {
    color: travlPiinsAmfindsCOrange,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  travlPiinsAmfindsPreviewClose: {padding: 4},
  travlPiinsAmfindsPreviewCloseTxt: {
    color: travlPiinsAmfindsMuted,
    fontSize: 16,
  },
  travlPiinsAmfindsPinsScroll: {flex: 1},
  travlPiinsAmfindsPinsCount: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  travlPiinsAmfindsEmpty: {
    paddingHorizontal: 28,
    paddingTop: 48,
    alignItems: 'center',
    gap: 12,
  },
  travlPiinsAmfindsEmptyIcon: {fontSize: 48, opacity: 0.35},
  travlPiinsAmfindsEmptyTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '700',
  },
  travlPiinsAmfindsEmptySub: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  travlPiinsAmfindsEmptyBtn: {
    marginTop: 8,
    backgroundColor: travlPiinsAmfindsCOrange,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  travlPiinsAmfindsEmptyBtnTxt: {
    color: '#111',
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsPinCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  travlPiinsAmfindsPinCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsPinCardIconWant: {backgroundColor: 'rgba(167,139,250,0.2)'},
  travlPiinsAmfindsPinCardIconVis: {backgroundColor: 'rgba(38,208,124,0.2)'},
  travlPiinsAmfindsPinCardIcTxt: {fontSize: 18},
  travlPiinsAmfindsPinCardMid: {flex: 1, gap: 4},
  travlPiinsAmfindsPinCardTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 16,
    fontWeight: '700',
  },
  travlPiinsAmfindsPinCardStatus: {fontSize: 13, fontWeight: '600'},
  travlPiinsAmfindsStWant: {color: travlPiinsAmfindsCPurple},
  travlPiinsAmfindsStVis: {color: travlPiinsAmfindsCGreen},
  travlPiinsAmfindsPinCardDesc: {color: travlPiinsAmfindsMuted, fontSize: 13},
  travlPiinsAmfindsPinCardDate: {color: travlPiinsAmfindsMuted, fontSize: 12},
  travlPiinsAmfindsTrash: {padding: 4},
  travlPiinsAmfindsTrashTxt: {fontSize: 18},
  travlPiinsAmfindsAddOverlayRoot: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  travlPiinsAmfindsAddDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  travlPiinsAmfindsAddSheetWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 51,
  },
  travlPiinsAmfindsSheet: {
    backgroundColor: '#2A2A2A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 24,
  },
  travlPiinsAmfindsSheetGrabber: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(237,243,252,0.22)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  travlPiinsAmfindsSheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  travlPiinsAmfindsSheetTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '700',
  },
  travlPiinsAmfindsSheetX: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 20,
    fontWeight: '300',
    padding: 4,
  },
  travlPiinsAmfindsSheetHint: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 18,
  },
  travlPiinsAmfindsInput: {
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: travlPiinsAmfindsTitleC,
    fontSize: 15,
    marginBottom: 14,
  },
  travlPiinsAmfindsInputMulti: {minHeight: 72, textAlignVertical: 'top'},
  travlPiinsAmfindsStatusRow: {flexDirection: 'row', gap: 10, marginBottom: 18},
  travlPiinsAmfindsStatusBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  travlPiinsAmfindsStatusOff: {
    backgroundColor: travlPiinsAmfindsInner,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsStatusWantOn: {backgroundColor: '#B197FC'},
  travlPiinsAmfindsStatusVisitedOn: {backgroundColor: travlPiinsAmfindsCGreen},
  travlPiinsAmfindsStatusBtnTxt: {fontSize: 13, fontWeight: '700'},
  travlPiinsAmfindsStatusWantTxtOn: {color: '#111'},
  travlPiinsAmfindsStatusVisitedTxtOn: {color: '#07152a'},
  travlPiinsAmfindsStatusBtnTxtMuted: {color: travlPiinsAmfindsMuted},
  travlPiinsAmfindsSaveBtn: {
    backgroundColor: travlPiinsAmfindsCOrange,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  travlPiinsAmfindsSaveBtnDis: {backgroundColor: travlPiinsAmfindsInner},
  travlPiinsAmfindsSaveBtnTxt: {color: '#111', fontSize: 16, fontWeight: '700'},
  travlPiinsAmfindsSaveBtnTxtDis: {color: travlPiinsAmfindsMuted},
  travlPiinsAmfindsDelOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  travlPiinsAmfindsDelCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
    padding: 22,
    alignItems: 'center',
    gap: 12,
  },
  travlPiinsAmfindsDelIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsDelIcon: {fontSize: 22},
  travlPiinsAmfindsDelTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 18,
    fontWeight: '800',
  },
  travlPiinsAmfindsDelBody: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  travlPiinsAmfindsDelActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 8,
  },
  travlPiinsAmfindsDelCancel: {
    flex: 1,
    backgroundColor: travlPiinsAmfindsInner,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: travlPiinsAmfindsBorder,
  },
  travlPiinsAmfindsDelCancelTxt: {
    color: travlPiinsAmfindsTitleC,
    fontWeight: '700',
  },
  travlPiinsAmfindsDelDanger: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  travlPiinsAmfindsDelDangerTxt: {color: '#fff', fontWeight: '700'},
});
