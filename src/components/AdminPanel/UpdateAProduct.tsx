import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalContextHolder from "../ContextHolder";
import Product from "../../firebase/Product";
import ProductCard from "../ProductCard";
import {
  initialSetupForSearchAbility,
  searchThoughProducts,
} from "./commonlyUsedFunctions";

export default function UpdateAProduct() {
  let { setOpenDialog } = useContext(GlobalContextHolder);
  let [allProducts, setAllProducts] = useState<Product[]>([]);
  let searchInputRef = useRef(null);
  let [filteredDataProductBySearch, setFilteredProductBySearch] = useState<
    Product[]
  >([]);

  useEffect(() => {
    setOpenDialog("Getting Products");

    initialSetupForSearchAbility(
      setFilteredProductBySearch,
      setAllProducts
    ).then(() => {
      setOpenDialog("");
    });
  }, []);

  return (
    <div>
      <input
        type="search"
        placeholder="Search For Product"
        ref={searchInputRef}
        onChange={(event) =>
          searchThoughProducts(
            event.target.value,
            allProducts,
            setFilteredProductBySearch
          )
        }
      />
      <div>
        {filteredDataProductBySearch.map((product, index) => (
          <ProductCard
            price={product.price}
            image={product.image}
            title={product.title}
            id={product.ID}
            key={index}
            deletable={{
              setFilteredProductBySearch,
              setAllProducts,
              forUpdate: true,
            }}
          />
        ))}
      </div>
    </div>
  );
}
