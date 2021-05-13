import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import './NamingTable.css';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ColumnInput from '../ColumnInput/ColumnInput';
import RenderCell from '../RenderCell';
const { Option } = Select;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }


    return <td {...restProps}>{childNode}</td>;
};

class NamingTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Preffix',
                dataIndex: 'preffix',
                width: '30%',
                editable: true,


            },
            {
                title: 'Column Value',
                dataIndex: 'Columnvalue',

                render: () =>
                    <div className="site-input-group-wrapper">
                        {/* <Select defaultValue="Abc">
                            <Option value="Abc">Abc</Option>
                            <Option value="123">123</Option>
                            <Option value="%">%</Option>

                        </Select> */}

                        <ColumnInput onName={this.props.nameArray} setColumnName={this.props.setColumnName} resultArray={this.props.resultArray} setFirstElement={this.setFirstElement} />
                    </div>

            },

            {
                title: 'Postfix',
                dataIndex: 'postfix',
                width: '30%',
                editable: true,



            },


            {
                title: 'PDF name example',
                dataIndex: 'PDFnameexample',
                width: '30%',
                render: () =>
                    <div>
                      <RenderCell preffixAndPostfix={this.state}  />          
                    </div>
            },
        ];
        this.state = {
            dataSource: [
                {
                    // preffix: this.props.preffix,
                    // postfix: this.props.postfix,

                },

            ],
            count: 1,
            firstElement: '',

        };
    }
 
    setFirstElement = (value) => {
        console.log(value);
        this.setState({ firstElement: value });
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',

        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log(newData[0].preffix);
        console.log(item);
        this.setState({
            dataSource: newData,
        });
        this.props.setPreffix(newData[0].preffix);
        this.props.setPostfix(newData[0].postfix);
        

    };

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>

                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
                    style={{
                        margin: 0,
                    }}
                />

            </div>
        );
    }
}
export default NamingTable;