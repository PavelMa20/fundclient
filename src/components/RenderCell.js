import React from 'react';


const RenderCell=(preffixAndPostfix)=>{
    let dataCell = preffixAndPostfix;
    console.log(dataCell);
    console.log(dataCell.preffixAndPostfix.dataSource[0].preffix);
     let preffix = dataCell.preffixAndPostfix.dataSource[0].preffix ;
      let postfix = dataCell.preffixAndPostfix.dataSource[0].postfix;
     let firstElement = dataCell.preffixAndPostfix.firstElement;
 console.log(preffix);
 console.log(postfix);
console.log(firstElement);



return(
    <div>{preffix}{firstElement}{postfix}.pdf </div>
)
}
export default RenderCell;