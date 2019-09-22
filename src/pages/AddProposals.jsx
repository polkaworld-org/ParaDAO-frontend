import React from 'react';
import { observer } from 'mobx-react';
import { Card, Button } from 'antd';
import AddProposalForm from '@/components/AddProposalForm';

export default observer(() => {
  const goBack = () => window.history.back();
  const extra = <Button onClick={goBack} type="link" icon="left">Back</Button>
  return (
    <Card title="SUBMIT PROPOSAL" extra={extra} className="page-card">
      <AddProposalForm/>
    </Card>
  );
})
