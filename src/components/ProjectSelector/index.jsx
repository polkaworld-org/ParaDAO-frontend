import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Select } from 'antd';
import { hexToString } from '@polkadot/util'
import { useStores } from '@/store';

export default observer(({ onChange }) => {
  const { project } = useStores();
  const { projects } = project;
  useEffect(() => {
    if (projects.length === 0) {
      project.queryAllProjects();
    }
  }, []);

  const onSelect = value => {
    onChange(value);
  };

  return (
    <Select onSelect={onSelect}>
      {
        project.allProjects.map(item => {
          const details = hexToString(item.data.detail.toString()).split(',');
          return (
            <Select.Option
              key={item.index}
              value={item.index}
            >
              {details[0]}
            </Select.Option>
          );
        })
      }
    </Select>
  )
})
