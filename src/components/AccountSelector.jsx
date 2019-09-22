import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Select, Row } from 'antd';
import Identicon from '@polkadot/ui-identicon';
import { useStores } from '@/store';

export default observer(({ value, onChange, ...rest }) => {
  const { account } = useStores();
  const { allAccounts } = account;
  useEffect(() => {
    if (allAccounts.length === 0) {
      account.initAccounts();
    }
  }, [allAccounts]);

  const onSelect = (address, element) => {
    const { data } = element.props;
    onChange(data);
  };

  return (
    <Select onSelect={onSelect} {...rest}>
      {
        account.allAccounts.map(item => (
          <Select.Option
            key={item.account.address}
            data={item.account}
            value={item.account.address}
          >
            <Row type="flex" align="middle">
              <Identicon value={item.account.address} size={18}/>
              <p style={{ marginLeft: 8 }}>{item.name}</p>
              <p style={{ marginLeft: 8, flex: 1, overflow: 'hidden' }}>{item.account.address}</p>
            </Row>
          </Select.Option>
        ))
      }
    </Select>
  )
})
