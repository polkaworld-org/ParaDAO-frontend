/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { Provider } from 'mobx-react';
import Link from 'umi/link';
import { formatMessage } from 'umi-plugin-react/locale';
import PageLoading from '@/components/PageLoading';
import createStore from '@/store';
import { PolkadotProvider } from '@/components/polkadot-provider';
import types from '@/types';
import logo from '../assets/logo.png';
import classes from './BasicLayout.less';

const store = createStore();
/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList => menuList.map(item => {
  const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
  return localItem;
});

const BasicLayout = props => {
  const { children, settings } = props;
  return (
    <Provider {...store}>
      <PolkadotProvider
        customTypes={types}
        endpoint={store.polkadot.endpoint}
        renderLoading={() => <PageLoading/>}
        onConnected={api => { store.polkadot.api = api }}
      >
        <ProLayout
          menuHeaderRender={
            () => <img src={logo} alt="logo"/>
          }
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl) {
              return defaultDom;
            }

            return <Link to={menuItemProps.path}>{defaultDom}</Link>;
          }}
          breadcrumbRender={(routers = []) => [
            {
              path: '/',
              breadcrumbName: formatMessage({
                id: 'menu.home',
                defaultMessage: 'Home',
              }),
            },
            ...routers,
          ]}
          itemRender={(route, params, routes, paths) => {
            const first = routes.indexOf(route) === 0;
            return first ? (
              <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
            ) : (
              <span>{route.breadcrumbName}</span>
            );
          }}
          menuDataRender={menuDataRender}
          formatMessage={formatMessage}
          {...props}
          {...settings}
          footerRender={() => <></>}
        >
          {children}
        </ProLayout>
      </PolkadotProvider>
    </Provider>
  );
};

export default BasicLayout;
