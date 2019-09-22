import React from 'react';
import { Card } from 'antd';
import Identicon from '@polkadot/ui-identicon';

export default ({ address }) => (
  <Card>
    <Identicon value={address}/>
  </Card>
)
