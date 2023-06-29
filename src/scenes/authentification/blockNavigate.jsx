import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlockNavigate =({children})=>{
    const navigate=useNavigate();
    const accessToken=localStorage.getItem('accessToken');
    React.useEffect(()=>{
        if(accessToken)navigate(-1);
    },[])
    return accessToken?undefined:children
}
export default BlockNavigate;