import React from 'react';
import {
  Divider as DividerKitten,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

export const Divider = () => {
  const styles = useStyleSheet(themedStyles);

  return <DividerKitten style={styles.divider} />;
};

const themedStyles = StyleService.create({
  divider: {
    height: 1,
  },
});
