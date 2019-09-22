import React from 'react';
import { Card, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { useStores } from '@/store';
import ProjectCard from '@/components/ProjectList/Item';
import MemberCard from '@/components/MemberCard';
import WhiteSpace from '@/components/WhiteSpace';

export default observer(({ type }) => {
  const { project, member } = useStores();
  return (
    <Card title="Voting">
      <Row gutter={16}>
      {
        type.map(item => (
          <Col span={12}>
            {
              item === 'proposal'
              ? <ProjectCard {...project.votingProject} />
              : <MemberCard {...member.votingAccess} />
            }
            <WhiteSpace size="sm"/>
          </Col>
        ))
      }
      </Row>
    </Card>
  )
})
