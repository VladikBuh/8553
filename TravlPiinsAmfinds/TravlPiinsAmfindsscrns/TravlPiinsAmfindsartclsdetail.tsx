import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {travlPiinsAmfindsFindArticle} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsArticlesData';
import {travlPiinsAmfindsGetTabBarStyle} from '../TravlPiinsAmfindsnavg/travlPiinsAmfindstabBarStyle';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';

type TravlPiinsAmfindsArticleDetailRoute = RouteProp<
  {TravlPiinsAmfindsartclsdetail: {travlPiinsAmfindsArticleId: string}},
  'TravlPiinsAmfindsartclsdetail'
>;

const travlPiinsAmfindsOrange = '#F0A030';
const travlPiinsAmfindsBg = '#121212';
const travlPiinsAmfindsCard = '#2A2A2A';
const travlPiinsAmfindsBtnBg = '#2A2A2A';

const travlPiinsAmfindsTitleC = '#FFFFFF';

const TravlPiinsAmfindsartclsdetail = (): React.JSX.Element | null => {
  const travlPiinsAmfindsInsets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<TravlPiinsAmfindsArticleDetailRoute>();
  const {travlPiinsAmfindsArticleId} = route.params;
  const article = travlPiinsAmfindsFindArticle(travlPiinsAmfindsArticleId);

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
    if (!article) {
      navigation.goBack();
    }
  }, [article, navigation]);

  if (!article) {
    return null;
  }

  const travlPiinsAmfindsParagraphs = article.travlPiinsAmfindsBody
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  const travlPiinsAmfindsOnShare = () => {
    Share.share({
      title: article.travlPiinsAmfindsTitle,
      message: `${article.travlPiinsAmfindsTitle}\n\n${article.travlPiinsAmfindsMainIdea}`,
    }).catch(() => {});
  };

  return (
    <TravlPiinsAmfindslayt>
      <View
        style={[
          styles.travlPiinsAmfindsTopBar,
          {paddingTop: 14 + travlPiinsAmfindsInsets.top},
        ]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({pressed}) => [
            styles.travlPiinsAmfindsRoundBtn,
            pressed && styles.travlPiinsAmfindsPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Back">
          <Image source={require('../../assets/imgs/backIcon.png')} />
        </Pressable>
        <Pressable
          onPress={travlPiinsAmfindsOnShare}
          style={({pressed}) => [
            styles.travlPiinsAmfindsRoundBtn,
            pressed && styles.travlPiinsAmfindsPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Share">
          <Image source={require('../../assets/imgs/shareIcon.png')} />
        </Pressable>
      </View>

      <View
        style={[
          styles.travlPiinsAmfindsScrollContent,
          {paddingBottom: 28 + travlPiinsAmfindsInsets.bottom},
        ]}>
        <View style={styles.travlPiinsAmfindsTag}>
          <Text style={styles.travlPiinsAmfindsTagTxt}>
            {article.travlPiinsAmfindsTag}
          </Text>
        </View>
        <Text style={styles.travlPiinsAmfindsH1}>
          {article.travlPiinsAmfindsTitle}
        </Text>
        <View style={styles.travlPiinsAmfindsIdeaBox}>
          <Text style={styles.travlPiinsAmfindsIdeaTxt}>
            {article.travlPiinsAmfindsMainIdea}
          </Text>
        </View>
        {travlPiinsAmfindsParagraphs.map((para, idx) => (
          <Text key={idx} style={styles.travlPiinsAmfindsBodyPara}>
            {para}
          </Text>
        ))}
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsartclsdetail;

const styles = StyleSheet.create({
  travlPiinsAmfindsRoot: {
    flex: 1,
    backgroundColor: travlPiinsAmfindsBg,
  },
  travlPiinsAmfindsPressed: {opacity: 0.9},
  travlPiinsAmfindsTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 14,
  },
  travlPiinsAmfindsRoundBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: travlPiinsAmfindsBtnBg,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#3B3737',
  },
  travlPiinsAmfindsHeaderIcon: {
    width: 22,
    height: 22,
    tintColor: travlPiinsAmfindsTitleC,
  },
  travlPiinsAmfindsScroll: {flex: 1},
  travlPiinsAmfindsScrollContent: {paddingHorizontal: 20},
  travlPiinsAmfindsTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: travlPiinsAmfindsOrange,
    backgroundColor: '#F0A03020',
    marginBottom: 14,
  },
  travlPiinsAmfindsTagTxt: {
    color: travlPiinsAmfindsOrange,
    fontSize: 12,
    fontWeight: '700',
  },
  travlPiinsAmfindsH1: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  travlPiinsAmfindsIdeaBox: {
    backgroundColor: travlPiinsAmfindsCard,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingLeft: 18,
    marginBottom: 22,
    borderLeftWidth: 4,
    borderLeftColor: travlPiinsAmfindsOrange,
  },
  travlPiinsAmfindsIdeaTxt: {
    color: travlPiinsAmfindsTitleC,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  travlPiinsAmfindsBodyPara: {
    color: '#6B7278',
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 16,
  },
});
