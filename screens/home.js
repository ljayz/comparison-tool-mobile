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
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.flex,
        {backgroundColor: theme['background-basic-color-1']},
      ]}>
      <TopNavigation alignment="center" title="Products" />
      <Divider />
      <Products />
      <Footer />
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
