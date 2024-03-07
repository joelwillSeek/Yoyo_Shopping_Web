import React, { useEffect, useState } from "react";
import Body from "./components/Body.jsx";
import TopPanel from "./components/TopPanel.jsx";
import "./styles/general.css"
import Catagories from "./components/Catagories.jsx";

function App () {
   
  let [getApi, setApi] = useState(null);
  let [searchTerm,setSearchTerm]=useState('');

  let listToTestCatagories=[
    {
      name:"shoes",
      color:"red"
    },{
      name:"shoes",
      color:"blue"
    }, {
    name:"shoes",
    color:"green"
  },{
    name:"shoes",
    color:"orange"
  },{
    name:"shoes",
    color:"purple"
  },{
    name:"shoes",
    color:"gray"
  },{
    name:"shoes",
    color:"pink"
  },{
    name:"shoes",
    color:"yellow"
  }
];

  useEffect(()=>{
    getJsonFromApi(setApi);
  },[]);


    return <>
    <TopPanel setSearch={setSearchTerm} ></TopPanel>
    <div className="catagoriesContainer">{listToTestCatagories.map((category,index)=><Catagories key={index}  name={category.name} color={category.color}></Catagories>)}</div>
    <Body getApi={getApi} getSearch={searchTerm}></Body>
    </>;
  }

  let getJsonFromApi=async(setApi)=>{  

    try{
    let res = await fetch('https://fakestoreapi.com/products');
    let json = await res.json(); 
    setApi(json); 
    }catch(e){
      alert("Encountered Network Problems");
        console.log(e);
    }
}

  

export default App;
   