import { observable, when } from 'mobx';
import { notification } from 'antd';
import { Toast } from 'antd-mobile';
import { isEmpty } from 'lodash';

export default class Polkadot {
  constructor({ store }) {
    this.store = store;
    when(
      () => !isEmpty(this.api),
      () => this.api.query.system.events(events => {
        // loop through the Vec<EventRecord>
        events.forEach(record => {
          const { event } = record;
          const eventName = `${event.section}:${event.method}`;
          console.log(eventName);
          this.eventListener.forEach(data => {
            if (data.type === eventName) {
              data.callback(event.data);
            }
          });
          if (eventName === 'system:ExtrinsicFailed') {
            notification.error({
              message: 'An error occured',
            });
          }
          if (eventName === 'dao:SubmitProjectProposal') {
            notification.open({
              message: 'New Project Submit',
            });
            this.store.project.queryAllProjects();
            this.store.member.queryMembers();
          }
          if (eventName === 'dao:ForwardToMilestone') {
            notification.open({
              message: 'Froward Milestone',
            });
            this.store.project.queryAllProjects();
          }
          if (eventName === 'dao:ProjectVote') {
            notification.open({
              message: 'New Vote',
            });
            this.store.project.queryAllProjects();
          }
          if (eventName === 'dao:ProcessProjectProposal') {
            notification.open({
              message: 'An Proposal Processed',
            });
            this.store.project.queryAllProjects();
          }
        });
      }),
    );
  }

  eventListener = [];

  addEventListener = function (data) {
    this.eventListener.push(data);
    // return this event index
    return this.eventListener.length - 1;
  }

  removeEventListener = function (index) {
    this.eventListener.splice(index, 1);
  }

  @observable endpoint = 'ws://127.0.0.1:9944/';

  @observable api = null;
}
