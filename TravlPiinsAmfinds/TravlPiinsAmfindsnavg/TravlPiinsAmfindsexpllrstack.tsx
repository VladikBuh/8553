import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import TravlPiinsAmfindslodd from '../TravlPiinsAmfindscmp/TravlPiinsAmfindslodd';
import TravlPiinsAmfindsexpllr from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsexpllr';
import TravlPiinsAmfindsexpllrdetail from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsexpllrdetail';
import TravlPiinsAmfindsonb from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsonb';
import TravlPiinsAmfindsmaap from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsmaap';
import TravlPiinsAmfindsartcls from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsartcls';
import TravlPiinsAmfindsartclsdetail from '../TravlPiinsAmfindsscrns/TravlPiinsAmfindsartclsdetail';
import TravlPiinsAmfindstab from './TravlPiinsAmfindstab';

export type TravlPiinsAmfindsRootStackParamList = {
  TravlPiinsAmfindslodd: undefined;
  TravlPiinsAmfindsonb: undefined;
  TravlPiinsAmfindstab: undefined;
};

export type TravlPiinsAmfindsExploreStackParamList = {
  TravlPiinsAmfindsexpllrList: undefined;
  TravlPiinsAmfindsexpllrdetail: {travlPiinsAmfindsId: string};
};

export type TravlPiinsAmfindsMapStackParamList = {
  TravlPiinsAmfindsmaapMain: {travlPiinsAmfindsFocusId?: string} | undefined;
  TravlPiinsAmfindsexpllrdetail: {travlPiinsAmfindsId: string};
};

export type TravlPiinsAmfindsArticlesStackParamList = {
  TravlPiinsAmfindsartclsList: undefined;
  TravlPiinsAmfindsartclsdetail: {travlPiinsAmfindsArticleId: string};
};

const TravlPiinsAmfindsRootStack =
  createStackNavigator<TravlPiinsAmfindsRootStackParamList>();
const TravlPiinsAmfindsExploreStack =
  createStackNavigator<TravlPiinsAmfindsExploreStackParamList>();
const TravlPiinsAmfindsMapStack =
  createStackNavigator<TravlPiinsAmfindsMapStackParamList>();
const TravlPiinsAmfindsArticlesStack =
  createStackNavigator<TravlPiinsAmfindsArticlesStackParamList>();

export const TravlPiinsAmfindsexpllrTabStack = () => {
  return (
    <TravlPiinsAmfindsExploreStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#1B1C1D'},
      }}>
      <TravlPiinsAmfindsExploreStack.Screen
        name="TravlPiinsAmfindsexpllrList"
        component={TravlPiinsAmfindsexpllr}
      />
      <TravlPiinsAmfindsExploreStack.Screen
        name="TravlPiinsAmfindsexpllrdetail"
        component={TravlPiinsAmfindsexpllrdetail}
        options={{presentation: 'card'}}
      />
    </TravlPiinsAmfindsExploreStack.Navigator>
  );
};

export const TravlPiinsAmfindsMapTabStack = () => {
  return (
    <TravlPiinsAmfindsMapStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#1B1C1D'},
      }}>
      <TravlPiinsAmfindsMapStack.Screen
        name="TravlPiinsAmfindsmaapMain"
        component={TravlPiinsAmfindsmaap}
      />
      <TravlPiinsAmfindsMapStack.Screen
        name="TravlPiinsAmfindsexpllrdetail"
        component={TravlPiinsAmfindsexpllrdetail}
        options={{presentation: 'card'}}
      />
    </TravlPiinsAmfindsMapStack.Navigator>
  );
};

export const TravlPiinsAmfindsArticlesTabStack = () => {
  return (
    <TravlPiinsAmfindsArticlesStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#121212'},
      }}>
      <TravlPiinsAmfindsArticlesStack.Screen
        name="TravlPiinsAmfindsartclsList"
        component={TravlPiinsAmfindsartcls}
      />
      <TravlPiinsAmfindsArticlesStack.Screen
        name="TravlPiinsAmfindsartclsdetail"
        component={TravlPiinsAmfindsartclsdetail}
        options={{presentation: 'card'}}
      />
    </TravlPiinsAmfindsArticlesStack.Navigator>
  );
};

const TravlPiinsAmfindsexpllrstack = () => {
  return (
    <TravlPiinsAmfindsRootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#030807'},
      }}>
      <TravlPiinsAmfindsRootStack.Screen
        name="TravlPiinsAmfindslodd"
        component={TravlPiinsAmfindslodd}
      />
      <TravlPiinsAmfindsRootStack.Screen
        name="TravlPiinsAmfindsonb"
        component={TravlPiinsAmfindsonb}
      />
      <TravlPiinsAmfindsRootStack.Screen
        name="TravlPiinsAmfindstab"
        component={TravlPiinsAmfindstab}
      />
    </TravlPiinsAmfindsRootStack.Navigator>
  );
};

export default TravlPiinsAmfindsexpllrstack;
