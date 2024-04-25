import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Layout,
  StyleService,
  Text,
  TopNavigation,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';

import {Divider} from '../components/divider';
import {Footer} from '../components/footer';
import {Products} from '../components/products';

export const Home = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation alignment="center" title="Products" />
      <Divider />
      <Products />
      <Footer />
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
});
