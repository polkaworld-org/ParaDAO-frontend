import { observable, action } from 'mobx';

export default class {
  @observable collapse = true;

  @action onCollapse(value) {
    this.collapse = value;
  }
}
