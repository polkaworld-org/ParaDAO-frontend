import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, Button } from 'antd';
import ImportAddressModal from '@/components/ImportAccountModal'
import AccountList from '@/components/AccountList';
import { useStores } from '@/store';

const noop = () => {};
const Overview = () => {
  const [visible, setVisible] = useState(false);
  const { account } = useStores();
  const openModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const operations = (
    <Button icon="plus" size="large" type="link" onClick={openModal}>
      Import Account
    </Button>
  );

  useEffect(() => {
    (async () => {
      // init default account
      await account.initAccounts();
      await account.queryAllBalance()
    })()
    return noop;
  }, [])

  return (
    <Card className="page-card" title="ACCOUNT" extra={operations}>
      <ImportAddressModal visible={visible} onCancel={hideModal}/>
      <AccountList list={account.accounts}/>
    </Card>
  )
};

export default observer(Overview);
