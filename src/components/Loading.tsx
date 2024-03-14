import React, { useEffect, useRef } from 'react';
import styles from '../styles/Loading.module.css';
import { ThreeCircles } from 'react-loader-spinner';

const Loading = ({ color }:{color:string}) => {

    let getDialog=useRef<any>();

    useEffect(()=>{

        let dialogRef:HTMLDialogElement=getDialog.current;
        dialogRef.showModal();
    },[])

    
    return <dialog className={styles.dialog} ref={getDialog}><ThreeCircles
    visible={true}
    height="100"
    width="100"
    color={color}
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></dialog>;
};

export default Loading;