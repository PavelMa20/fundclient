import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const DocTable = ({ onGet }) => {

    let docArray = onGet;
    let columnArray = [];
    let headerArray = [];
    let dataArray = [];
    let columns = [];
    let data = [];

   // console.log(docArray);
    headerArray = docArray[0];
    //console.log(headerArray);
    for (var key in headerArray) {
        let s = headerArray[key];

        columnArray.push(Object.values(s)[0]);
    }
    console.log(columnArray);

    for (let i = 0; i < docArray.length; i++) {
        dataArray = docArray[i];
        let object = new Object();
        for (let j = 0; j < dataArray.length; j++) {
            let fKey;
            let fValue;
            fKey = Object.values(dataArray[j])[0];
         
          //  console.log(fKey);
            fValue = Object.values(dataArray[j])[1];
          //  console.log(fValue);
            var propertyName = fKey;
           object[propertyName] = fValue;
        }
        object.key = i;
        //console.log(object);
        
        data.push(object);
    }
  //  console.log(data);

    for (let i = 0; i < columnArray.length; i++) {

        columns.push(
            {
                title: columnArray[i],
                dataIndex: columnArray[i],
                width: '100vw'/i,
                align: 'center',
                margin: '1em'
                
              
                
            }
        )
    }
    console.log(columns);
    //    let columns = [


    //         {
    //           title: 'Name',
    //           dataIndex: 'name',
    //           width: 150,
    //         },
    //         {
    //           title: 'Age',
    //           dataIndex: 'age',
    //           width: 150,
    //         },
    //         {
    //           title: 'Address',
    //           dataIndex: 'address',
    //         },
    //       ];



    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     key: i,
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`,
    //   });
    // }

    return (

        <Table  columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )



}
export default DocTable;