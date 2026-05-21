import React, {useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TravlPiinsAmfindslayt from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslayt';

type travlPiinsAmfindsOnbStep = {
  travlPiinsAmfindsHeroSource: ImageSourcePropType;
  travlPiinsAmfindsBadgeLabel: string;
  travlPiinsAmfindsBadgeBorder: string;
  travlPiinsAmfindsTitle: string;
  travlPiinsAmfindsDescription: string;
  travlPiinsAmfindsShowSkip: boolean;
  travlPiinsAmfindsHeroSource2: ImageSourcePropType;
};

const travlPiinsAmfindsOnbSteps: travlPiinsAmfindsOnbStep[] = [
  {
    travlPiinsAmfindsHeroSource: require('../../assets/imgs/onboardingHeroDiscover.png'),
    travlPiinsAmfindsHeroSource2: require('../../assets/imgs/onboardingIconDiscover.png'),
    travlPiinsAmfindsBadgeLabel: 'DISCOVER',
    travlPiinsAmfindsBadgeBorder: 'rgba(0, 196, 168, 0.19)',
    travlPiinsAmfindsTitle: 'Find Amazing Places',
    travlPiinsAmfindsDescription:
      'Explore thousands of incredible destinations handpicked by travelers who have been there and loved every moment.',
    travlPiinsAmfindsShowSkip: true,
  },
  {
    travlPiinsAmfindsHeroSource: require('../../assets/imgs/onboardingHeroMap.png'),
    travlPiinsAmfindsHeroSource2: require('../../assets/imgs/onboardingIconPin.png'),
    travlPiinsAmfindsBadgeLabel: 'NAVIGATE',
    travlPiinsAmfindsBadgeBorder: 'rgba(240, 160, 48, 0.19)',
    travlPiinsAmfindsTitle: 'Pin Your Journey',
    travlPiinsAmfindsDescription:
      'Drop pins on your dream destinations and visited places. Build your personal travel map with photos and stories.',
    travlPiinsAmfindsShowSkip: true,
  },
  {
    travlPiinsAmfindsHeroSource: require('../../assets/imgs/onboardingHeroShare.png'),
    travlPiinsAmfindsHeroSource2: require('../../assets/imgs/onboardingIconShare.png'),
    travlPiinsAmfindsBadgeLabel: 'SHARE',
    travlPiinsAmfindsBadgeBorder: 'rgba(167, 139, 250, 0.19)',
    travlPiinsAmfindsTitle: 'Share Every\nAmazing Find',
    travlPiinsAmfindsDescription:
      'Share your discoveries with friends and fellow travelers. Build your Amazing Board with captured photos from your adventures.',
    travlPiinsAmfindsShowSkip: false,
  },
];

const {height: travlPiinsAmfindsScreenHeight} = Dimensions.get('window');
const travlPiinsAmfindsHeroHeight = travlPiinsAmfindsScreenHeight * 0.55;

type travlPiinsAmfindsPaginationProps = {
  travlPiinsAmfindsActiveIndex: number;
  travlPiinsAmfindsTotal: number;
};

const travlPiinsAmfindsPagination = ({
  travlPiinsAmfindsActiveIndex,
  travlPiinsAmfindsTotal,
}: travlPiinsAmfindsPaginationProps) => (
  <View style={styles.travlPiinsAmfindsPaginationRow}>
    {Array.from({length: travlPiinsAmfindsTotal}).map((_, index) => (
      <View
        key={`travlPiinsAmfindsDot-${index}`}
        style={[
          styles.travlPiinsAmfindsPaginationDot,
          index === travlPiinsAmfindsActiveIndex &&
            styles.travlPiinsAmfindsPaginationDotActive,
        ]}
      />
    ))}
  </View>
);

type travlPiinsAmfindsPrimaryButtonProps = {
  travlPiinsAmfindsLabel: string;
  travlPiinsAmfindsWide?: boolean;
  travlPiinsAmfindsOnPress: () => void;
};

const travlPiinsAmfindsPrimaryButton = ({
  travlPiinsAmfindsLabel,
  travlPiinsAmfindsWide,
  travlPiinsAmfindsOnPress,
}: travlPiinsAmfindsPrimaryButtonProps) => (
  <Pressable
    onPress={travlPiinsAmfindsOnPress}
    style={({pressed}) => [
      styles.travlPiinsAmfindsPrimaryButton,
      travlPiinsAmfindsWide && styles.travlPiinsAmfindsPrimaryButtonWide,
      pressed && styles.travlPiinsAmfindsPrimaryButtonPressed,
    ]}>
    <Text style={styles.travlPiinsAmfindsPrimaryButtonText}>
      {travlPiinsAmfindsLabel}
    </Text>
    <Image
      source={require('../../assets/imgs/nextArrow.png')}
      style={styles.travlPiinsAmfindsPrimaryButtonChevron}
    />
  </Pressable>
);

const TravlPiinsAmfindsonb = (): React.JSX.Element => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [travlPiinsAmfindsStep, setTravlPiinsAmfindsStep] = useState(0);

  const travlPiinsAmfindsCurrent =
    travlPiinsAmfindsOnbSteps[travlPiinsAmfindsStep];
  const travlPiinsAmfindsIsLastStep =
    travlPiinsAmfindsStep === travlPiinsAmfindsOnbSteps.length - 1;

  const travlPiinsAmfindsFinish = () => {
    navigation.navigate('TravlPiinsAmfindstab' as never);
  };

  const travlPiinsAmfindsHandlePrimary = () => {
    if (travlPiinsAmfindsIsLastStep) {
      travlPiinsAmfindsFinish();
      return;
    }
    setTravlPiinsAmfindsStep(prev => prev + 1);
  };

  const travlPiinsAmfindsHeroTop = useMemo(
    () => Math.max(insets.top + 12, 56),
    [insets.top],
  );

  return (
    <TravlPiinsAmfindslayt>
      <View
        style={[
          styles.travlPiinsAmfindsHeroWrap,
          {height: travlPiinsAmfindsHeroHeight},
        ]}>
        <Image
          source={travlPiinsAmfindsCurrent.travlPiinsAmfindsHeroSource}
          style={styles.travlPiinsAmfindsHeroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['#07152A33', 'rgba(6, 14, 28, 0)', 'rgba(0, 0, 0, 0.84)']}
          locations={[0, 0.4, 1]}
          style={styles.travlPiinsAmfindsHeroGradient}
        />
        {travlPiinsAmfindsCurrent.travlPiinsAmfindsShowSkip && (
          <Pressable
            onPress={travlPiinsAmfindsFinish}
            style={({pressed}) => [
              styles.travlPiinsAmfindsSkipButton,
              {top: travlPiinsAmfindsHeroTop},
              pressed && styles.travlPiinsAmfindsSkipButtonPressed,
            ]}>
            <Text style={styles.travlPiinsAmfindsSkipText}>Skip</Text>
          </Pressable>
        )}
      </View>

      <View
        style={[
          styles.travlPiinsAmfindsContent,
          {paddingBottom: Math.max(insets.bottom, 24) + 16},
        ]}>
        <View style={styles.travlPiinsAmfindsTextBlock}>
          <View style={styles.travlPiinsAmfindsBadgeRow}>
            <View
              style={[
                styles.travlPiinsAmfindsBadgeIconWrap,
                {
                  borderColor:
                    travlPiinsAmfindsCurrent.travlPiinsAmfindsBadgeBorder,
                },
              ]}>
              <Image
                source={travlPiinsAmfindsCurrent.travlPiinsAmfindsHeroSource2}
              />
            </View>
            <Text style={styles.travlPiinsAmfindsBadgeLabel}>
              {travlPiinsAmfindsCurrent.travlPiinsAmfindsBadgeLabel}
            </Text>
          </View>

          <Text style={styles.travlPiinsAmfindsTitle}>
            {travlPiinsAmfindsCurrent.travlPiinsAmfindsTitle}
          </Text>

          <Text style={styles.travlPiinsAmfindsDescription}>
            {travlPiinsAmfindsCurrent.travlPiinsAmfindsDescription}
          </Text>
        </View>

        <View style={styles.travlPiinsAmfindsFooter}>
          {travlPiinsAmfindsPagination({
            travlPiinsAmfindsActiveIndex: travlPiinsAmfindsStep,
            travlPiinsAmfindsTotal: travlPiinsAmfindsOnbSteps.length,
          })}
          {travlPiinsAmfindsPrimaryButton({
            travlPiinsAmfindsLabel: travlPiinsAmfindsIsLastStep
              ? 'Get Started'
              : 'Next',
            travlPiinsAmfindsWide: travlPiinsAmfindsIsLastStep,
            travlPiinsAmfindsOnPress: travlPiinsAmfindsHandlePrimary,
          })}
        </View>
      </View>
    </TravlPiinsAmfindslayt>
  );
};

