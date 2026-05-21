import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {
  travlPiinsAmfindsArticlesList,
  travlPiinsAmfindsGetFeaturedArticle,
  type TravlPiinsAmfindsArticleRow,
} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsArticlesData';
import type {TravlPiinsAmfindsArticlesStackParamList} from '../TravlPiinsAmfindsnavg/TravlPiinsAmfindsexpllrstack';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsMuted = '#6B7278';
const travlPiinsAmfindsTitleC = '#EDF3FC';

function travlPiinsAmfindsSnippet(
  travlPiinsAmfindsText: string,
  travlPiinsAmfindsLen: number,
) {
  const t = travlPiinsAmfindsText.trim().replace(/\s+/g, ' ');
  if (t.length <= travlPiinsAmfindsLen) {
    return t;
  }
  return `${t.slice(0, travlPiinsAmfindsLen).trim()}…`;
}

const TravlPiinsAmfindsartcls = (): React.JSX.Element => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const travlPiinsAmfindsNavigation =
    useNavigation<
      StackNavigationProp<
        TravlPiinsAmfindsArticlesStackParamList,
        'TravlPiinsAmfindsartclsList'
      >
    >();

  const travlPiinsAmfindsFeatured = useMemo(
    () => travlPiinsAmfindsGetFeaturedArticle(),
    [],
  );

  const travlPiinsAmfindsRest = useMemo(
    () =>
      travlPiinsAmfindsArticlesList.filter(
        a =>
          a.travlPiinsAmfindsId !==
          travlPiinsAmfindsFeatured.travlPiinsAmfindsId,
      ),
    [travlPiinsAmfindsFeatured.travlPiinsAmfindsId],
  );

  const travlPiinsAmfindsOpenArticle = (row: TravlPiinsAmfindsArticleRow) => {
    travlPiinsAmfindsNavigation.navigate('TravlPiinsAmfindsartclsdetail', {
      travlPiinsAmfindsArticleId: row.travlPiinsAmfindsId,
    });
  };

  return (
    <TravlPiinsAmfindslayt>
      <View
        style={[
          styles.travlPiinsAmfindsRoot,
          {paddingTop: travlPiinsAmfindsInsets.top},
        ]}>
        <View style={styles.travlPiinsAmfindsHeader}>
          <Text style={styles.travlPiinsAmfindsKicker}>Read & Explore</Text>
          <Text style={styles.travlPiinsAmfindsH1}>Travel Articles</Text>
        </View>

        <View
          style={{
            paddingBottom: 24 + travlPiinsAmfindsInsets.bottom,
          }}>
          <Pressable
            onPress={() =>
              travlPiinsAmfindsOpenArticle(travlPiinsAmfindsFeatured)
            }
            style={({pressed}) => [
              styles.travlPiinsAmfindsFeaturedPress,
              pressed && styles.travlPiinsAmfindsPressed,
            ]}>
            <View style={styles.travlPiinsAmfindsFeaturedCard}>
              <View style={styles.travlPiinsAmfindsGlow} />
              <View style={styles.travlPiinsAmfindsFeatBadge}>
                <Text style={styles.travlPiinsAmfindsFeatBadgeTxt}>
                  FEATURED
                </Text>
              </View>
              <Text style={styles.travlPiinsAmfindsFeatTitle}>
                {travlPiinsAmfindsFeatured.travlPiinsAmfindsTitle}
              </Text>
              <Text style={styles.travlPiinsAmfindsFeatDesc} numberOfLines={3}>
                {travlPiinsAmfindsSnippet(
                  travlPiinsAmfindsFeatured.travlPiinsAmfindsBody,
                  160,
                )}
              </Text>
              <View style={styles.travlPiinsAmfindsReadPill}>
                <Text style={styles.travlPiinsAmfindsReadPillTxt}>Read</Text>
                <Image
                  source={require('../../assets/imgs/radioSelected.png')}
                />
              </View>
            </View>
          </Pressable>

          <Text style={styles.travlPiinsAmfindsCount}>
            {travlPiinsAmfindsRest.length} articles
          </Text>

          {travlPiinsAmfindsRest.map(item => (
            <Pressable
              key={item.travlPiinsAmfindsId}
              onPress={() => travlPiinsAmfindsOpenArticle(item)}
              style={({pressed}) => [
                styles.travlPiinsAmfindsRowCard,
                pressed && styles.travlPiinsAmfindsPressed,
              ]}>
              <View style={styles.travlPiinsAmfindsRowAccent} />
              <View style={styles.travlPiinsAmfindsRowInner}>
                <View style={styles.travlPiinsAmfindsRowTag}>
                  <Text style={styles.travlPiinsAmfindsRowTagTxt}>
                    {item.travlPiinsAmfindsTag}
                  </Text>
                </View>
                <Text style={styles.travlPiinsAmfindsRowTitle}>
                  {item.travlPiinsAmfindsTitle}
                </Text>
                <Text style={styles.travlPiinsAmfindsRowDesc} numberOfLines={2}>
                  {travlPiinsAmfindsSnippet(item.travlPiinsAmfindsBody, 140)}
                </Text>
                <Text style={styles.travlPiinsAmfindsRowMore}>Read more →</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsartcls;

const styles = StyleSheet.create({
  travlPiinsAmfindsRoot: {
    flex: 1,
  },
  travlPiinsAmfindsPressed: {opacity: 0.92},
  travlPiinsAmfindsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 6,
  },
  travlPiinsAmfindsKicker: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  travlPiinsAmfindsH1: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.35,
  },
  travlPiinsAmfindsScroll: {flex: 1},
  travlPiinsAmfindsFeaturedPress: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: 'hidden',
  },
  travlPiinsAmfindsFeaturedCard: {
    borderRadius: 18,
    padding: 20,
    minHeight: 220,
    overflow: 'hidden',
    backgroundColor: '#122848',

    borderWidth: 1,
    borderColor: '#00C4A830',
  },
  travlPiinsAmfindsGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#00C4A815',
    top: -30,
    right: -24,
  },
  travlPiinsAmfindsFeatBadge: {
    alignSelf: 'flex-start',
    backgroundColor: travlPiinsAmfindsOrange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 14,
  },
  travlPiinsAmfindsFeatBadgeTxt: {
    color: '#111',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  travlPiinsAmfindsFeatTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginBottom: 10,
  },
  travlPiinsAmfindsFeatDesc: {
    color: 'rgba(237,243,252,0.72)',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  travlPiinsAmfindsReadPill: {
    alignSelf: 'flex-start',
    backgroundColor: travlPiinsAmfindsOrange,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 14,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  travlPiinsAmfindsReadPillTxt: {
    color: '#111',
    fontSize: 15,
    fontWeight: '700',
  },
  travlPiinsAmfindsCount: {
    color: travlPiinsAmfindsMuted,
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  travlPiinsAmfindsRowCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 18,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  travlPiinsAmfindsRowAccent: {
    width: 4,
    backgroundColor: travlPiinsAmfindsOrange,
  },
  travlPiinsAmfindsRowInner: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  travlPiinsAmfindsRowTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsOrange,
  },
  travlPiinsAmfindsRowTagTxt: {
    color: travlPiinsAmfindsOrange,
    fontSize: 11,
    fontWeight: '700',
  },
  travlPiinsAmfindsRowTitle: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  travlPiinsAmfindsRowDesc: {
    color: travlPiinsAmfindsMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  travlPiinsAmfindsRowMore: {
    color: travlPiinsAmfindsOrange,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
});
