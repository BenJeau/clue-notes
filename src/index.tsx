import React from 'react';

import Navigator from './navigation';
import { Provider } from './utils';

export default () => (
  <Provider>
    <Navigator />
  </Provider>
);
