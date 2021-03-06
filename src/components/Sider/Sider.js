import { Menu, Switch } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, FilePdfOutlined  } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './Sider.css';


const { SubMenu } = Menu;

class Sider extends React.Component {
  state = {
    theme: 'dark',
    current: '1',
  };

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <>
        {/* <Switch
          checked={this.state.theme === 'dark'}
          onChange={this.changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        /> */}
        
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 },{height:'100vh'}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<FilePdfOutlined />} title="Create PDF">
            <Menu.Item key="1">Upload data</Menu.Item>
            {/* <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item> */}
          </SubMenu>
          {/* <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation ">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation ">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </>
    );
  }
}

//ReactDOM.render(<Sider />, mountNode);

export default Sider;