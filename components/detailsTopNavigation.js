import React from 'react';
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useAtom, useAtomValue} from 'jotai';

import {comparisonProductsAtom, viewIndexComparisonAtom} from '../jotai';

const LeftIcon = props => <Icon {...props} name="arrow-back" />;
const RightIcon = props => <Icon {...props} name="arrow-forward" />;

export const DetailsTopNavigation = () => {
  const [rightTopNavigationDisabled, setRightTopNavigationDisabled] =
    React.useState(false);
  const [{data, isPending, isError}] = useAtom(comparisonProductsAtom);
  const [viewIndexComparison, setViewIndexComparison] = useAtom(
    viewIndexComparisonAtom,
  );
  const onLeftPress = () => {
    setViewIndexComparison(viewIndexComparison - 1);
  };
  const onRightPress = () => {
    setViewIndexComparison(viewIndexComparison + 1);
  };
  const renderLeftAction = () => (
    <TopNavigationAction
      icon={LeftIcon}
      onPress={onLeftPress}
      disabled={!viewIndexComparison}
    />
  );
  const renderRightAction = () => (
    <TopNavigationAction
      icon={RightIcon}
      onPress={onRightPress}
      disabled={rightTopNavigationDisabled}
    />
  );
  const renderSubtitle = () => {
    if (!data || (Array.isArray(data.data) && !data.data.length)) {
      return null;
    }

    const loadNumber = viewIndexComparison + 1;
    const totalNumber = data.data.length;
    return (
      <Text appearance="hint">
        Comparison {loadNumber} / {totalNumber}
      </Text>
    );
  };

  React.useEffect(() => {
    if (
      !data ||
      !data.data.length ||
      data.data.length - 1 === viewIndexComparison
    ) {
      setRightTopNavigationDisabled(true);
    } else {
      setRightTopNavigationDisabled(false);
    }
  }, [data, setRightTopNavigationDisabled, viewIndexComparison]);

  return (
    <>
      <TopNavigation
        alignment="center"
        title="My Comparison"
        subtitle={renderSubtitle}
        accessoryLeft={renderLeftAction}
        accessoryRight={renderRightAction}
      />
    </>
  );
};
