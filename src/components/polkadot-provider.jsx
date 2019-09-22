import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { ApiPromise, ApiRx, WsProvider } from '@polkadot/api';
import { Enum } from '@polkadot/types/codec';

class ProjectStatus {
  constructor(value) {
    return new Enum([
      'Initialization',
      'Milestone1',
      'Milestone2',
      'Milestone3',
    ], value);
  }
}
console.log(new Enum(['Initialization', 'Milestone1'], 1));

const PolkadotContext = React.createContext(null);
const PolkadotProvider = ({
  endpoint, customTypes, renderLoading, onConnected, children,
}) => {
  const [api, setAPI] = useState({});

  useEffect(() => {
    // initialize api
    (async () => {
      const wsProvider = new WsProvider(endpoint);
      const api = await ApiPromise.create({
        provider: wsProvider,
        // registor custom types
        types: customTypes,
      });
      // api.registerTypes({ ProjectStatus });
      window.api = api;
      onConnected(api);
      setAPI(api);
    })();
  }, [endpoint, customTypes, onConnected]);

  // if api is not ready, show loading page
  if (isEmpty(api)) {
    return renderLoading && renderLoading();
  }
  return (
    <PolkadotContext.Provider value={api}>
      {children}
    </PolkadotContext.Provider>
  );
};

const PolkadotCustomer = PolkadotContext.Consumer;

const withPolkadot = Component => props => (
  <PolkadotContext.Consumer>
    {
      api => <Component api={api} {...props}/>
    }
  </PolkadotContext.Consumer>
);

export {
  PolkadotProvider,
  withPolkadot,
  PolkadotCustomer,
}
