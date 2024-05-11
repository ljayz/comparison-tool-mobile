import React from 'react';
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';

import {
  loadMyComparisonProductsAtom,
  myComparisonAtom,
  myComparisonProductAtom,
  queryClientAtom,
  // myComparisonTriggerDeleteAtom,
  viewIndexComparisonAtom,
  viewPagerIndexComparisonAtom,
} from '../jotai';

const LeftIcon = props => <Icon {...props} name="arrow-back" />;
const RightIcon = props => <Icon {...props} name="arrow-forward" />;
const TrashIcon = props => <Icon {...props} name="trash" />;

export const DetailsTopNavigation = () => {
  const [rightTopNavigationDisabled, setRightTopNavigationDisabled] =
    React.useState(false);
  const [currentMyComparison, setCurrentMyComparison] = React.useState(null);
  const setViewPagerIndexComparison = useSetAtom(viewPagerIndexComparisonAtom);
  const queryClient = useAtomValue(queryClientAtom);
  const product = useAtomValue(myComparisonProductAtom);
  const [{data, isPending, isError}] = useAtom(loadMyComparisonProductsAtom);
  const [viewIndexComparison, setViewIndexComparison] = useAtom(
    viewIndexComparisonAtom,
  );
  const [myComparison, setMyComparison] = useAtom(myComparisonAtom);

  const onLeftPress = () => {
    setViewIndexComparison(viewIndexComparison - 1);
    setViewPagerIndexComparison(0);
  };
  const onRightPress = () => {
    setViewIndexComparison(viewIndexComparison + 1);
    setViewPagerIndexComparison(0);
  };
  const onDeletePress = () => {
    const productId = product.id;
    setMyComparison(async savedData => {
      const awaitSavedData = await savedData;
      if (awaitSavedData) {
        const splittedData = awaitSavedData.split(',');
        const indexToRemove = splittedData.indexOf(productId);
        if (indexToRemove > -1) {
          splittedData.splice(indexToRemove, 1);

          if (splittedData.length <= 0) {
            setViewIndexComparison(0);
          } else if (viewIndexComparison >= splittedData.length) {
            setViewIndexComparison(viewIndexComparison - 1);
          }

          return splittedData.join(',');
        }
      }
      return '';
    });
  };

  React.useEffect(() => {
    if (currentMyComparison === null) {
      setCurrentMyComparison(myComparison);
    } else {
      queryClient.resetQueries({
        queryKey: ['myComparison'],
      });
    }
  }, [myComparison, currentMyComparison, setCurrentMyComparison, queryClient]);

  const renderLeftAction = () => (
    <TopNavigationAction
      icon={LeftIcon}
      onPress={onLeftPress}
      disabled={!viewIndexComparison}
    />
  );
  const renderRightAction = () => (
    <>
      {data && Array.isArray(data.data) && data.data.length >= 1 && (
        <TopNavigationAction icon={TrashIcon} onPress={onDeletePress} />
      )}
      <TopNavigationAction
        icon={RightIcon}
        onPress={onRightPress}
        disabled={rightTopNavigationDisabled}
      />
    </>
  );
  const renderSubtitle = () => {
    if (
      !data ||
      !data?.data ||
      (Array.isArray(data.data) && !data.data.length)
    ) {
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
