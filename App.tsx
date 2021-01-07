import React from "react";

import { RootStack } from "./src/navigation";
import { Provider } from "./src/utils";

export default () => (
  <Provider>
    <RootStack />
  </Provider>
);
