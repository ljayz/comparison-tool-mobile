import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';

import {default as mapping} from './mapping.json';
import {Screen} from './components/screen';
import {theme} from './theme';

export default () => {
  // const [deviceId, setDeviceId] = React.useState(null);

  // DeviceInfo.getUniqueId().then(uniqueDeviceId => {
  //   console.log('uniqueDeviceId', uniqueDeviceId);
  //   setDeviceId(uniqueDeviceId);
  // });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} customMapping={mapping} theme={theme}>
        <Screen />
      </ApplicationProvider>
    </>
  );
};
