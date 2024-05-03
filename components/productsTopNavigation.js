import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {useAtom} from 'jotai';

import {homeProductsSearchToggleAtom} from '../jotai';

const SearchIcon = props => <Icon {...props} name="search" />;

export const ProductsTopNavigation = () => {
  const [homeProductsSearchToggle, setHomeProductsSearchToggle] = useAtom(
    homeProductsSearchToggleAtom,
  );
  const onRightPress = () => {
    setHomeProductsSearchToggle(!homeProductsSearchToggle);
  };
  const renderRightAction = () => (
    <TopNavigationAction icon={SearchIcon} onPress={onRightPress} />
  );

  return (
    <>
      <TopNavigation
        alignment="center"
        title="Products"
        accessoryRight={renderRightAction}
      />
    </>
  );
};
