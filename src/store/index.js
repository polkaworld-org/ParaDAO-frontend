import React from 'react';
import { MobXProviderContext } from 'mobx-react'
import Polkadot from './polkadot';
import Account from './account';
import Project from './project';
import Member from './member';

const createStore = () => {
  class Store {
    constructor() {
      const pStore = this;
      this.polkadot = new Polkadot({ store: pStore });
      this.account = new Account({ store: pStore });
      this.project = new Project({ store: pStore });
      this.member = new Member({ store: pStore });
    }
  }
  return new Store();
};

export function useStores() {
  return React.useContext(MobXProviderContext)
}

export default createStore;
