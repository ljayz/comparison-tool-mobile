import React from 'react';
import {SafeAreaView} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {Details} from '../components/details';
import {DetailsTopNavigation} from '../components/detailsTopNavigation';
import {Divider} from '../components/divider';
import {Footer} from '../components/footer';

export const Comparison = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <DetailsTopNavigation />
      <Divider />
      <Details />
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
