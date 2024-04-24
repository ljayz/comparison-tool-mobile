import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, TopNavigation} from '@ui-kitten/components';

import {Details} from '../components/details';
import {DetailsTopNavigation} from '../components/detailsTopNavigation';
import {Divider} from '../components/divider';
import {Footer} from '../components/footer';

export const Comparison = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DetailsTopNavigation />
      <Divider />
      <Details />
      <Footer />
    </SafeAreaView>
  );
};
