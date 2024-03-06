import React, { useEffect, useState } from "react";
import styles from "../styles/body.module.css";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

export default function Body(){

    let [getApi, setApi] = useState(null);

    useEffect(()=>{
      getJsonFromApi(setApi);
    },[]);

    return (<div id="body" className={styles.body}>
    { getApi == null ? <Loading type={"balls"} color={"#fc6f03"}/>:getApi.map((value,index)=><ProductCard key={index} price={value.price} title={value.title} src={value.image}/>) }
    </div>);
}

let getJsonFromApi=async(setApi)=>{  

    let res = await fetch('https://fakestoreapi.com/products');
    let json = await res.json(); 
    setApi(json); 
}