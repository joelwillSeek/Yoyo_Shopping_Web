import ProductCard from "./components/ProductCard.jsx";
import testImage from "../template.png"
import React from "react";

function App () {
    return <ProductCard title="Yoyo Shopping" price={100} src={testImage}></ProductCard>;
  }

export default App;
  