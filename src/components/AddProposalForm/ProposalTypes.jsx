import React from 'react';
import { Card } from 'antd';
import WhiteSpace from '@/components/WhiteSpace';
import classes from './index.less';

export default ({ data, active, onSelect }) => {
  const memberEvents = [];
  const projectEvents = [];
  Object.keys(data).map(item => {
    if (/member/.test(item)) {
      memberEvents.push({ ...data[item], key: item });
    }
    if (/project/.test(item)) {
      projectEvents.push({ ...data[item], key: item });
    }
    return false;
  });
  return (
    <>
      <Card title="MEMBERS" bordered={false}>
        {
          memberEvents.map(item => (
            <Card.Grid
              onClick={() => onSelect(item.key)}
              key={item.key}
              className={`${classes.proposalType} ${item.key === active ? classes.active : ''}`}
            >
              {item.text}
            </Card.Grid>
          ))
        }
      </Card>
      <WhiteSpace size="sm"/>
      <Card title="PROJECT" bordered={false} headStyle={{ border: 'none' }}>
        {
          projectEvents.map(item => (
            <Card.Grid
              onClick={() => onSelect(item.key)}
              key={item.key}
              className={`${classes.proposalType} ${item.key === active ? classes.active : ''}`}
            >
              {item.text}
            </Card.Grid>
          ))
        }
      </Card>
    </>
  );
}
