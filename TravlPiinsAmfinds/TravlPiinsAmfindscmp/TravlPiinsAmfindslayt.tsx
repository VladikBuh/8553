import React, {type RefObject} from 'react';
import {ScrollView, StyleSheet, View, type ScrollView as ScrollViewType} from 'react-native';

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
    <View style={styles.wudlanndvildexplorrlayBackground}>
      <ScrollView
        ref={scrollRef}
        bounces={bounce}
        contentContainerStyle={styles.wudlanndvildexplorrlayScrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </View>
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
