import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card } from 'antd';
import Dashboard from '@/components/Dashboard';
import ProjectList from '@/components/ProjectList';
import WhiteSpace from '@/components/WhiteSpace';
import { useStores } from '@/store';

const Overview = () => {
  const { member, project } = useStores();
  useEffect(() => {
    member.ensureMembers();
    member.queryTotalDot();
    project.ensureProjects();
    return () => {};
  }, [])
  return (
    <div>
      <Dashboard
        totalEngergy={member.totalEnergy}
        totalDot={member.totalDot / 1000000000}
        totalProjects={project.projects.length}
        totalMembers={member.members.length}
      />
      <WhiteSpace size="md"/>
      <Card title="PROJECTS">
        <ProjectList data={project.allProjects}/>
      </Card>
    </div>
  )
};

export default observer(Overview);
