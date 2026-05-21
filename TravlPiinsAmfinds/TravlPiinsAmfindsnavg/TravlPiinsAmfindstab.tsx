import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  TravlPiinsAmfindsArticlesTabStack,
  TravlPiinsAmfindsexpllrTabStack,
  TravlPiinsAmfindsMapTabStack,
} from './TravlPiinsAmfindsexpllrstack';
import {TravlPiinsAmfindsexpllrProvider} from '../TravlPiinsAmfindsdata/travlPiinsAmfindsexpllrctx';
import {travlPiinsAmfindsGetTabBarStyle} from './travlPiinsAmfindstabBarStyle';
import TravlPiinsAmfindsquizz from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsquizz';
import TravlPiinsAmfindshunt from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindshunt';

const Tab = createBottomTabNavigator();

const tabActive = '#F0A030';
const tabIdle = 'rgba(255,255,255,0.48)';

type TabItemProps = {
  label: string;
  focused: boolean;
  source: ImageSourcePropType;
};

const TabItem = ({label, focused, source}: TabItemProps) => {
  const tabColor = focused ? tabActive : tabIdle;
  return (
    <View style={styles.tabItem}>
      <View style={[styles.tabIconImageWrap, focused && styles.activeIconWrap]}>
        <Image
          source={source}
          style={styles.tabIconImg}
          resizeMode="contain"
          tintColor={tabColor}
        />
      </View>
      <Text style={[styles.tabLabel, {color: tabColor}]}>{label}</Text>
    </View>
  );
};

const TabIconExplore = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Explore"
    focused={focused}
    source={require('../../assets/imgs/tabExplore.png')}
  />
);

const TabIconMap = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Map"
    focused={focused}
    source={require('../../assets/imgs/tabMap.png')}
  />
);

const TabIconTactics = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Articles"
    focused={focused}
    source={require('../../assets/imgs/tabArticles.png')}
  />
);

const TabIconStudytasks = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Quiz"
    focused={focused}
    source={require('../../assets/imgs/tabQuiz.png')}
  />
);

const TabIconGridTrial = ({focused}: {focused: boolean}) => (
  <TabItem
    label="Hunt"
    focused={focused}
    source={require('../../assets/imgs/tabHunt.png')}
  />
);

const TabBarBg = () => <View pointerEvents="none" style={styles.tabBarFill} />;

const TravlPiinsAmfindstabInner = () => {
  const tabInsets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: tabActive,
        tabBarInactiveTintColor: tabIdle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIconSlot,
        tabBarStyle: travlPiinsAmfindsGetTabBarStyle(tabInsets.bottom),
        tabBarBackground: TabBarBg,
      }}>
      <Tab.Screen
        name="TravlPiinsAmfindsexpllr"
        component={TravlPiinsAmfindsexpllrTabStack}
        options={{
          tabBarIcon: TabIconExplore,
        }}
      />
      <Tab.Screen
        name="TravlPiinsAmfindsmaap"
        component={TravlPiinsAmfindsMapTabStack}
        options={{
          tabBarIcon: TabIconMap,
        }}
      />
      <Tab.Screen
        name="TravlPiinsAmfindsartcls"
        component={TravlPiinsAmfindsArticlesTabStack}
        options={{
          tabBarIcon: TabIconTactics,
        }}
      />
      <Tab.Screen
        name="TravlPiinsAmfindsquizz"
        component={TravlPiinsAmfindsquizz}
        options={{
          tabBarIcon: TabIconStudytasks,
        }}
      />
      <Tab.Screen
        name="TravlPiinsAmfindshunt"
        component={TravlPiinsAmfindshunt}
        options={{
          tabBarIcon: TabIconGridTrial,
        }}
      />
    </Tab.Navigator>
  );
};

const TravlPiinsAmfindstab = () => {
  return (
    <TravlPiinsAmfindsexpllrProvider>
      <TravlPiinsAmfindstabInner />
    </TravlPiinsAmfindsexpllrProvider>
  );
};

const styles = StyleSheet.create({
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    paddingTop: 4,
  },
  tabBarIconSlot: {
    marginTop: 0,
    marginBottom: 0,
  },
  tabBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#121212',
  },
  tabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 12,
  },
  activeIconWrap: {
    backgroundColor: '#F0A03025',
  },
  tabIconImg: {
    width: 20,
    height: 20,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default TravlPiinsAmfindstab;
