import { observable, computed, when, action } from 'mobx';
import { isEmpty } from 'lodash';

export default class {
  constructor({ store }) {
    this.store = store;
    when(
      () => !isEmpty(this.members),
      () => {
        // calc total energy
        this.calcTotalEnergy();
      },
    )
  }

  @observable members = [
  ];

  @computed get allMembers() {
    return this.members;
  }

  @action ensureMembers = async function () {
    if (this.members.length === 0) {
      await this.queryMembers();
    }
  }

  @observable totalEnergy = 0;

  @action calcTotalEnergy = function () {
    const result = this.members.reduce((acc, cur) => acc + Number(cur.energy), 0);
    this.totalEnergy = result;
  }

  @observable totalDot = 0;

  @action queryTotalDot = function () {
    return new Promise(async (resolve, reject) => {
      try {
        const { polkadot } = this.store;
        const result = await polkadot.api.query.dao.freePool();
        this.totalDot = result;
        resolve(result);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  @action queryMembers() {
    return new Promise(async (resolve, reject) => {
      try {
        const { polkadot } = this.store;
        const count = await polkadot.api.query.dao.membersCount();
        let queryQueue = [...Array(Number(count.toString()))]
          .map((_, index) => polkadot.api.query.dao.membersArray(index));
        const addressList = await Promise.all(queryQueue);
        queryQueue = addressList
          .map(item => polkadot.api.query.dao.members(item));
        let result = await Promise.all(queryQueue);
        result = result
          .map((item, index) => ({ ...item, address: addressList[index] }))
          .map(item => ({
            ...item,
            address: item.address.toString(),
            energy: item.energy.toString(),
          }));
        this.members = result;
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

  @computed get votingMember() {
    return this.members[0];
  }
}