export default TravlPiinsAmfindsonb;

const styles = StyleSheet.create({
  travlPiinsAmfindsRoot: {
    flex: 1,
    backgroundColor: '#1B1C1D',
  },
  travlPiinsAmfindsHeroWrap: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#1B1C1D',
  },
  travlPiinsAmfindsHeroImage: {
    width: '100%',
    height: '100%',
  },
  travlPiinsAmfindsHeroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  travlPiinsAmfindsSkipButton: {
    position: 'absolute',
    right: 20,
    minWidth: 62,
    height: 34,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1B1C1D',
    backgroundColor: 'rgba(27, 28, 29, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  travlPiinsAmfindsSkipButtonPressed: {
    opacity: 0.85,
  },
  travlPiinsAmfindsSkipText: {
    color: '#7AA0BF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.08,
  },
  travlPiinsAmfindsContent: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 32,
    justifyContent: 'space-between',
  },
  travlPiinsAmfindsTextBlock: {
    gap: 16.13,
  },
  travlPiinsAmfindsBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  travlPiinsAmfindsBadgeIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#373737',
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsBadgeLabel: {
    color: '#F0A030',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  travlPiinsAmfindsTitle: {
    color: '#EDF3FC',
    fontSize: 38,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: 0.37,
  },
  travlPiinsAmfindsDescription: {
    color: '#6B7278',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.31,
  },
  travlPiinsAmfindsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  travlPiinsAmfindsPaginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 60,
  },
  travlPiinsAmfindsPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B3737',
  },
  travlPiinsAmfindsPaginationDotActive: {
    flex: 1,
    minWidth: 20,
    backgroundColor: '#F0A030',
  },
  travlPiinsAmfindsPrimaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0A030',
    borderRadius: 16,
    height: 52,
    minWidth: 122,
    paddingHorizontal: 20,
    gap: 6,
  },
  travlPiinsAmfindsPrimaryButtonWide: {
    minWidth: 176,
    paddingHorizontal: 28,
  },
  travlPiinsAmfindsPrimaryButtonPressed: {
    opacity: 0.92,
  },
  travlPiinsAmfindsPrimaryButtonText: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.31,
  },
  travlPiinsAmfindsPrimaryButtonChevron: {
    width: 20,
    height: 20,
  },
  travlPiinsAmfindsIconPin: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  travlPiinsAmfindsIconPinHead: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.6,
    borderColor: '#F0A030',
    marginTop: 1,
  },
  travlPiinsAmfindsIconPinPoint: {
    width: 0,
    height: 0,
    marginTop: -1,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F0A030',
  },
  travlPiinsAmfindsIconCompass: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  travlPiinsAmfindsIconCompassRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: '#F0A030',
  },
  travlPiinsAmfindsIconCompassNeedleV: {
    position: 'absolute',
    width: 1.6,
    height: 14,
    backgroundColor: '#F0A030',
    borderRadius: 1,
  },
  travlPiinsAmfindsIconCompassNeedleH: {
    position: 'absolute',
    width: 14,
    height: 1.6,
    backgroundColor: '#F0A030',
    borderRadius: 1,
  },
  travlPiinsAmfindsIconShare: {
    width: 20,
    height: 20,
    position: 'relative',
  },
  travlPiinsAmfindsIconShareDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#F0A030',
  },
  travlPiinsAmfindsIconShareDotTop: {
    top: 2,
    left: 7,
  },
  travlPiinsAmfindsIconShareDotLeft: {
    bottom: 2,
    left: 1,
  },
  travlPiinsAmfindsIconShareDotRight: {
    bottom: 2,
    right: 1,
  },
});
