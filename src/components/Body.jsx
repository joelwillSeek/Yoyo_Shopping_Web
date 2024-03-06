import React, { useEffect, useState } from "react";
import styles from "../styles/body.module.css";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

export default function Body({getApi,getSearch}){

    let [filteredData,setFilter]=useState(getApi);

    useEffect(()=>{
        if(getSearch!=""){
            setFilter(()=>{
            return getApi.filter((value)=>{
                return value.title.toLowerCase().includes(getSearch.toLowerCase());
            })})
        }else{
            setFilter(getApi);
        }
        
    },[getSearch,getApi]);

    return (<div id="body" className={styles.body}>
    { filteredData == null ? <Loading type={"balls"} color={"#fc6f03"}/>:filteredData.map((value,index)=><ProductCard key={index} price={value.price} title={value.title} src={value.image}/>) }
    </div>);
}

