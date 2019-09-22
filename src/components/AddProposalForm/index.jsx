import React, { useState } from 'react';
import {
  Steps,
  Button,
  Icon,
  Result,
} from 'antd';
import { withRouter } from 'umi';
import WhiteSpace from '@/components/WhiteSpace';
import ProposalTypes from './ProposalTypes';
import ProposalForm from './ProposalForm';
import classes from './index.less';

const data = {
  member_join: {
    text: 'Join',
  },
  member_invest_extra: {
    text: 'InvestExtra',
  },
  member_exit: {
    text: 'Exit',
  },
  project_submit: {
    text: 'Submit',
  },
  project_delivery: {
    text: 'Delivery Milestone',
  },
};
export default withRouter(({ history }) => {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [active, setActive] = useState('member_join');
  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);
  const onResult = isSuccess => {
    setStep(2);
    setSuccess(isSuccess);
  }
  const goList = () => history.push('/proposals');
  const steps = [
    {
      title: 'Select',
      content: <ProposalTypes data={data} active={active} onSelect={type => setActive(type)}/>,
    },
    {
      title: 'Information',
      content: <ProposalForm active={active} onResult={onResult}/>,
    },
    {
      title: 'Finish',
      content: (
        <Result
          status={success ? 'success' : 'error'}
          title={success ? 'Submit Success' : 'Submit Failed'}
          extra={
            success
              ? (<Button size="large" type="primary" onClick={goList}>Go List</Button>)
              : null
          }
        />
      ),
    },
  ];
  return (
    <div>
      <Steps current={step}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title}/>
        ))}
      </Steps>
      <WhiteSpace size="md"/>
      <div>{steps[step].content}</div>
      <WhiteSpace size="lg"/>
      <div className={classes.actionBar}>
        {
          step === 0 && (
            <Button size="large" type="link" onClick={() => next()}>
              NEXT
              <Icon type="right" />
            </Button>
          )
        }
        {
          step > 0 && (
            <Button type="link" size="large" style={{ marginLeft: 8 }} onClick={() => prev()}>
              <Icon type="left" />
              PREVIOUS
            </Button>
          )
        }
      </div>
    </div>
  )
})
