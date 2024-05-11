import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';

export const Loading = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout level="2" style={styles.loading}>
      <ActivityIndicator size="large" color="#FFC107" />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
});
