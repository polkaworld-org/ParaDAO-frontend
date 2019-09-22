import React, { useEffect } from 'react';
import { Card } from 'antd';
import { observer } from 'mobx-react';
import MemberList from '@/components/MemberList';
import { useStores } from '@/store';

const Members = () => {
  const { member } = useStores();
  useEffect(() => {
    member.queryMembers();
  }, []);
  return (
    <Card title="MEMBER LIST" className="page-card">
      <MemberList data={member.allMembers}/>
    </Card>
  )
};

export default observer(Members);
