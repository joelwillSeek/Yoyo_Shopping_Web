import React, { useEffect, useState } from "react";
import Body from "./components/Body.jsx";
import TopPanel from "./components/TopPanel.jsx";



function App () {
   
  let [getApi, setApi] = useState(null);
  let [searchTerm,setSearchTerm]=useState('');

  useEffect(()=>{
    getJsonFromApi(setApi);
  },[]);


    return <>
    <TopPanel setSearch={setSearchTerm} ></TopPanel>
    <Body getApi={getApi} getSearch={searchTerm}></Body>
    </>;
  }

  let getJsonFromApi=async(setApi)=>{  

    let res = await fetch('https://fakestoreapi.com/products');
    let json = await res.json(); 
    setApi(json); 
}

  

export default App;
   