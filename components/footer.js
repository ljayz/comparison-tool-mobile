import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {View, Text} from 'react-native';
import {useAtom, useAtomValue} from 'jotai';

import {myComparisonAtom, screenIndexAtom} from '../jotai';

const HomeIcon = props => <Icon {...props} name="home" />;
const PeopleIcon = props => <Icon {...props} name="people" />;
const BadgeIcon = ({...props}) => {
  const styles = useStyleSheet(themedStyles);
  const myComparison = useAtomValue(myComparisonAtom);
  // console.log('bottomMyComparison', myComparison);
  const count = myComparison ? String(myComparison.split(',').length) : 0;
  const badgeText = String(count);

  return (
    <View style={styles.badgeContainer}>
      <Icon {...props} name="bookmark" />
      {badgeText !== '0' && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
    </View>
  );
};

export const Footer = () => {
  const [selectedIndex, setSelectedIndex] = useAtom(screenIndexAtom);
  const theme = useTheme();

  return (
    <BottomNavigation
      appearance="noIndicator"
      onSelect={index => setSelectedIndex(index)}
      selectedIndex={selectedIndex}
      style={{backgroundColor: theme['background-basic-color-1']}}>
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={<BadgeIcon />} title="My Comparisons" />
      <BottomNavigationTab icon={PeopleIcon} title="About Us" />
    </BottomNavigation>
  );
};

const themedStyles = StyleService.create({
  badgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -1,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
  },
});
