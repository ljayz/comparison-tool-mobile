import React from 'react';
import {useAtomValue} from 'jotai';

import {screenAtom} from '../jotai';
import {Home} from '../screens/home';
import {Comparison} from '../screens/comparison';
import {About} from '../screens/about';

export const Screen = () => {
  const screen = useAtomValue(screenAtom);

  let SelectedScreen = Home;
  if (screen === 'comparison') {
    SelectedScreen = Comparison;
  } else if (screen === 'about') {
    SelectedScreen = About;
  }

  return <SelectedScreen />;
};
