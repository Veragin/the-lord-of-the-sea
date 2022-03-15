import React, { useRef, useState } from "react";

import { createUser } from "./User/createUser";

const App = () => {
    const user = useRef(createUser());

    return null;
};

export default App;
