import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '~/redux';

const Provider = (WrappedComponent: React.FC<any>) => {
  return (props: any) => (
    <ReduxProvider store={store}>
      <WrappedComponent {...props} />
    </ReduxProvider>
  );
};

export default Provider;
