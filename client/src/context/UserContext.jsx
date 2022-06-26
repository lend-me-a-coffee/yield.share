import React from 'react';

const userContext = React.createContext({
    address: "",
    setAddress: () => {},
    isCreator: false,
    setIsCreator: () => {}, 
});


export { userContext };