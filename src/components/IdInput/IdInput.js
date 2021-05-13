
import React, { Component } from 'react';
import { Input } from 'antd';
import './IdInput.css';

const IdInput = ({ setTemplateId }) => {

    return (
        <div>
            <Input placeholder="Input Temlate #" style={{
                marginLeft: 20,
                width: 200,
            }} onChange={(e) => setTemplateId(e.target.value)} />
        </div>
    )
}
export default IdInput;