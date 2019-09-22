import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { withRouter } from 'umi';
import {
  Card,
  Button,
  Descriptions,
  Row,
  Modal,
  message,
 } from 'antd';
import { hexToString } from '@polkadot/util';
import Identicon from '@polkadot/ui-identicon';
import { Energy, VotedChart } from '@/components/ProjectList/Item'
import WhiteSpace from '@/components/WhiteSpace'
import { useStores } from '@/store';
import AccountSelector from '@/components/AccountSelector';

const Detail = observer(({ match }) => {
  const { project, member } = useStores();
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { params: { id } } = match;
  useEffect(() => {
    (async () => {
      if (isEmpty(member.members)) {
        await member.queryMembers();
      }
      member.calcTotalEnergy();
      if (project.projects.length === 0) {
        await project.queryAllProjects();
      }
      const result = project.projects.filter(item => item.index === Number(id));
      if (result.length !== 0) {
        setData(result[0]);
      } else {
        setData(null);
      }
    })();
  }, []);
  if (!data) return null;
  const detail = hexToString(data.data.detail.toString()).split(',');
  const m1Requested = data.data.milestone_1_requested.toNumber();
  const m2Requested = data.data.milestone_2_requested.toNumber();
  const m3Requested = data.data.milestone_3_requested.toNumber();
  const applicant = data.data.applicant.toString();
  const yesVotes = data.data.yes_votes.toNumber();
  const noVotes = data.data.no_votes.toNumber();
  const turnout = (yesVotes / member.totalEnergy).toFixed(2) * 100;
  const process = data.data.processed.isFalse;
  const status = data.data.status.toString();
  const goBack = () => window.history.back();
  const onVote = (title, id, vote, account) => {
    if (!account) {
      message.error('Please select an account!');
      return false;
    }
    Modal.confirm({
      title,
      content: 'Please confirm your operation',
      onOk: async () => {
        setLoading(true);
        await project.submitProjectVote({
          project: id,
          vote,
          account,
        })
        setLoading(false);
      },
    });
  }
  const onNay = () => {
    onVote('NAY', id, false, account);
  };
  const onAye = () => {
    onVote('AYE', id, true, account);
  }
  const extra = <Button onClick={goBack} type="link" icon="left">Back</Button>
  return (
    <Card title="PROJECT DETAIL" className="page-card" extra={extra}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Project Index">#{data.index}</Descriptions.Item>
        <Descriptions.Item label="Project Name">{detail[0] || '-'}</Descriptions.Item>
        <Descriptions.Item label="Project Detail">{detail[1] || '-'}</Descriptions.Item>
        <Descriptions.Item label="M1 Description">{detail[2] || '-'}</Descriptions.Item>
        <Descriptions.Item label="M2 Description">{detail[3] || '-'}</Descriptions.Item>
        <Descriptions.Item label="M3 Description">{detail[4] || '-'}</Descriptions.Item>
        <Descriptions.Item label="Originator">
          <Row type="flex" align="middle">
            <Identicon value={applicant} size="24"/>
            <span style={{ marginLeft: 8 }}>{applicant}</span>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label="Energy applied">
          <Energy
            title=""
            m1Requested={m1Requested}
            m2Requested={m2Requested}
            km3Requested={m3Requested}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Voter Turnout">{turnout}%</Descriptions.Item>
        <Descriptions.Item label="Status">
          <VotedChart yesVotes={yesVotes} noVotes={noVotes} status={status} />
        </Descriptions.Item>
      </Descriptions>
      <WhiteSpace size="sm"/>
      {
        process && (
          <Row type="flex" justify="end" align="middle">
            <AccountSelector onChange={value => setAccount(value)} style={{ width: 200 }}/>
            <Button
              loading={loading}
              type="danger"
              size="large"
              style={{ marginRight: 8, marginLeft: 8 }}
              onClick={onNay}
            >
              Nay
            </Button>
            <Button
              loading={loading}
              onClick={onAye}
              type="primary"
              size="large"
              style={{ background: '#52c41a', borderColor: '#52c41a' }}
            >
              Aye
            </Button>
          </Row>
        )
      }
    </Card>
  );
});

export default withRouter(Detail)