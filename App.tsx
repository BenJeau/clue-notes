import React from "react";

import Navigator from "./src/navigation";
import { Provider } from "./src/utils";

export default () => (
  <Provider>
    <Navigator />
  </Provider>
);
