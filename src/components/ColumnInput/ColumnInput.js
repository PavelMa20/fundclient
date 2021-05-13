import React from 'react';
import Select from 'react-select'


const ColumnInput=({onName,setColumnName,resultArray,setFirstElement})=>{
   
     console.log(onName);
     console.log(resultArray);
 const sendName=(newValue, actionMeta) =>{
     console.log(newValue);
     console.log(`action: ${actionMeta.action}`);
     let columnName = newValue.value;
     setColumnName(columnName);
     console.log(resultArray[0]);
     let index = onName.indexOf(newValue);
     console.log(index);
     let object = resultArray[0][index];
     console.log(object);
     let firstElement = Object.values(object)[1];
     console.log(firstElement);
     setFirstElement(firstElement);
    
    
     
    
 }

    return(
        <Select options ={onName} onChange={sendName}/>
    )
    
}

export default ColumnInput;