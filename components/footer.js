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
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
  myComparisonAtom,
  myComparisonStorageReaderAtomLoadable,
  myComparisonStorageWriterAtom,
  screenIndexAtom,
} from '../jotai';

const HomeIcon = props => <Icon {...props} name="home" />;
const PeopleIcon = props => <Icon {...props} name="people" />;
const BadgeIcon = ({badgeText, ...props}) => {
  const styles = useStyleSheet(themedStyles);

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
  const [badgeText, setBadgeText] = React.useState('0');
  const myComparison = useAtomValue(myComparisonAtom);
  const myComparisonStorage = useAtomValue(
    myComparisonStorageReaderAtomLoadable,
  );
  const setMyComparisonStorage = useSetAtom(myComparisonStorageWriterAtom);
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  React.useEffect(() => {
    if (myComparisonStorage.state === 'hasData') {
      setMyComparisonStorage('load');
    }
  }, [myComparisonStorage, setMyComparisonStorage]);

  React.useEffect(() => {
    if (Array.isArray(myComparison)) {
      const count = String(myComparison.length);
      setBadgeText(count);
    } else {
      setBadgeText('0');
    }
  }, [myComparison]);

  return (
    <BottomNavigation
      appearance="noIndicator"
      onSelect={index => setSelectedIndex(index)}
      selectedIndex={selectedIndex}
      style={{backgroundColor: theme['background-basic-color-1']}}>
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab
        icon={<BadgeIcon badgeText={badgeText} />}
        title="My Comparisons"
      />
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
