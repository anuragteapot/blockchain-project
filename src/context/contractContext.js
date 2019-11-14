import React from "react";

const ContractContext = React.createContext();

const ContractProvider = ContractContext.Provider;
const ContractConsumer = ContractContext.Consumer;

export { ContractConsumer, ContractProvider, ContractContext };
