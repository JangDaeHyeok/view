import React, {createContext} from "react";

const UserContext = createContext({
    session: '',
    setSession: () => {}
});

export default UserContext;