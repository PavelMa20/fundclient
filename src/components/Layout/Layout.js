
import React, { Component } from 'react';
import MainInput from '../MainInput/MainInput';
import Sider from '../Sider/Sider';
import EditableTable from '../Table/TableDataColums';
import UpTable from '../UpTable/UpTable';
import { Input } from 'antd';
import './Layout.css';
import Uppload from '../Uppload/Uppload';
import ButtonSize from '../Download/Download';
import IdInput from '../IdInput/IdInput';
import http from "../http-common";
import DocTable from '../DocTable/DocTable';
import ColumnInput from '../ColumnInput/ColumnInput';
import NamingTable from '../NamingTable/NamingTable';
var fileDownload = require('react-file-download');


class Layout extends Component {
    constructor(props) {
        super(props);

        this.style = {
            display: props.display

        }

        this.state = {
            templateId: '',
            resultArray: [],
            zipFile: null,
            nameArray: [],
            columnName: '',
            preffix:'',
            postfix:'',

        }
    }
    setPreffix=(value)=>{
        console.log(value);
        this.setState({preffix: value})
    }
    setPostfix=(value)=>{
        console.log(value);
        this.setState({postfix: value})
    }

    setColumnName = (value) => {
        console.log(value);
        this.setState({ columnName: value });
        console.log("kek");
        console.log(this.state.columnName);
    }

    setTemplateId = (value) => {
        this.setState({ templateId: value });
        console.log(this.state.templateId);
    }
    setResultArray = (resultArray) => {
        this.setState({ resultArray });
       let obj = resultArray[0];
        for (let i = 0; i < obj.length; i++) {
            let key = Object.values(obj[i])[0];
            let object = { value: key, label: key }

            this.state.nameArray.push(object);
        }

        console.log(this.state.nameArray);
    }


    printTemplateId = () => {
        console.log(this.state);
        http.post("/prejson", { data: this.state }, { responseType: "arraybuffer" }
        ).then(res => {
            console.log(res);
            console.log(res.data);
            fileDownload(res.data, 'filename.zip');


        })
        console.log(this.state.zipFile);

    };




    render() {
        return (

            <div style={this.style}>
                {/* <header ></header> */}

                <div className="asmain">

                    <aside >
                        <Sider />
                    </aside>
                    <main>
                        {/* <br/>
            <h3>Choose Fund</h3>
            <br/>
            <div className="mainInput">
                <MainInput />
                <Input placeholder="New fund name"  style={{
                        marginLeft: 20,
                        width: 200,
                    }}/>
            </div>
            <br/>
            <h3>Choose document type</h3>
            <br/>
            <div className="tableup" >
                <UpTable />
                </div>

            <h3>Specify data columns</h3>
                <br/>  */  }      
                {/* <div className="tableedit">
                <EditableTable />
                </div>  */}
                        <br />
                        <h3>Upload Excel/CSV with data</h3>
                        <br />
                        <div className="uppload">
                            <Uppload onUpload={this.setResultArray} />

                        </div>

                        <br />
                        <h3>Data Preview</h3>
                        <div><DocTable className="docContainer" onGet={this.state.resultArray} /></div>
                        <br />



                        
                        <h3>Input PDF template #</h3>
                        <br />

                        <br />
                        <div className="pdftemplate">
                            <IdInput setTemplateId={this.setTemplateId} />
                        </div>
                        <br />
                        <h3>Choose PDF's Naming Column</h3>
                        <br />
                        <br />
                        <div>
                            <NamingTable nameArray={this.state.nameArray} setColumnName={this.setColumnName} setPreffix={this.setPreffix} setPostfix={this.setPostfix} resultArray={this.state.resultArray}/>
                        </div>

                        <div className="nameInput" style={{
                            marginLeft: 20,
                            width: 200,
                        }}>
                            {/* <ColumnInput onName={this.state.nameArray} setColumnName={this.setColumnName} /> */}
                        </div>




                        <br />
                        <div className="download" style={{
                            marginLeft: 20,
                        }}>
                            <ButtonSize onClick={this.printTemplateId} disabled={this.state.templateId.length !== 6 || this.state.resultArray.length === 0 || this.state.columnName.length===0 } />
                            
                        </div>


                    </main>
                </div>
            </div>


        )

    }
}




export default Layout;