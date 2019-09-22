import React from 'react';
import {
  Row, Col, Tooltip,
} from 'antd';
import Identicon from '@polkadot/ui-identicon';
import classes from './index.less';

const Member = ({ address, energy }) => (
  <div className={classes.member}>
    <Identicon value={address} size={32}/>
    <p className={classes.address}>
      <Tooltip title={address}>
        {address}
      </Tooltip>
    </p>
    <p className={classes.energy}>{energy} <span style={{ fontWeight: 'bold' }}>ENERGY</span></p>
  </div>
)

export default ({ data }) => (
  <Row gutter={16}>
    {
      data.map(item => (
        <Col span={12}>
          <Member {...item}/>
        </Col>
      ))
    }
  </Row>
)
