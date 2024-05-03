import React from 'react';
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
  comparisonProductsAtom,
  myComparisonTriggerDeleteAtom,
  viewIndexComparisonAtom,
  viewPagerIndexComparisonAtom,
} from '../jotai';

const LeftIcon = props => <Icon {...props} name="arrow-back" />;
const RightIcon = props => <Icon {...props} name="arrow-forward" />;
const TrashIcon = props => <Icon {...props} name="trash" />;

export const DetailsTopNavigation = () => {
  const [rightTopNavigationDisabled, setRightTopNavigationDisabled] =
    React.useState(false);
  const [{data, isPending, isError}] = useAtom(comparisonProductsAtom);
  const [viewIndexComparison, setViewIndexComparison] = useAtom(
    viewIndexComparisonAtom,
  );
  const setViewPagerIndexComparison = useSetAtom(viewPagerIndexComparisonAtom);
  const setMyComparisonTriggerDelete = useSetAtom(
    myComparisonTriggerDeleteAtom,
  );
  const onLeftPress = () => {
    setMyComparisonTriggerDelete(false);
    setViewIndexComparison(viewIndexComparison - 1);
    setViewPagerIndexComparison(0);
  };
  const onRightPress = () => {
    setMyComparisonTriggerDelete(false);
    setViewIndexComparison(viewIndexComparison + 1);
    setViewPagerIndexComparison(0);
  };
  const onDeletePress = () => {
    setMyComparisonTriggerDelete(true);
  };
  const renderLeftAction = () => (
    <TopNavigationAction
      icon={LeftIcon}
      onPress={onLeftPress}
      disabled={!viewIndexComparison}
    />
  );
  const renderRightAction = () => (
    <>
      {data && Array.isArray(data.data) && data.data.length ? (
        <TopNavigationAction icon={TrashIcon} onPress={onDeletePress} />
      ) : (
        ''
      )}
      <TopNavigationAction
        icon={RightIcon}
        onPress={onRightPress}
        disabled={rightTopNavigationDisabled}
      />
    </>
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
