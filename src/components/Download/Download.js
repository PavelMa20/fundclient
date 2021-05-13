import React from 'react';
import 'antd/dist/antd.css';
import './Download.css';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const ButtonSize = ({ onClick, disabled }) => (
  <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={onClick} disabled={disabled}>
    Download
  </Button>
)
// ButtonSize.propTypes = {
//     templateId: PropTypes.number,
// }
export default ButtonSize;