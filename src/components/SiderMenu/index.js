import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './SiderMenu';
import { getFlatMenuKeys } from './SiderMenuUtils';

/**
 * memo: 让函数式组件有PureComponent的特性(浅比较)
 */
const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement="left"
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh',
      }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
});

export default SiderMenuWrapper;
