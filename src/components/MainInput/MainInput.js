import React from 'react';
import 'antd/dist/antd.css';
import './MainInput.css';
import { Input, Select } from 'antd';
const { Option } = Select;

class MainInput extends React.Component {
render() {
    return (

    <Select defaultValue="Option2-2">
    <Option value="Option2-1">Option2-1</Option>
    <Option value="Option2-2">Option2-2</Option>
  </Select>
   


    )}
}
export default MainInput;