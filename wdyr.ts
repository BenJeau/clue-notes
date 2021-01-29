/// <reference types="@welldone-software/why-did-you-render" />

import React from 'react';
import { WDYR } from '@env';

if (process.env.NODE_ENV === 'development' && WDYR === 'true') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    collapseGroups: true,
  });
}
