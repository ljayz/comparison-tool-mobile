import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Text, TopNavigation} from '@ui-kitten/components';

import {Divider} from '../components/divider';
import {Footer} from '../components/footer';

export const About = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation alignment="center" title="About" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>About</Text>
      </Layout>
      <Footer />
    </SafeAreaView>
  );
};
