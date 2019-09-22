import React from 'react';
import { router } from 'umi';
import { observer } from 'mobx-react';
import { Tabs, Button } from 'antd';
import ProjectList from '@/components/ProjectList';
import { useStores } from '@/store';

const Access = () => {
  const { project } = useStores();
  const handleAdd = () => {
    router.push('/proposals/add');
  };
  const operations = <Button onClick={handleAdd} icon="plus" type="primary" size="large">Submit Proposal</Button>
  return (
    <div>
      <Tabs defaultActiveKey="1" size="large" tabBarExtraContent={operations}>
        <Tabs.TabPane tab="Proposals" key="1">
          <ProjectList data={project.allProjects} title=""/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Finished" key="2">
          <ProjectList data={project.allProjects} title=""/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
};

export default observer(Access);
