import React from 'react';
import {
  Row,
  Col,
  Card,
  Empty,
} from 'antd';
import Item from './Item';
import classes from './index.less';

export default ({ data }) => {
  if (data.length === 0) {
    return <Empty description={null} className={classes.empty}/>
  }
  return (
    <Card bordered={false}>
      <Row gutter={16}>
        {
          data.map(item => (
            <Col span={8} key={`posoles_${item.index}`}>
              <Item {...item}/>
            </Col>
          ))
        }
      </Row>
    </Card>
  );
}

