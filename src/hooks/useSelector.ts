import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';

import rootReducer from '../redux/slices';

type RootState = ReturnType<typeof rootReducer>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
