import { observable, action, computed } from 'mobx';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import mnenonic from '../../config/mnemonic';

export default class {
  constructor({ store }) {
    this.store = store;
  }

  @observable accounts = [];

  @computed get allAccounts() {
    return this.accounts;
  }

  @action initAccounts = async function (list = mnenonic) {
    const result = await Promise.all(list.map(async item => {
      const account = await this.importAccount({ data: item.mnemonic, type: 'mnemonic' });
      return { name: item.name, account }
    }));
    this.accounts = result;
  }

  @action queryAllBalance() {
    return new Promise(async (resolve, reject) => {
      try {
        const { polkadot } = this.store;
        const queryQueue = this.accounts
          .map(({ account }) => polkadot.api.query.balances.freeBalance(account.address));
        let result = await Promise.all(queryQueue);
        result = this.accounts
          .map((item, index) => ({ ...item, freeBalance: result[index] }))
          .map(item => ({
            ...item,
            freeBalance: item.freeBalance,
          }));
        this.accounts = result;
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }


  @action importAccount = async function ({ keyringType = 'sr25519', type = 'mnemonic', data }) {
    try {
      await cryptoWaitReady();
      const keyring = new Keyring({ type: keyringType });
      /* eslint-disable default-case */
      switch (type) {
        case 'mnemonic': {
          this.currentAccount = keyring.addFromMnemonic(data);
          break;
        }
      }
      /* eslint-enbale default-case */
      return this.currentAccount;
    } catch (e) {
      return null;
    }
  }

  @action autoImport = async function () {
    const mnemonic = window.localStorage.getItem('mnemonic');
    if (mnemonic) {
      await this.importAccount({ type: 'mnemonic', data: mnemonic });
    }
  };
}

