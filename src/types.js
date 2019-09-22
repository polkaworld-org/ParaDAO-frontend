import { Enum } from '@polkadot/types/codec';

const ProjectStatus = value => new Enum([
  'Initialization',
  'Milestone1',
  'Milestone2',
  'Milestone3',
], value);

export default {
  Member: {
    energy: 'u64',
    highest_index_yes_vote: 'u32',
  },
  ProjectStatus,
  AccessProposal: {
    proposer: 'AccountId',
    applicant: 'AccountId',
    energies_requested: 'u64',
    mortgage: 'Balance',
    deposit: 'Balance',
    starting_period: 'u64',
    yes_votes: 'u64',
    no_votes: 'u64',
    processed: 'bool',
    did_pass: 'bool',
    aborted: 'bool',
    detail: 'Vec<u8>',
  },
  ProjectProposal: {
    proposer: 'AccountId',
    applicant: 'AccountId',
    mortgage: 'Balance',
    starting_period: 'u64',
    milestone_1_requested: 'Balance',
    milestone_2_requested: 'Balance',
    milestone_3_requested: 'Balance',
    yes_votes: 'u64',
    no_votes: 'u64',
    processed: 'bool',
    stage_did_pass: 'bool',
    round: 'u64',
    aborted: 'bool',
    status: 'ProjectStatus',
    detail: 'Vec<u8>',
  },
};
