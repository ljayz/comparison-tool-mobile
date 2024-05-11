import React from 'react';
import {ImageBackground, ScrollView} from 'react-native';
import {Layout, StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import Markdown from 'react-native-markdown-display';
import {Divider} from './divider';
import {aboutAtom} from '../jotai';
import {useAtom} from 'jotai';
import {Image} from 'react-native-svg';

const rules = {
  heading1: (node, children) => (
    <Text key={node.key} category="h1">
      {children}
    </Text>
  ),
  heading2: (node, children) => (
    <Text key={node.key} category="h2">
      {children}
    </Text>
  ),
  heading3: (node, children) => (
    <Text key={node.key} category="h3">
      {children}
    </Text>
  ),
  heading4: (node, children) => (
    <Text key={node.key} category="h4">
      {children}
    </Text>
  ),
  heading5: (node, children) => (
    <Text key={node.key} category="h5">
      {children}
    </Text>
  ),
  heading6: (node, children) => (
    <Text key={node.key} category="h6">
      {children}
    </Text>
  ),
  hr: node => <Divider key={node.key} styles={{backgroundColor: '#ccc'}} />,
  strong: (node, children) => (
    <Text key={node.key} category="s1">
      {children}
    </Text>
  ),
  text: node => <Text key={node.key}>{node.content}</Text>,
  textgroup: (node, children) => <Text key={node.key}>{children}</Text>,
};

export const About = () => {
  const styles = useStyleSheet(themedStyles);
  const [{data, isPending}] = useAtom(aboutAtom);

  return (
    <Layout style={styles.container} level="2">
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Layout style={styles.logoContainer} level="1">
          <ImageBackground
            style={styles.logo}
            source={require('../img/priceProLogo.png')}
          />
        </Layout>

        <Layout style={styles.descriptionContainer} level="2">
          <Markdown rules={rules} mergeStyle={true} style={styles}>
            {isPending ? 'Loading...' : `${data}`}
          </Markdown>
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
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    padding: 30,
    height: 100,
    width: 100,
    backgroundColor: 'yellow',
    marginVertical: 16,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  aboutLabel: {
    marginBottom: 16,
  },
  blockquote: {
    backgroundColor: '#292929',
  },
  code_inline: {
    backgroundColor: '#292929',
  },
  table: {
    borderColor: '#ccc',
  },
  tr: {
    borderColor: '#ccc',
  },
  bullet_list_icon: {
    color: '#ccc',
  },
  ordered_list_icon: {
    color: '#ccc',
  },
});
