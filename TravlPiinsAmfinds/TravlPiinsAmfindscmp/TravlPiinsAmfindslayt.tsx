import React, {type RefObject} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollView as ScrollViewType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TravlPiinsAmfindslayt = ({
  children,
  bounce = true,
  scrollRef,
}: {
  children: React.ReactNode;
  wudlanndvildexplorrlayScroll?: boolean;
  bounce?: boolean;
  scrollRef?: RefObject<ScrollViewType | null>;
}) => {
  return (
    <LinearGradient
      colors={['rgb(47, 22, 3)', 'rgb(18, 8, 2)']}
      style={styles.wudlanndvildexplorrlayBackground}>
      <ScrollView
        ref={scrollRef}
        bounces={bounce}
        contentContainerStyle={styles.wudlanndvildexplorrlayScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wudlanndvildexplorrlayBackground: {
    flex: 1,
    backgroundColor: '#030807',
  },
  wudlanndvildexplorrlayScrollContent: {
    flexGrow: 1,
  },
  wudlanndvildexplorrlayFill: {
    flex: 1,
  },
});

export default TravlPiinsAmfindslayt;
