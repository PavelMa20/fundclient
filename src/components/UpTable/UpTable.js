import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Popconfirm, Form, Select, DatePicker, Space } from 'antd';
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


class UpTable extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            // {
            //     title: 'Fund',
            //     dataIndex: 'name',
            //     width: '20%',
            //     render: () =>
            //         <div className="site-input-group-wrapper">
            //             <Select defaultValue="Abc">
            //                 <Option value="Abc">Abc</Option>
            //                 <Option value="123">123</Option>
            //                 <Option value="%">%</Option>

            //             </Select>
            //         </div>
            // },
            {
                title: 'Document type',
                dataIndex: 'DocumentType',
                render: () =>
                    <div className="site-input-group-wrapper">
                        <Select defaultValue="CapitalCall"    style={{ minWidth: 160,}} onChange={value => this.setState({
                            docType: value
                        })}>
                            <Option value="CapitalCall">Capital Call</Option> //Numeric
                            <Option value="CapitalAccount">Capital Account</Option> //Periodic
                            <Option value="CatchUpCall">Catch-Up Call</Option> //Numeric 
                            <Option value="K1">K-1</Option> //Periodic

                        </Select>
                    </div>
            },
            {
                title: 'Periodic or Numeric?',
                dataIndex: 'PeriodicorNumeric',
                render: () =>
                       
                    <div >
                        
                       
                        {this.checkTableValue(this.state.docType)}
                        </div>


            },
            {
                title: 'Document Number',
                dataIndex: 'DocumentNumber',
                name: 'documentNumber',

                render: () =>
                    <div className="site-input-group-wrapper">

                        <Select defaultValue="1">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                            <Option value="6">6</Option>
                            <Option value="7">7</Option>
                            <Option value="8">8</Option>
                            <Option value="9">9</Option>
                            <Option value="10">10</Option>
                            <Option value="11">11</Option>
                            <Option value="12">12</Option>
                            <Option value="13">13</Option>
                            <Option value="14">14</Option>
                            <Option value="15">15</Option>
                            <Option value="16">16</Option>
                            <Option value="17">17</Option>
                            <Option value="18">18</Option>
                            <Option value="19">19</Option>
                            <Option value="20">20</Option>
                        </Select>


                    </div>
            }, {
                title: 'Quarter',
                dataIndex: 'quarter',
                name: 'quarter',


                render: () =>
                    <div className="site-input-group-wrapper">

                        <Select defaultValue="Q1">
                            <Option value="Q1">Q1</Option>
                            <Option value="Q2">Q2</Option>
                            <Option value="Q3">Q3</Option>
                            <Option value="Q4">Q4</Option>
                        </Select>

                    </div>

            }, {
                title: 'Year',
                dataIndex: 'year',
                name: 'year',


                render: () =>
                    <div className="site-input-group-wrapper">

                        <Space direction="vertical" size={12}>
                            <DatePicker picker="year" bordered={false} />
                        </Space>


                    </div>

            },
            {
                title: 'Name the ',
                dataIndex: 'DocumentName',
                editable: true,
                render:() => 
                <Input placeholder="Basic usage"  style={{
                    marginLeft: 20,
                }}/>
            },

        ];
        this.state = {
            docType: " ",
            dataSource: [
                {
                  
                },
            ],
            count: 1,
        };
    }
    checkType() {
        if (this.checkTableValue(this.state.docType) === "numeric") {
            return true;
        }
    }

    checkTableValue(value) {
        console.log(value);
        if (value == "CapitalCall") {
            return ("Numeric")
        } else if (value == "CatchUpCall") {
            return ("Numeric")
        } else if (value == "CapitalAccount") {
            return ("Periodic")
        } else if (value == "K1") {
            return ("Periodic")
        }
    }


    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };
    

           //const columnsToPassToTable =  this.columns.filter(column => this.checkTableValue(this.state.docType) !== 'Periodic' || column.name !== 'documentNumber');
          
    render() {
        
        const columnsToPassToTable = this.columns.filter(column => {
            if (this.checkTableValue(this.state.docType) === 'Periodic') {
               return column.name !== 'documentNumber';
             }
           
             if (this.checkTableValue(this.state.docType) === 'Numeric') {
               return column.name !== 'quarter' && column.name !== 'year';
             }
           
             return true;
           })
        const { dataSource } = this.state;
        console.log(dataSource);
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
                    columns={columnsToPassToTable}
                    pagination={{ defaultPageSize: 10, hideOnSinglePage: true }}
                    style={{
                        margin: 20,
                    }}
                />
            </div>
        );
    }
}
export default UpTable;