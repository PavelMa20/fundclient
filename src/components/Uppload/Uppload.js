'use strict';
import React from 'react';
import 'antd/dist/antd.css';
import './Uppload.css';
import { Upload, message, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import XLSX from "xlsx";





// const props = {
  // accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // name: 'file',
  // headers: {
  //   authorization: 'authorization-text',
  // },

//   showUploadList: true,
//   onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   beforeUpload: (file, fileList) => {

//     var rABS = true;
//     const f = fileList[0];
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       var data = e.target.result;

//       var workbook = XLSX.read(data, {
//         type: rABS ? 'binary' : 'array'
//       });
//       var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       var jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

//       let resultArray = [];
//       console.log(jsonArr);
//       console.log(jsonArr.length);
//       console.log(jsonArr[0].length);
//       for (let i = 1; i < jsonArr.length; i++) {
//         var objArray = [];
//         for (let j = 0; j < jsonArr[0].length; j++) {
//           var obj = new Object;
//           obj = { key: jsonArr[0][j], value: jsonArr[i][j] };
//           objArray.push(obj);
//         }
//         resultArray.push(objArray);

//       }
//       console.log(resultArray);

//       http.post("/prejson", resultArray);

//     };
//     if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
//     return false;
//   }

// };

const UPLOAD_PROPS = {
  accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  name: 'file',
  headers: {
    authorization: 'authorization-text',
  },
  
}





class Uppload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.fileInput = React.createRef();     
    
  }


  handleChange(info) {
    
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList,"arsi");
     
    }
   
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  
    
  
  }
  

  beforeUpload(file, fileList) {
    var rABS = true;
    const f = fileList[0];
    var reader = new FileReader();
    reader.onload = function (e) {
   
      var data = e.target.result;

      var workbook = XLSX.read(data, {
        type: rABS ? 'binary' : 'array'
      });
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
     

      let resultArray = [];
      console.log(jsonArr);
      console.log(jsonArr.length);
      console.log(jsonArr[0].length);
      for (let i = 1; i < jsonArr.length; i++) {
        var objArray = [];
        for (let j = 0; j < jsonArr[0].length; j++) {
          var obj = new Object;
          obj = { key: jsonArr[0][j], value: jsonArr[i][j] };
          objArray.push(obj);
        }
        resultArray.push(objArray);

      }

      this.props.onUpload?.(resultArray);

      // http.post("/prejson", resultArray);

    }.bind(this);
    if (rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    return false;
  }

 

  render() {
            
    return (

      <Upload
        {...UPLOAD_PROPS}
        onChange={this.handleChange}
        beforeUpload={this.beforeUpload}
        maxCount={1}
       
      
        
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
     
        {/* <input
          type="file"
          hidden
          accept={SheetJSFT}
          ref={this.fileInput}
          onChange={this.handleChange}

        /> */}
      </Upload>
    )
  }

}

const SheetJSFT = [
  "xlsx",
  "xlsm",
  "xls",
  "csv",

]
export default Uppload;