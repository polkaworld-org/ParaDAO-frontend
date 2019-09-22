import React, { useState, useEffect } from 'react';
import { router } from 'umi';
import { observer } from 'mobx-react';
import { Card, Button } from 'antd';
import ProjectList from '@/components/ProjectList';
import { useStores } from '@/store';

const Proposals = () => {
  const { project } = useStores();
  const [active, setActive] = useState('1');
  const handleAdd = () => {
    router.push('/proposals/add');
  };
  const operations = (
    <Button onClick={handleAdd} icon="plus" type="link" size="large">Submit Proposal</Button>
  );
  const tabList = [
    {
      key: '1',
      tab: 'Proposals',
    },
    {
      key: '2',
      tab: 'Voting',
    },
    {
      key: '3',
      tab: 'Finished',
    },
  ];
  useEffect(() => {
    project.queryAllProjects();
  }, []);
  return (
    <Card
      className="page-card"
      tabList={tabList}
      activeTabKey={active}
      tabBarExtraContent={operations}
      onTabChange={ i => setActive(i)}
    >
      {
        active === '1' && <ProjectList data={project.proposals}/>
      }
      {
        active === '2' && <ProjectList data={project.voting}/>
      }
      {
        active === '3' && <ProjectList data={project.finished}/>
      }
    </Card>
  )
};

export default observer(Proposals);
