import React from 'react';
import { Row, Col, Card } from 'antd';
import Identicon from '@polkadot/ui-identicon'
import classes from './index.less'

const AccountCard = props => {
  const { name, account, freeBalance } = props;
  const formatBalance = freeBalance && (Number(freeBalance.toString()) / 1000000000000000).toFixed(2);
  return (
    <Card bordered={false}>
      <Row gutter={16} type="flex">
        <Col>
          <Identicon value={account.address.toString()}/>
        </Col>
        <Col span={16}>
          <p>{name}</p>
          <p className={classes.address}>{account.address.toString()}</p>
          {
            freeBalance && (
              <p className={classes.freebalance}>free balance: {formatBalance}</p>
            )
          }
        </Col>
      </Row>
    </Card>
  );
};

export default ({ list }) => (
  <Row gutter={16}>
    {
      list.map(item => (
        <Col span={8}>
          <AccountCard {...item}/>
        </Col>
      ))
    }
  </Row>
)