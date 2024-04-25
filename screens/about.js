import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  StyleService,
  TopNavigation,
  useStyleSheet,
} from '@ui-kitten/components';

import {Divider} from '../components/divider';
import {Footer} from '../components/footer';
import {About as AboutComponent} from '../components/about';

export const About = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation alignment="center" title="About" />
      <Divider />
      <AboutComponent />
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
