import React from 'react';
import {
  Divider as DividerKitten,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

export const Divider = ({styles: propStyles = {}}) => {
  const styles = useStyleSheet(themedStyles);

  return <DividerKitten style={[styles.divider, propStyles]} />;
};

const themedStyles = StyleService.create({
  divider: {
    height: 1,
  },
});
