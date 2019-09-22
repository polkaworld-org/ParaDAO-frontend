import { observable, computed, action, when } from 'mobx';
import { isEmpty } from 'lodash';
import { stringToHex } from '@polkadot/util';

export default class {
  constructor({ store }) {
    this.store = store;
  }

  @observable.ref projects = [];

  @computed get allProjects() {
    return this.projects;
  }

  @computed get proposals() {
    return this.projects || [];
  }

  @computed get voting() {
    return this.projects.filter(item => {
      return item.data.processed.isFalse;
    });
  }

  @computed get finished() {
    return this.projects.filter(item => {
      const notVoting = item.data.processed.isTrue;
      const isPass = item.data.stage_did_pass.isTrue;
      const status = item.data.status.toString();
      return status === 'Milestone3' && isPass && notVoting;
    });
  }

  @computed get votingProject() {
    return this.projects[0];
  }

  @action ensureProjects = async function () {
    return this.queryAllProjects();
  }

  @action queryAllProjects = function () {
    const { polkadot: { api } } = this.store;
    return new Promise(async (resolve, reject) => {
      try {
        const count = await api.query.dao.projectProposalsCount();
        // no project
        if (count.isEmpty) {
          resolve([]);
          return false;
        }
        // get all projects
        const projectsQueue = [...Array(Number(count))]
          .map((_, index) => api.query.dao.projectProposals(index));
        let projects = await Promise.all(projectsQueue);
        projects = projects.map((data, index) => ({ index, data })).reverse();
        this.projects = projects;
        resolve(projects);
      } catch (e) {
        reject();
      }
      return true;
    });
  }

  /*
    submitProjectVote(project_proposal_index, vote)
  */
 @action submitProjectVote = data => {
  if (!data.project || !data.account) {
    return false;
  }
  const { polkadot: { api } } = this.store;
  return new Promise((resolve, reject) => {
    try {
      const tx = api.tx.dao.submitProjectVote(data.project, data.vote);
      tx.signAndSend(data.account, ({ events = [], status }) => {
        if (status.isFinalized) {
          console.log('forward at block hash', status.asFinalized.toHex());
          resolve({ status, events });
        }
      });
    } catch (e) {
      reject(e)
    }
  });
 }


  /*
  forwardToMilestone(project_proposal_index)
  */
 @action forwardToMilestone = data => {
  if (!data.project || !data.account) {
    return false;
  }
  const { polkadot: { api } } = this.store;
  return new Promise((resolve, reject) => {
    try {
      const tx = api.tx.dao.forwardToMilestone(data.project);
      tx.signAndSend(data.account, ({ events = [], status }) => {
        if (status.isFinalized) {
          console.log('forward at block hash', status.asFinalized.toHex());
          resolve({ status, events });
        }
      });
    } catch (e) {
      reject(e)
    }
  });
 }

  /* submitProjectProposal
      (applicant, milestone_1_requested, milestone_2_requested, milestone_3_requested, detail)
  */
  @action submitProject = data => {
    // check required
    if (
      !data.milestone_1_requested
      || !data.milestone_1_requested
      || !data.milestone_1_requested
      || !data.account
      || !data.detail
    ) {
      return false;
    }
    const { polkadot: { api } } = this.store;
    return new Promise((resolve, reject) => {
      try {
        const tx = api.tx.dao.submitProjectProposal(
          data.account.address,
          data.milestone_1_requested,
          data.milestone_2_requested,
          data.milestone_2_requested,
          stringToHex(data.detail),
        );
        tx.signAndSend(data.account, ({ events = [], status }) => {
          if (status.isFinalized) {
            console.log('Completed at block hash', status.asFinalized.toHex());
            resolve({ status, events });
          }
        });
      } catch (e) {
        reject(e)
      }
    });
  }
}
