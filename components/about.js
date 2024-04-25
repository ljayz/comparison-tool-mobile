import React from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';

const logoUrl = 'https://iili.io/JSblB1V.png';

export const About = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container} level="1">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <ImageBackground style={styles.logo} source={{uri: logoUrl}} />
        </View>

        <Layout style={styles.descriptionContainer} level="2">
          <Text style={styles.aboutLabel} category="s1">
            About The System
          </Text>
          <Text appearance="hint">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nulla dui, molestie in mi id, consectetur rhoncus massa. Vivamus non
            fermentum nulla. Cras a semper metus. Nullam auctor facilisis
            libero, sed sodales lorem volutpat ut. Integer accumsan sapien
            purus, at elementum mauris consectetur eget. Phasellus mauris erat,
            tincidunt a imperdiet quis, tempus quis lacus. Nulla urna tellus,
            faucibus pulvinar dolor at, pulvinar efficitur lectus. Morbi non
            neque rutrum, rutrum est ac, rutrum enim. Praesent lacus massa,
            interdum pharetra dapibus sit amet, iaculis in odio. Aenean sed odio
            velit. Quisque commodo, metus et pellentesque pretium, erat mauris
            mattis neque, ut blandit velit massa laoreet quam. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Integer pharetra mollis erat, et ullamcorper ipsum ornare
            eu.{'\n\n'}Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Etiam metus felis, euismod sit
            amet vestibulum vitae, dictum id nunc. Curabitur porttitor ante at
            faucibus vehicula. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Cras aliquam viverra ipsum, nec rutrum lacus. Proin et
            eros id lorem congue commodo. Mauris lacinia tempor ante, sit amet
            suscipit lacus condimentum vitae. Vivamus nec eleifend urna. Aliquam
            mi risus, viverra vitae felis eget, volutpat vestibulum lectus.
            Suspendisse potenti.
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // paddingVertical: 25,
  },
  logo: {
    height: 100,
    width: 100,
    marginVertical: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  aboutLabel: {
    marginBottom: 16,
  },
});
