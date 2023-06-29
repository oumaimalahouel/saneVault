import React, { useState } from "react";
import { TextField } from "@mui/material";
import './style.css';

export const NestedSelect = ({ value, list,onSelect ,placeHolder,name}) => {
  let x=[];
  const distructItems=array=>{
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if(element.childFolders.length>0) {
        x.push(element);distructItems(element.childFolders);
      }else x.push(element)
    }
  }
  distructItems(list);
  const [open,setOpen]=useState(false)
  return (
    <div style={{position:'relative'}}>
      <TextField
        placeHolder={placeHolder}
        fullWidth
        rows={4}
        sx={{ mb: 2 }}
        style={{fontSize:'12px'}}
        value={x?.find(v=>v.id==value)?.folderName}
        onClick={()=>setOpen(true)}
      />
      {open&&<div className="menupopup">
        {list.filter(v=>v.folderName).map((item) => (
          item.childFolders.length > 0 ?<>
            <div className="itm" onClick={()=>{
            onSelect(item.id)
            setOpen(false);
          }}>{item.folderName}</div>
          {item.childFolders.filter(v=>v.folderName).map((childFolder) => {
            return <div className="subItm" onClick={()=>{
              onSelect(childFolder.id)
              setOpen(false);
            }}>{childFolder.folderName}</div>
          })}
          </> :(<div className="itm" onClick={()=>{
            onSelect(item.id)
            setOpen(false);
          }}>{item.folderName}</div>)
        ))}
      </div>
}
    </div>
  );
};
