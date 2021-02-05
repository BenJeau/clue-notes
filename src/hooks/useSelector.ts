import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import { RootState } from '~/redux';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
