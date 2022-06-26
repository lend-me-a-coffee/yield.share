import React from 'react';

const userContext = React.createContext({
    address: "",
    setAddress: () => {}
});


export { userContext };